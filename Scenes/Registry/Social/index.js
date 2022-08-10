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

socialScene.hears('exit', async (ctx) => {
  try {
    await ctx.scene.enter('influencer-scene-id')
  } catch (error) {
    throw error
  }
})
socialScene.action(/ss +/, platformActions);

socialScene.on("callback_query", onCallbackQr);

export default socialScene;
