import logger from "../logger/index.js";
import Proposal from "../models/tg-consumerProposal.js";
import { Markup } from "telegraf";
import { getConsumerByChatID, getAdmins } from "./consumer.js";
import bot from "../../config/bot.config.js";
const proposalListener = Proposal.watch();

proposalListener.on("change", async (data) => {
  try {
    if (data.operationType === "insert") {
      const admin = await getAdmins();
      const text = proposalToInfluencer(data.fullDocument);

      admin? await bot.telegram.sendMessage(admin.chatID, text, Markup.inlineKeyboard([Markup.button.callback('accept', `${data.documentKey._id}`),Markup.button.callback('reject',`${data.documentKey._id}`)])) : undefined
    }
    if(data.operationType === "update") {

    }
  } catch (error) {
    console.log(error);
  }
});

export const createProposal = async (proposal, consumerChatID) => {
  try {
    proposal.consumer= await getConsumerByChatID(consumerChatID);
    
    const _proposal = await Proposal.findOneAndUpdate(
      proposal,
      {},
      { upsert: true }
    );

    return _proposal;
  } catch (error) {
    logger.error(error);
  }
};

export const getProposals = async (filter = {}) => {
  try {
    const proposal = await Proposal.find(filter).populate('influencers',{chatID: 1}).populate('consumer',{chatID: 1}).lean();

    return proposal;
  } catch (error) {
    logger.error(error);
  }
};

export const getProposalByID = async (id) => {
  try {
    const proposal = await Proposal.findOne({ userID: id }).lean();

    return proposal;
  } catch (error) {
    logger.error(error);
  }
};

// export const getConsumerByChatID = async (id) => {
//     try {
//        const proposal = await Proposal.findOne({chatID: id}).lean()

//        return proposal
//     } catch (error) {
//         logger.error(error)
//     }
// }

export const deleteProposalByID = async (id) => {
  try {
    const proposal = await Proposal.deleteOne({ chatID: id });

    return proposal;
  } catch (error) {
    logger.error(error);
  }
};

export const updateProposalByID = async (id, updates) => {
  try {
    const proposal = await Proposal.updateOne({_id:id}, updates);

    return proposal;
  } catch (error) {
    logger.error(error);
  }
};



export const proposalToInfluencer = (proposal) => {
  return `NEW PROMO REQUEST\nName: ${proposal.name}\nContract address: ${proposal.contractAddress}\nWebsite: ${proposal.website}\n\n\nDescription: ${proposal.description}\n\nDev: @${proposal.developerUsername}\npost time: ${proposal.createdAt} `;
};
export const proposalToAdmin = (proposal) => {
  return `NEW PROMO REQUEST\nName: ${proposal.name}\nContract address: ${proposal.contractAddress}\nWebsite: ${proposal.website}\n\n\nDescription: ${proposal.description}\n\nDev: @${proposal.developerUsername}\npost time: ${proposal.createdAt} `;
};
