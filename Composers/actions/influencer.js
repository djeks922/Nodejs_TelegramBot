import { getInfluencerByChatID } from "../../api/service/influencer.js";
import { getConsumerByID } from "../../api/service/consumer.js";
import { getTransactionByID } from "../../api/service/transaction.js";

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
    const admin = await getConsumerByID(transaction.proposal.approvedBy);

    await ctx.telegram.sendMessage(transaction.from.chatID, "Deal done!");
    await ctx.telegram.sendMessage(
      admin.chatID,
      "Influencer verified transaction"
    );
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
