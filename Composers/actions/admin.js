import { deleteProposalByID } from "../../api/service/proposal.js";
import { getConsumerByChatID } from "../../api/service/consumer.js";
import { updateInfluencer } from "../../api/service/influencer.js";
import { consumerTransactionNText } from "../../helpers/consumer.js";
import { getTransactionByID } from "../../api/service/transaction.js";
import { updateProposal } from "../../api/utils/proposal/markup.js";
import { getProposalByID } from "../../api/service/proposal.js";

export const approveProposal = async (ctx, proposal, refID) => {
  try {
    if (proposal.status === "staged") {
      proposal.status = "approved";
      proposal.approvedBy = refID;
      proposal.approvedForID = proposal.influencers;
      await proposal.save();
      await ctx.answerCbQuery("Approved!");
    } else {
      await ctx.answerCbQuery(
        `Already approved by ${proposal.approvedBy.username}, for all Influencers !`
      );
    }
  } catch (error) {
    throw error;
  }
};

export const approveIndividual = async (ctx, proposal, approvedForID) => {
  try {
    if (proposal.approvedFor.indexOf(approvedForID) === -1) {
      const admin = await getConsumerByChatID(ctx.callbackQuery.from.id);
      proposal.approvedFor.push(approvedForID);
      proposal.approvedBy = proposal.approvedBy ?? admin;
      await proposal.save();
      await ctx.answerCbQuery(
        `Approved for Influencer with id: ${approvedForID}`
      );
    } else {
      await ctx.answerCbQuery(
        `Already approved for Influencer : ${approvedForID}`
      );
    }
  } catch (error) {
    throw error;
  }
};

export const rejectProposal = async (ctx, proposal) => {
  try {
    if (proposal.approvedBy)
      return await ctx.answerCbQuery(
        `Proposal was approved by ${proposal.approvedBy.username}`
      );

    const res = await deleteProposalByID(proposal._id);

    if (!res.deletedCount)
      return await ctx.answerCbQuery("Proposal already deleted!");

    await ctx.answerCbQuery("Proposal deleted successfully!");
  } catch (error) {
    throw error;
  }
};

export const activateInfluencer = async (ctx) => {
  try {
    const id = ctx.callbackQuery.data.split(" ")[1];
    const res = await updateInfluencer(id, { status: "active" });
    if (!res.modifiedCount)
      return await ctx.answerCbQuery("Already activated!");
    await ctx.answerCbQuery("activated!");
  } catch (error) {
    throw error;
  }
};

export const rejectActivationInfluencer = async (ctx) => {
  try {
    // REJECT ACTIVATION INFLUENCER REGISTRY
  } catch (error) {
    throw error;
  }
};

export const adminVerifiedTransaction = async (ctx) => {
  try {
    const trID = ctx.callbackQuery.data.split(" ")[1];

    const transaction = await getTransactionByID(trID);
    const proposal = await getProposalByID(transaction.proposal._id, {
      lean: false,
      populate: true,
    });

    let index = proposal.packages.findIndex(
      (e) =>
        e.influencer._id.toString() ===
        transaction.FOR.influencer._id.toString()
    );
    proposal.packages[index].paymentPhase = "payed";
    await proposal.save();
    // console.log(transaction)
    transaction.status = "VERIFIED";
    await transaction.save();
    await ctx.answerCbQuery();

    await ctx.telegram.sendMessage(
      transaction.from.chatID,
      consumerTransactionNText(transaction),
      updateProposal()
    );
  } catch (error) {
    throw error;
  }
};

export const adminRejectsTransaction = async (ctx) => {
  const trID = ctx.callbackQuery.data.split(" ")[1];
  const transaction = await getTransactionByID(trID);
  // console.log(transaction)
  transaction.status = "REJECTED";
  await transaction.save();
  await ctx.answerCbQuery();

  // await ctx.telegram.sendMessage(transaction.from.chatID, consumerTransactionNText(transaction))  HERE SHOULD BE SOME FEEDBACK WHY REJECTED
};
