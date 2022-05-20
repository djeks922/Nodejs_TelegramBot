import logger from "../logger/index.js";
import Proposal from "../models/tg-consumerProposal.js";
import { Markup } from "telegraf";
import { getConsumerByChatID, getAdmins } from "./consumer.js";
import bot from "../../config/bot.config.js";

const proposalListener = Proposal.watch();

proposalListener.on("change", async (data) => {
  try {
    if (data.operationType === "insert") {
      // console.log(data)
      const admin = await getAdmins();
      const text = proposalToAdmin(data.fullDocument);
      // console.log({admin})
      admin
        ? await bot.telegram.sendMessage(
            admin.chatID,
            text,
            Markup.inlineKeyboard([
              Markup.button.callback(
                "approve",
                `a-a ${data.documentKey._id} ${admin._id}`
              ),
              Markup.button.callback(
                "reject",
                `r-a ${data.documentKey._id} ${admin._id}`
              ),
            ])
              .oneTime()
              .resize()
          )
        : undefined;
    }
    if (data.operationType === "update") {
      console.log("updated", data);
      if (data.updateDescription.updatedFields.status === "approved") {
        const proposal = await getProposalByID(data.documentKey._id, true);
        // console.log(proposal)
        await bot.telegram.sendMessage(
          proposal.consumer.chatID,
          `Your proposal for token ${proposal.name} is approved by admin, waiting for influencer(s) response :)`
        );
        for (let inf of proposal.influencers) {
          await bot.telegram.sendMessage(
            inf.chatID,
            proposalToInfluencer(proposal),
            Markup.inlineKeyboard([
              Markup.button.callback(
                "accept",
                `a-i ${proposal._id} ${inf._id}`
              ),
              Markup.button.callback(
                "reject",
                `r-i ${proposal._id} ${inf._id}`
              ),
            ])
              .oneTime()
              .resize()
          );
        }
      }
      if (
        data.updateDescription.updatedFields.status === "accepted" ||
        data.updateDescription.updatedFields[`acceptedBy.${data.updateDescription.updatedFields.__v-1}`]
      ) {
        // proposal status became `accepted` and should inform consumer about it.
        const proposal = await getProposalByID(data.documentKey._id, true);

        await bot.telegram.sendMessage(
          proposal.consumer.chatID,
          `Your proposal for token ${proposal.name} is accepted by ${
            proposal.acceptedBy[proposal.acceptedBy.length - 1].username
          }`
        );
        await bot.telegram.sendMessage(
          proposal.approvedBy.chatID,
          `Influencer ${
            proposal.acceptedBy[proposal.acceptedBy.length - 1].username
          } accepted the Proposal for Token ${proposal.name} of Consumer ${
            proposal.consumer.username
          }`
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
});

export const createProposal = async (proposal, consumerChatID) => {
  try {
    proposal.consumer = await getConsumerByChatID(consumerChatID);

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
    const proposal = await Proposal.find(filter)
      .populate("influencers", { chatID: 1 })
      .populate("consumer", { chatID: 1 })
      .lean();

    return proposal;
  } catch (error) {
    logger.error(error);
  }
};

export const getProposalByID = async (id, {lean = false, populate = true}) => {
  try {
    const proposal = lean
      ? populate
        ? await Proposal.findOne({ _id: id })
            .populate("influencers")
            .populate("consumer", { chatID: 1, username: 1 })
            .populate("approvedBy", { chatID: 1, username: 1 })
            .populate("acceptedBy", { chatID: 1, username: 1 })
            .lean()
        : await Proposal.findOne({ _id: id }).lean()
      : populate
      ? await Proposal.findOne({ _id: id })
          .populate("influencers")
          .populate("consumer", { chatID: 1, username: 1 })
          .populate("approvedBy", { chatID: 1, username: 1 })
          .populate("acceptedBy", { chatID: 1, username: 1 })
      : await Proposal.findOne({ _id: id }).populate('approvedBy',{username: 1});

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
    const proposal = await Proposal.deleteOne({ _id: id });
    console.log(proposal);
    return proposal;
  } catch (error) {
    logger.error(error);
  }
};

export const updateProposalByID = async (id, updates) => {
  try {
    const proposal = await Proposal.updateOne({ _id: id }, updates);
    console.log(proposal);
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
