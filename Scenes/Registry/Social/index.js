import { Scenes } from "telegraf";
import {enter} from './handlers.js'
import { socialButtonsForSocial } from "./markup.js";
const { WizardScene } = Scenes;

export const socialScene = new WizardScene(
    "influencer-scene-social-id",
    async (ctx) => {
      ctx.session.socialtmp.url = ctx.message.text;
      console.log(ctx.session.socialtmp)
      await ctx.reply("Saved!");
      ctx.session.influencer.socials.push(ctx.session.socialtmp);
      ctx.session.socialtmp = undefined
      await ctx.scene.enter("influencer-scene-id");
    }
  );

socialScene.enter(enter);
socialScene.leave((ctx) => {
    console.log("leaved");
  });

socialScene.action(/ss +/, async (ctx)=> {
  await ctx.answerCbQuery()
  const platform = ctx.callbackQuery.data.split(' ')[1]
  if(platform === 'back') {
      await ctx.deleteMessage()
      return ctx.scene.enter('influencer-scene-id')
    }
  ctx.session.socialtmp.platform = platform
  await ctx.editMessageText(`Enter ${platform} URL`,socialButtonsForSocial())
  
})

socialScene.on('callback_query', async (ctx) => {
    ctx.answerCbQuery()
})

export default socialScene
