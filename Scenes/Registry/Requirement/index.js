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

export const requirementScene = new BaseScene(
  "influencer-scene-requirement-id"
);

requirementScene.enter(enter);
requirementScene.leave(leave);

requirementScene.hears("Back to registry", onBackHears);

requirementScene.on("text", onText);
requirementScene.on("message", onMessage);

requirementScene.on("callback_query", onCallbackQr);

export default requirementScene;
