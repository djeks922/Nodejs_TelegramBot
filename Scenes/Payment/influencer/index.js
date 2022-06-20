import { Scenes, Composer } from "telegraf";
import {
  enter,
  leave,
  onCallbackQr,
  onMessage,
  transactionSelectionActions,
  txIDSubmitionText,
} from "./handlers.js";

const { WizardScene } = Scenes;

const transactionSelection = new Composer();
transactionSelection.hears(/[0-9]/, transactionSelectionActions);
transactionSelection.on('message', async (ctx) => {
  try {
    return await ctx.reply('Choose valid number from the list')
  } catch (error) {
    throw error
  }
})

const txIDSubmition = new Composer();
txIDSubmition.on("text", txIDSubmitionText);

const paymentAdminScene = new WizardScene(
  "payment-scene-toInfluencer-id",
  transactionSelection,
  txIDSubmition
);

paymentAdminScene.enter(enter);
paymentAdminScene.leave(leave)

paymentAdminScene.on("message", onMessage);
paymentAdminScene.on("callback_query", onCallbackQr);

export default paymentAdminScene;
