import { Scenes, Composer } from "telegraf";
import {
  enter,
  onCallbackQr,
  onMessage,
  transactionSelectionActions,
  txIDSubmitionText,
} from "./handlers.js";

const { WizardScene } = Scenes;

const transactionSelection = new Composer();
transactionSelection.hears(/[0-9]/, transactionSelectionActions);

const txIDSubmition = new Composer();
txIDSubmition.on("text", txIDSubmitionText);

const paymentAdminScene = new WizardScene(
  "payment-scene-toInfluencer-id",
  transactionSelection,
  txIDSubmition
);

paymentAdminScene.enter(enter);

paymentAdminScene.on("message", onMessage);
paymentAdminScene.on("callback_query", onCallbackQr);

export default paymentAdminScene;
