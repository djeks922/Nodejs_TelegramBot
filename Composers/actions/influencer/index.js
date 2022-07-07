import { getInfluencerByChatID } from "../../../api/service/influencer.js";
import { getTransactionByID } from "../../../api/service/transaction.js";
import {
  influencerAcceptTransactionTextForAdmin,
  influencerAcceptTransactionTextForCustomer,
  influencerRejectsProposalToAdmin,
  influencerRejectsProposalToConsumer,
  influencerRejectsTransactionTextForAdmin,
  postLinkInformation_reply,
} from "./text.js";
import { updateProposal } from "../../../api/utils/Bot/proposal/markup.js";

export const acceptProposal = async (ctx, proposal, refID) => {
  try {
    if (proposal.status === "rejected") {
      await ctx.answerCbQuery("Proposal rejected by Cryptoencer team.");
    } else {
      if (proposal.acceptedBy.indexOf(refID) === -1) {
        proposal.acceptedBy.push(refID);
        await proposal.save();
        await ctx.editMessageText(ctx.callbackQuery.message.text, {
          reply_markup: {
            inline_keyboard: [[{ text: "accepted✅", callback_data: "htrt" }]],
          },
        });
        await ctx.answerCbQuery("Accepted!");
      } else {
        await ctx.answerCbQuery("Already accepted!");
      }
    }
  } catch (error) {
    throw error;
  }
};
export const rejectProposal_Influencer = async (ctx, proposal, refID) => {
  // INFLUENCER REJECTS PROPOSAL
  try {
    if (proposal.status === "rejected") {
      await ctx.answerCbQuery("Proposal already rejected by Cryptoencer team.");
      await ctx.deleteMessage();
    } else {
      if (proposal.rejectedForByI.indexOf(refID) === -1) {
        proposal.rejectedForByI.push(refID);
        await proposal.save();
        await proposal.populate("consumer");
        await proposal.populate("approvedBy");
        await proposal.populate("rejectedForByI");
        // Consumer notification
        await ctx.telegram.sendMessage(
          proposal.consumer.chatID,
          influencerRejectsProposalToConsumer(ctx,proposal),updateProposal()
        );
        // Admin notification
        await ctx.telegram.sendMessage(
          process.env.ADMIN_CHAT_ID,
          influencerRejectsProposalToAdmin(ctx,proposal)
        );

        await ctx.editMessageText(ctx.callbackQuery.message.text, {
          reply_markup: {
            inline_keyboard: [[{ text: "rejected❌", callback_data: "htrt" }]],
          },
        });
        await ctx.answerCbQuery("Rejected!");
      } else {
        await ctx.answerCbQuery("Already rejected!");
      }
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

    if (transaction.status === "VERIFIED-influencer")
      return await ctx.answerCbQuery("Already verified!");

    transaction.status = "VERIFIED-influencer";
    transaction.save();

    await ctx.reply(postLinkInformation_reply())

    await ctx.telegram.sendMessage(
      process.env.ADMIN_CHAT_ID,
      influencerAcceptTransactionTextForAdmin(transaction)
    );
    await ctx.telegram.sendMessage(
      transaction.from.chatID,
      influencerAcceptTransactionTextForCustomer(transaction)
    );

    await ctx.answerCbQuery();
  } catch (error) {
    throw error;
  }
};
export const influencerRejectsTransaction = async (ctx) => {
  try {
    const trId = ctx.callbackQuery.data.split(" ")[1];
    const transaction = await getTransactionByID(trId);

    if (transaction.status === "REJECTED-influencer")
      return await ctx.answerCbQuery("Already rejected!");

    transaction.status = "REJECTED-influencer";
    transaction.save();
    await ctx.reply('Please in case of problem contact our support group [link to suppot group]')
    await ctx.answerCbQuery()

    await ctx.telegram.sendMessage(
      process.env.ADMIN_CHAT_ID,
      influencerRejectsTransactionTextForAdmin(transaction)
    );

  } catch (error) {
    throw error;
  }
};
