import {
  deleteProposalByID,
  updateProposalByID,
} from "../../api/service/proposal.js";
import { getConsumerByID } from "../../api/service/consumer.js";
import { updateInfluencer } from "../../api/service/influencer.js";
import { consumerTransactionNText } from "../../helpers/consumer.js";
import { getTransactionByID } from "../../api/service/transaction.js";
import { updateProposal } from "../../api/utils/proposal/markup.js";
import { getProposalByID } from "../../api/service/proposal.js";
import { Markup } from "telegraf";

//
const approveButtons = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback("sure", `app Sure`),
    Markup.button.callback("cancel", `app Cancel`),
  ]);
};
export const approveProposal = async (ctx, proposal) => {
  try {
    if (proposal.status === "rejected-by-admin") {
      ctx.session.currentRejectedProposal = proposal;
      await ctx.answerCbQuery();
      return await ctx.reply(
        `Proposal rejected,Are you sure to approve it?`,
        approveButtons()
      );
    }
    if (proposal.status === "approved") {
      await ctx.answerCbQuery(
        `Already approved by ${proposal.approvedBy?.username}, for all Influencers !`
      );
    } else {
      proposal.status = "approved";
      proposal.approvedBy = ctx.session.consumer._id;
      await proposal.save();
      await ctx.answerCbQuery("Approved!");
    }
  } catch (error) {
    throw error;
  }
};

export const approveProposal_rejectCase = async (ctx) => {
  try {
    const data = ctx.callbackQuery.data.split(" ")[1];

    if (data === "Sure") {
      await updateProposalByID(ctx.session.currentRejectedProposal._id, {
        status: "approved",
        approvedBy: ctx.session.consumer._id,
      });
      await ctx.answerCbQuery("Approved!");
      await ctx.deleteMessage();
    } else {
      ctx.session.currentRejectedProposal = undefined;
      await ctx.answerCbQuery("Canceled!");
      await ctx.deleteMessage();
    }
  } catch (error) {}
};

export const approveIndividual = async (ctx, proposal, approvedForID) => {
  try {
    const index = proposal.approvedFor.indexOf(approvedForID);
    if (index === -1) {
      const admin = await getConsumerByID(ctx.session.consumer._id);
      proposal.approvedFor.push(approvedForID);
      proposal.approvedBy = proposal.approvedBy ?? admin;
      await proposal.save();
      await proposal.populate("approvedFor");
      await ctx.answerCbQuery(
        `Approved for Influencer: @${
          proposal.approvedFor[proposal.approvedFor.length - 1].username
        }`
      );
    } else {
      await proposal.populate("approvedFor");
      await ctx.answerCbQuery(
        `Already approved for Influencer : @${proposal.approvedFor[index].username}`
      );
    }
  } catch (error) {
    throw error;
  }
};

//************************************    Approvement Ends   HERE        ******************************** */
const rejectButtons = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback("sure", `rej Sure`),
    Markup.button.callback("cancel", `rej Cancel`),
  ]);
};

export const rejectAdminProposal = async (ctx, proposal) => {
  try {
    if (proposal.approvedBy) {
      ctx.session.currentRejectedProposal = proposal;
      await ctx.answerCbQuery();
      return await ctx.reply(
        `Proposal approved by ${proposal.approvedBy.username},Are you sure to reject it?`,
        rejectButtons()
      );
    }
    if (proposal.status === "rejected-by-admin")
      return await ctx.answerCbQuery("Proposal already rejected!");

    const res = await updateProposalByID(proposal._id, {
      status: "rejected-by-admin",
    });

    if (!res.matchedCount)
      return await ctx.answerCbQuery("The proposal too old, or maybe deleted");

    await ctx.answerCbQuery("Proposal rejected successfully!");
  } catch (error) {
    throw error;
  }
};

export const rejectAdminProposal_approvedCase = async (ctx) => {
  try {
    const data = ctx.callbackQuery.data.split(" ")[1];

    if (data === "Sure") {
      await updateProposalByID(ctx.session.currentRejectedProposal._id, {
        status: "rejected-by-admin",
        approvedBy: null,
      });
      await ctx.answerCbQuery("Rejected");
      await ctx.deleteMessage();
    } else {
      ctx.session.currentRejectedProposal = undefined;
      await ctx.deleteMessage();
      await ctx.answerCbQuery("Canceled!");
    }
  } catch (error) {
    throw error;
  }
};

export const rejectIndividual = async (ctx, proposal, rejectForID) => {
  try {
    // const pkg
    await proposal.populate("consumer");
    await ctx.telegram.sendMessage(
      proposal.consumer.chatID,
      "Your proposal for "
    );
  } catch (error) {}
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
    // console.log(proposal.packagesPayedToAdmin)
    proposal.packagesPayedToAdmin.push(transaction.package._id);
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
