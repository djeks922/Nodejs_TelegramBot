import { Scenes } from "telegraf";
import {
  enter,
  leave,
  onBackHears,
  onCallbackQr,
  onMessage,
  onPhoto
} from "./handlers.js";

const { BaseScene } = Scenes;

export const avatarScene = new BaseScene("influencer-scene-avatar-id");

avatarScene.enter(enter);
avatarScene.leave(leave);

avatarScene.hears("Back to registry", onBackHears);

avatarScene.on('photo', onPhoto);
avatarScene.on("message", onMessage);

avatarScene.on("callback_query", onCallbackQr);

export default avatarScene;