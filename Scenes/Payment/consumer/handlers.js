import { getAdmins } from "../../../api/service/consumer.js";
import { createTransaction } from "../../../api/service/transaction.js";
import { consumerPaymentText,consumerRePaymentText } from "./text.js";
import { adminPaymentButtons, exitButton, removeKeyboard } from "../markup.js";

export const enter = async (ctx) => {
  try {
    if (ctx.scene.state.transaction) {
      await ctx.reply(
        "Please enter VALID TXID of transaction for related package(influencer)",
        exitButton()
      );
    } else {
      await ctx.reply(
        "Please enter TXID of transaction for related package(influencer)",
        exitButton()
      );
      const proposal = ctx.session.proposals.find(
        (p) => `${p._id}` === ctx.scene.state.proposalID
      );
      ctx.scene.state.proposal = proposal;
      proposal.packages.forEach((pkg) =>
        `${pkg._id}` === ctx.scene.state.pkgID
          ? (ctx.scene.state.pkg = pkg)
          : ""
      );
    }
  } catch (error) {
    throw error;
  }
};

export const leave = async (ctx) => {
  try {
    ctx.reply('exited', removeKeyboard())
  } catch (error) {
    
  }
}

export const onExit = async (ctx) => {
  try {
      await ctx.scene.leave();
  } catch (error) {
      throw error
  }
}

export const onMessage = async (ctx, next) => {
  try {
    return ctx.message.text
      ? await next()
      : await ctx.reply("Please enter valid TxID");
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

export const onText = async (ctx) => {
  try {
    if (ctx.scene.state.transaction) {
      ctx.scene.state.transaction.txID = ctx.message.text;
      await ctx.scene.state.transaction.save();
      await ctx.telegram.sendMessage(
        ctx.scene.state.transaction.to.chatID,
        consumerRePaymentText(ctx,ctx.scene.state.transaction),
        adminPaymentButtons(ctx.scene.state.transaction._id)
      );
      await ctx.reply("Great, after TXID verification we`ll update you.");
      await ctx.scene.leave();
    } else {
      const admin = await getAdmins();
      const { proposal, pkg } = ctx.scene.state;

      const transaction = {
        txID: ctx.message.text,
        from: ctx.session.consumer._id,
        to: admin._id,
        onUser: "tg-consumer",
        proposal: proposal,
        package: pkg,
      };
      const tr = await createTransaction(transaction);
      await ctx.telegram.sendMessage(
        admin.chatID,
        consumerPaymentText(ctx, proposal, pkg),
        adminPaymentButtons(tr._id)
      );
      await ctx.reply("Great, after TXID verification we`ll update you.");
      await ctx.scene.leave();
      return;
    }
  } catch (error) {
    throw error;
  }
};
