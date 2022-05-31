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

registryScene.hears('back to registry', async(ctx) => {
  await ctx.scene.enter('influencer-scene-id')
  await ctx.deleteMessage()
  await ctx.deleteMessage(ctx.message.message_id - 1)
})

registryScene.on("message", async (ctx) => {
  // console.log(ctx.message)
  // if (ctx.message.text === undefined) ctx.reply("No such option");
  if(ctx.message.reply_to_message?.text === 'Add your requirement(reply to this message)'){
    ctx.session.influencer.requirement = ctx.message.text
    await ctx.reply('Requirement saved!', {'reply_markup': {'remove_keyboard': true}})
    await ctx.deleteMessage()
    await ctx.deleteMessage(ctx.message.message_id - 1)
    return await ctx.scene.enter('influencer-scene-id')
  }
  if(ctx.message.reply_to_message?.text === 'Add your wallet address(reply to this message)'){
    ctx.session.influencer.wallet = ctx.message.text
    await ctx.reply('Wallet address saved!',{'reply_markup': {'remove_keyboard': true}})
    await ctx.deleteMessage()
    await ctx.deleteMessage(ctx.message.message_id - 1)
    return await ctx.scene.enter('influencer-scene-id')
  }
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
  await ctx.reply('Add your requirement(reply to this message)', {reply_markup: {'force_reply': true,'keyboard':[['back to registry']],'one_time_keyboard': true,'resize_keyboard':true}})
});
registryScene.action("4", async (ctx) => {
  await ctx.deleteMessage()
  await ctx.reply('Add your wallet address(reply to this message)', {reply_markup: {'force_reply': true,'keyboard':[['back to registry']],'one_time_keyboard': true,'resize_keyboard':true}})
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