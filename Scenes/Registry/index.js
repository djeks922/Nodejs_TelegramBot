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
  // console.log(ctx)
  console.log("leaved registry scene");
  // ctx.deleteMessage()
});
// registryScene.on('edited_message', (ctx) => {
//   console.log(ctx)
// })
registryScene.on("message", async (ctx) => {
  console.log(ctx.message)
  // if (ctx.message.text === undefined) ctx.reply("No such option");
  if(ctx.message.reply_to_message?.text === 'Add your requirement'){
    ctx.session.influencer.requirement = ctx.message.text
    await ctx.reply('Requirement saved!')
    return await ctx.scene.enter('influencer-scene-id')
  }
  if(ctx.message.reply_to_message?.text === 'Add your wallet address'){
    ctx.session.influencer.wallet = ctx.message.text
    await ctx.reply('Wallet address saved!')
    return await ctx.scene.enter('influencer-scene-id')
  }
  return await ctx.reply("No such option");
});

registryScene.action("1", (ctx) => {
  ctx.editMessageReplyMarkup(socialButtonsForRegistry().reply_markup);
});
registryScene.action("2", async (ctx)=>{
  ctx.scene.enter('influencer-scene-package-id')
});
registryScene.action("3", async (ctx) => {
  await ctx.deleteMessage()
  await ctx.reply('Add your requirement', {reply_markup: {force_reply: true}})
});
registryScene.action("4", async (ctx) => {
  await ctx.deleteMessage()
  await ctx.reply('Add your wallet address', {reply_markup: {force_reply: true}})
});
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