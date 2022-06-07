import { Scenes } from "telegraf";
import {
  enter,
  leave,
  onBackHears,
  onCallbackQr,
  onMessage,
  onText,
} from "./handlers.js";

const { BaseScene } = Scenes;

export const walletScene = new BaseScene("influencer-scene-wallet-id");

walletScene.enter(enter);
walletScene.leave(leave);

walletScene.hears("Back to registry", onBackHears);

walletScene.on("text", onText);
walletScene.on("message", onMessage);

walletScene.on("callback_query", onCallbackQr);

export default walletScene;
