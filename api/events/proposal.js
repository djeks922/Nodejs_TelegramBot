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
} from "../utils/Bot/proposal/text.js";
import { adminButtons, influencerButtons, updateProposal } from "../utils/Bot/proposal/markup.js";
import Proposal from '../models/tg-consumerProposal.js'

const proposalListener = Proposal.watch();

const onStaged = async (data) => {
  try {
    // const admin = await getAdmins();
    const proposal = await getProposalByID(data.documentKey._id, {populate: true});
    
    const text = proposalToAdmin(proposal);
    const buttons = adminButtons(proposal);
    
    if(proposal.pImages && proposal.pImages.length > 1){
      const mediaArr = [] 
      for(let imgFile of proposal.pImages){
        mediaArr.push({
          type: "photo",
          media: imgFile
        })
      }
      await bot.telegram.sendMediaGroup(process.env.ADMIN_CHAT_ID,mediaArr)
    }
    
    await bot.telegram.sendMessage(process.env.ADMIN_CHAT_ID, text, buttons)
    
  } catch (error) {
    throw error;
  }
};

const onApprove = async (data) => {
  try {
    const proposal = await getProposalByID(data.documentKey._id, {populate: true});
    
    const text = approveNotificationToConsumer(proposal);
    await bot.telegram.sendMessage(proposal.consumer.chatID, text); // notify user **Token approved**
    
    for (let pkg of proposal.packages) {
      //   notify influencers that ** NEW PROMO **
      let text = proposalToInfluencer(proposal,pkg);
      let buttons = influencerButtons(proposal, pkg);
      await bot.telegram.sendMessage(pkg.influencer.chatID, text, buttons);
    }
  } catch (error) {
    throw error;
  }
};
const onApproveIndividual = async (data, approvedForID) => {
  try {
    const proposal = await getProposalByID(data.documentKey._id, {populate: true});
    if(approvedForID instanceof Array) approvedForID = approvedForID[0]
  
    const pkg = proposal.packages.find(pkg => pkg.influencer._id.toString() === approvedForID.toString())

    const text = approveNotificationToConsumerI(proposal,pkg.influencer);

    await bot.telegram.sendMessage(proposal.consumer.chatID, text); // notify user **Token approved**
    

    let infText = proposalToInfluencer(proposal,pkg);
    let buttons = influencerButtons(proposal, pkg);
    await bot.telegram.sendMessage(pkg.influencer.chatID, infText, buttons);

  } catch (error) {
    throw error;
  }
};

const onAccept = async (data, acceptedByID) => {
  try {
    const proposal = await getProposalByID(data.documentKey._id, {lean:false,populate: true});

    let consumerText = acceptNotificationToConsumer(proposal); // Consumer notification when *influencers accept*
    await bot.telegram.sendMessage(proposal.consumer.chatID, consumerText,updateProposal());

    let adminText = acceptNotification_admin(proposal); // Admin notification when *influencers accept*
    await bot.telegram.sendMessage(proposal.approvedBy.chatID, adminText);

  } catch (error) {
    throw error;
  }
};
const onRejectAfterApprovement = async (data) => {
  try {
    const proposal = await getProposalByID(data.documentKey._id, {lean:false,populate: true});

    for(let pkg of proposal.packages){
      await bot.telegram.sendMessage(pkg.influencer.chatID, `Promo for Token: ${proposal.name} rejected for some reason, even if it was approved by Cryptoencer team.`); 
    }
    await bot.telegram.sendMessage(
      proposal.consumer.chatID,
      `Your proposal (Token name): ${proposal.name} fully rejected for all packages, even if it was approved before`,updateProposal()
    );

  } catch (error) {
    throw error;
  }
};

const onReject = async (data) => {
  try {
    const proposal = await getProposalByID(data.documentKey._id, {lean:false,populate: true});
    
    await bot.telegram.sendMessage(
      proposal.consumer.chatID,
      `Your proposal (Token name: ${proposal.name}) was rejected for all packages.`
    );
  } catch (error) {
    throw error
  }
}

proposalListener.on("change", async (data) => {
  try {
    if (data.operationType === "insert") {
      await onStaged(data);
    }
    if (data.operationType === "update") {
      // console.log(data.updateDescription.updatedFields)
      for (const field in data.updateDescription.updatedFields) {
         field.includes('approvedFor')
         ? await onApproveIndividual(data, data.updateDescription.updatedFields[field])
         : ''

         field.includes('acceptedBy')
         ? await onAccept(data, data.updateDescription.updatedFields[field])
         : "";
      }
      data.updateDescription.updatedFields.status === "approved"
        ? await onApprove(data)
        : "";
      if(data.updateDescription.updatedFields.status === "rejected" && data.updateDescription.updatedFields.approvedBy === null){
         await onRejectAfterApprovement(data)
      }  
      if(data.updateDescription.updatedFields.status === "rejected" && !data.updateDescription.updatedFields.hasOwnProperty('approvedBy')){
         await onReject(data)
      }  
    }
  } catch (error) {
    throw error;
  }
});

export default proposalListener