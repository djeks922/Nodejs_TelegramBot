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
  deleteAccVerStep
} from "./handlers.js";
import { socialButtonsForRegistry } from "./Social/markup.js";

const { BaseScene } = Scenes;

const registryScene = new BaseScene("influencer-scene-id");


registryScene.enter(enter);
registryScene.leave((ctx) => {
  
  console.log("leaved registry scene");
});


registryScene.on("message", async (ctx) => {
  
  
  return await ctx.reply("No such option");
});

registryScene.action("1", (ctx) => {
  ctx.editMessageText('Select social platform',socialButtonsForRegistry());
});
registryScene.action("2", async (ctx)=>{
  ctx.scene.enter('influencer-scene-package-id')
});
registryScene.action("3", async (ctx) => {
  await ctx.deleteMessage()
  await ctx.scene.enter('influencer-scene-requirement-id')
});
registryScene.action("4", async (ctx) => {
  await ctx.deleteMessage()
  await ctx.scene.enter('influencer-scene-wallet-id')
});
registryScene.action("5", viewProfile);
registryScene.action("6", leave);
registryScene.action("7", applyForReview);
// registryScene.action("8", updateIProfile);
registryScene.action("9", deactivate);
registryScene.action("10", activate);

registryScene.action('updateProfile', updateProfile)
registryScene.action('deleteinfluenceraccaunt', deleteAccVerStep)
registryScene.action(/Delete+/, deleteProfile)

// Social callback actions
registryScene.action(/rs +/, async (ctx) => {
  const data = ctx.callbackQuery.data.split(" ")[1];
  await ctx.answerCbQuery()
  socialAction(ctx,data)
});

registryScene.on("callback_query", (ctx) => {
  ctx.answerCbQuery('registry callback');
});

export default registryScene;

export {socialScene} from './Social/index.js'
export {packageScene} from './Pkge/index.js'
export {requirementScene} from './Requirement/index.js'
export {walletScene} from './Wallet/index.js'