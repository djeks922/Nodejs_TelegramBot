import { Scenes } from "telegraf";
import {
  enter,
  viewProfile,
  leave,
  applyForReview,
  socialAction,
  deactivate,
  activate,
  updateProfile,
  deleteProfile,
  deleteAccVerStep,
} from "./handlers.js";
import { socialButtonsForRegistry } from "./Social/markup.js";

const { BaseScene } = Scenes;

const registryScene = new BaseScene("influencer-scene-id");

registryScene.enter(enter);
registryScene.leave((ctx) => {
  console.log("leaved registry scene");
});

registryScene.on("message", async (ctx) => {
  try {
    return await ctx.reply("No such option");
  } catch (error) {
    throw error;
  }
});

registryScene.action("1", async (ctx) => {
  try {
    await ctx.editMessageText(
      "Select social platform",
      socialButtonsForRegistry()
    );
  } catch (error) {
    throw error;
  }
});
registryScene.action("2", async (ctx) => {
  try {
    ctx.scene.enter("influencer-scene-package-id");
  } catch (error) {
    throw error;
  }
});
registryScene.action("3", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await ctx.scene.enter("influencer-scene-requirement-id");
  } catch (error) {
    throw error;
  }
});
registryScene.action("4", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await ctx.scene.enter("influencer-scene-wallet-id");
  } catch (error) {
    throw error;
  }
});
registryScene.action("5", viewProfile);
registryScene.action("6", leave);
registryScene.action("7", applyForReview);
registryScene.action("8", deactivate);
registryScene.action("9", activate);

registryScene.action("updateProfile", updateProfile);
registryScene.action("deleteinfluenceraccaunt", deleteAccVerStep);
registryScene.action(/Delete+/, deleteProfile);

// Social callback actions
registryScene.action(/rs +/, async (ctx) => {
  try {
    const data = ctx.callbackQuery.data.split(" ")[1];
    await ctx.answerCbQuery();
    socialAction(ctx, data);
  } catch (error) {
    throw error;
  }
});

registryScene.on("callback_query", async (ctx) => {
  try {
    await ctx.answerCbQuery("registry callback");
  } catch (error) {
    throw error;
  }
});

export default registryScene;

export { socialScene } from "./Social/index.js";
export { packageScene } from "./Pkge/index.js";
export { requirementScene } from "./Requirement/index.js";
export { walletScene } from "./Wallet/index.js";
