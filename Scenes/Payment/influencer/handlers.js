import { adminPaymentText } from "../../../helpers/consumer.js";
import { influencerPaymentButtons } from "../markup.js";

import {
  createTransaction,
  updateTransaction,
  getVerifiedTransactions,
} from "../../../api/service/transaction.js";

export const transactionSelectionActions = async (ctx) => {
  try {
    console.log('selection')
    console.log(ctx.message)

    ctx.scene.state.transaction = ctx.scene.state.transactions[+ctx.message.text]
    if(!ctx.scene.state.transaction) return await ctx.reply('Enter valid number from the list')
    
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
      to: ctx.scene.state.transaction.package.influencer._id,
      onUser: "tg-influencer",
      proposal: ctx.scene.state.transaction.proposal,
      package: ctx.scene.state.transaction.package,
    };
    const tr = await createTransaction(transactionI);
    await ctx.telegram.sendMessage(
      ctx.scene.state.transaction.package.influencer.chatID,
      adminPaymentText(transactionI),
      influencerPaymentButtons(tr._id)
    );
    await updateTransaction(ctx.scene.state.transaction, {forwarded: true})
    await ctx.reply("Transaction succesfully sent to Influencer.");
    await ctx.scene.leave();
  } catch (error) {
    throw error;
  }
};

export const enter = async (ctx) => {
  try {
    const transactions = await getVerifiedTransactions();
    if (!transactions || transactions.length === 0){
      await ctx.reply("There is no active verified transaction sir.");
      return await ctx.scene.leave()
    }
    let text = `Enter transaction number to forward payment to influencer\n`;
    for (let [i, transaction] of transactions.entries()) {
      text = text.concat(
        `${i}. For token ${transaction.proposal.name}(consumer: @${transaction.from.username}) and package ${transaction.package.name}- influencer: @${transaction.package.influencer.username}\n`
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
    console.log(ctx.message)
    return ctx.message.text
      ? await next()
      : await ctx.reply("Not valid input");
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
