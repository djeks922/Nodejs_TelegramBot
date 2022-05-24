import bot from "../../config/bot.config.js";
import { getAdmins } from "../service/consumer.js";
import { getProposalByID} from '../service/proposal.js'
import {
  acceptNotificationToConsumer,
  acceptNotification_admin,
  approveNotificationToConsumer,
  approveNotificationToConsumerI,
  proposalToAdmin,
  proposalToInfluencer,
} from "../utils/proposal/text.js";
import { adminButtons, influencerButtons } from "../utils/proposal/markup.js";
import Proposal from '../models/tg-consumerProposal.js'

const proposalListener = Proposal.watch();

const onStaged = async (data) => {
  try {
    const admin = await getAdmins();
    const proposal = await getProposalByID(data.documentKey._id, {populate: true});

    const text = proposalToAdmin(proposal);
    const buttons = adminButtons(proposal, admin);

    admin
      ? await bot.telegram.sendMessage(admin.chatID, text, buttons)
      : undefined;
  } catch (error) {
    throw error;
  }
};

const onApprove = async (data) => {
  try {
    const proposal = await getProposalByID(data.documentKey._id, {populate: true});
    
    const text = approveNotificationToConsumer(proposal);
    await bot.telegram.sendMessage(proposal.consumer.chatID, text); // notify user **Token approved**

    for (let inf of proposal.influencers) {
      //   notify influencers that ** NEW PROMO **
      let text = proposalToInfluencer(proposal);
      let buttons = influencerButtons(proposal, inf);
      await bot.telegram.sendMessage(inf.chatID, text, buttons);
    }
  } catch (error) {
    throw error;
  }
};
const onApproveIndividual = async (data, approvedID) => {
  try {
    const proposal = await getProposalByID(data.documentKey._id, {populate: true});
    if(approvedID instanceof Array) approvedID = approvedID[0]
    const inf = proposal.influencers.find(inf => inf._id.toString() === approvedID.toString())
    
    const text = approveNotificationToConsumerI(proposal,inf);

    await bot.telegram.sendMessage(proposal.consumer.chatID, text); // notify user **Token approved**
    

    let infText = proposalToInfluencer(proposal);
    let buttons = influencerButtons(proposal, inf);
    await bot.telegram.sendMessage(inf.chatID, infText, buttons);

  } catch (error) {
    throw error;
  }
};

const onAccept = async (data) => {
  try {
    const proposal = await getProposalByID(data.documentKey._id, {populate: true});

    let consumerText = acceptNotificationToConsumer(proposal); // Consumer notification when *influencers accept*
    await bot.telegram.sendMessage(proposal.consumer.chatID, consumerText);

    let adminText = acceptNotification_admin(proposal); // Admin notification when *influencers accept*
    await bot.telegram.sendMessage(proposal.approvedBy.chatID, adminText);
  } catch (error) {
    throw error;
  }
};

proposalListener.on("change", async (data) => {
  try {
    if (data.operationType === "insert") {
      await onStaged(data);
    }
    if (data.operationType === "update") {

      for (const field in data.updateDescription.updatedFields) {
         field.includes('approvedFor')
         ? await onApproveIndividual(data, data.updateDescription.updatedFields[field])
         : ''

         field.includes('acceptedBy')
         ? await onAccept(data)
         : "";
      }
      data.updateDescription.updatedFields.status === "approved"
        ? await onApprove(data)
        : "";
    }
  } catch (error) {
    throw error;
  }
});

export default proposalListener