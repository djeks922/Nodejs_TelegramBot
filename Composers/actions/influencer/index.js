import { getInfluencerByChatID } from "../../../api/service/influencer.js";
import { getConsumerByID } from "../../../api/service/consumer.js";
import { getTransactionByID } from "../../../api/service/transaction.js";
import { getProposalByID } from "../../../api/service/proposal.js";
import { influencerAcceptTransactionTextForAdmin, influencerAcceptTransactionTextForCustomer } from "./text.js";

export const acceptProposal = async (ctx, proposal, refID) => {
  try {
    proposal.status !== "accepted" ? (proposal.status = "accepted") : undefined;
    if (proposal.acceptedBy.indexOf(refID) === -1) {
      proposal.acceptedBy.push(refID);
      await proposal.save();
      await ctx.answerCbQuery("Accepted!");
    } else {
      await ctx.answerCbQuery("Already accepted!");
    }
  } catch (error) {
    throw error;
  }
};
export const rejectInfluencerProposal = async (ctx, proposal, refID) => {
  // INFLUENCER REJECTS PROPOSAL
  try {
  } catch (error) {}
};
export const updateProfile = async (ctx) => {
  try {
    ctx.session.influencer = await getInfluencerByChatID(
      ctx.callbackQuery.message.chat.id,
      { lean: false, populate: true }
    );
    await ctx.answerCbQuery("Profile updated");
  } catch (error) {
    throw error;
  }
};

export const influencerAcceptTransaction = async (ctx) => {
  try {
    const trId = ctx.callbackQuery.data.split(" ")[1];
    const transaction = await getTransactionByID(trId);

    if(transaction.status === 'VERIFIED-influencer') return await ctx.answerCbQuery('Already verified!')
    
    transaction.status = 'VERIFIED-influencer'
    transaction.save()
    // const proposal = await getProposalByID(transaction.proposal._id, {
    //   lean: false,
    //   populate: false,
    // });
    // proposal.packagesPayedToInfluencer.push(transaction.package._id);
    // proposal.save();

    const admin = await getConsumerByID(transaction.proposal.approvedBy);
    
    await ctx.telegram.sendMessage(
      admin.chatID,
      influencerAcceptTransactionTextForAdmin(transaction)
    );
    await ctx.telegram.sendMessage(transaction.from.chatID, influencerAcceptTransactionTextForCustomer(transaction));

    await ctx.answerCbQuery();
  } catch (error) {
    throw error;
  }
};
export const influencerRejectsTransaction = async (ctx) => {
  try {
    // Influencer Rejects Transaction
  } catch (error) {
    throw error;
  }
};
