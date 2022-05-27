import { Scenes } from "telegraf";
import {
  enter,
  addSocial,
  addPackage,
  addRequirement,
  addWalletAddress,
  viewProfile,
  leave,
  applyForReview,
  socialAction
} from "./handlers.js";
import { socialButtonsForRegistry } from "./Social/markup.js";

const { BaseScene } = Scenes;

const registryScene = new BaseScene("influencer-scene-id");


registryScene.enter(enter);
registryScene.leave((ctx) => {
  console.log(ctx)
  console.log("leaved");
});

registryScene.on("message", (ctx) => {
  if (ctx.message.text === undefined) ctx.reply("Not valid");
  console.log(ctx.message.text);
});

registryScene.action("1", (ctx) => {
  ctx.editMessageReplyMarkup(socialButtonsForRegistry().reply_markup);
});
registryScene.action("2", (ctx)=>{
  ctx.scene.enter('influencer-scene-package-id')
});
registryScene.action("3", addRequirement);
registryScene.action("4", addWalletAddress);
registryScene.action("5", viewProfile);
registryScene.action("6", leave);
registryScene.action("7", applyForReview);

// Social callback actions
registryScene.action(/rs +/, async (ctx) => {
  const data = ctx.callbackQuery.data.split(" ")[1];
  await ctx.answerCbQuery()
  socialAction(ctx,data)
});

registryScene.on("callback_query", (ctx) => {
  ctx.answerCbQuery();
});

export default registryScene;

export {socialScene} from './Social/index.js'
export {packageScene} from './Pkge/index.js'