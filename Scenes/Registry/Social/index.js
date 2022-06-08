import { Scenes } from "telegraf";
import {
  enter,
  leave,
  urlStep,
  platformActions,
  onCallbackQr,
} from "./handlers.js";

const { WizardScene } = Scenes;

export const socialScene = new WizardScene(
  "influencer-scene-social-id",
  urlStep
);

socialScene.enter(enter);
socialScene.leave(leave);

socialScene.action(/ss +/, platformActions);

socialScene.on("callback_query", onCallbackQr);

export default socialScene;
