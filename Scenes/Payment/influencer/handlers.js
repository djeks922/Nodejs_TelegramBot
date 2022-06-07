import { adminPaymentText } from "../../../helpers/consumer.js";
import { influencerPaymentButtons } from "../markup.js";

import {
  createTransaction,
  getVerifiedTransactions,
} from "../../../api/service/transaction.js";

export const transactionSelectionActions = async (ctx) => {
  try {
    ctx.scene.state.transaction =
      ctx.scene.state.transactions[+ctx.message.text];
    await ctx.reply("Please enter the TxID of transaction");
    ctx.wizard.next();
  } catch (error) {
    throw error;
  }
};

export const txIDSubmitionText = async (ctx) => {
  try {
    const transactionI = {
      txID: ctx.message?.text,
      from: ctx.scene.state.transaction.from,
      to: ctx.scene.state.transaction.FOR.influencer._id,
      onUser: "tg-influencer",
      proposal: ctx.scene.state.transaction.proposal,
      FOR: ctx.scene.state.transaction.FOR,
    };
    const tr = await createTransaction(transactionI);
    await ctx.telegram.sendMessage(
      ctx.scene.state.transaction.FOR.influencer.chatID,
      adminPaymentText(transactionI),
      influencerPaymentButtons(tr._id)
    );
    await ctx.reply("Transaction succesfully sent to Influencer.");
    await ctx.scene.leave();
  } catch (error) {
    throw error;
  }
};

export const enter = async (ctx) => {
  try {
    const transactions = await getVerifiedTransactions();
    if (!transactions || transactions.length === 0)
      return await ctx.reply("There is no active verified transaction sir.");
    let text = `Enter transaction number to forward payment to influencer\n`;
    for (let [i, transaction] of transactions.entries()) {
      text = text.concat(
        `${i}. For token ${transaction.proposal.name}(@${transaction.from.username}) and package ${transaction.FOR.package.name}\n`
      );
    }
    ctx.scene.state.transactions = transactions;
    await ctx.reply(text);
  } catch (error) {
    throw error;
  }
};

export const onMessage = async (ctx, next) => {
  try {
    return ctx.message.text
      ? await next()
      : await ctx.reply("Please enter valid TaxID");
  } catch (error) {
    throw error;
  }
};

export const onCallbackQr = async (ctx) => {
  try {
    await ctx.answerCbQuery();
  } catch (error) {
    throw error;
  }
};
