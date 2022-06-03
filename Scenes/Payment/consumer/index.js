import { Scenes } from "telegraf";
import { getAdmins } from "../../../api/service/consumer.js";
import { createTransaction } from "../../../api/service/transaction.js";
import { consumerPaymentText } from "../../../helpers/consumer.js";
import { adminPaymentButtons } from "../markup.js";
const { BaseScene } = Scenes;

const paymentConsumerScene = new BaseScene("payment-scene-toAdmin-id");

paymentConsumerScene.enter(async (ctx) => {
  try {
    await ctx.reply(
      "Please enter TaxID of transaction for related package(influencer)"
    );
    const proposal = ctx.session.proposals.find(
      (p) => `${p._id}` === ctx.scene.state.proposalID
    );
    ctx.scene.state.proposal = proposal;
    proposal.packages.forEach((pkg) =>
      `${pkg._id}` === ctx.scene.state.pkgID ? (ctx.scene.state.pkg = pkg) : ""
    );
  } catch (error) {
    throw error;
  }
});

paymentConsumerScene.on("text", async (ctx) => {
  try {
    // console.log(ctx.scene.state)
    const admin = await getAdmins();
    const { proposal, pkg } = ctx.scene.state;

    const transaction = {
      txID: ctx.message?.text,
      from: ctx.session.consumer._id,
      to: admin._id,
      onUser: "tg-consumer",
      proposal: proposal,
      FOR: pkg,
    };
    const tr = await createTransaction(transaction);
    await ctx.telegram.sendMessage(
      admin.chatID,
      consumerPaymentText(ctx, proposal, pkg),
      adminPaymentButtons(tr._id, proposal._id)
    );
    await ctx.reply("Great, after TXID verification we`ll update you.");
    await ctx.scene.leave();
    return;
  } catch (error) {
    throw error;
  }
});
paymentConsumerScene.on("message", async (ctx) => {
  try {
    await ctx.reply("Please enter valid TaxID");
  } catch (error) {
    throw error;
  }
});

paymentConsumerScene.on('callback_query', async(ctx) => {
  try {
      await ctx.answerCbQuery()
  } catch (error) {
      throw error
  }
})

export default paymentConsumerScene;
