import {Markup, Scenes} from 'telegraf'
import {createPackage} from '../../../api/service/influencer.js'

const {WizardScene} = Scenes

export const packageScene = new WizardScene(
    "influencer-scene-package-id",
    async (ctx) => {
      ctx.wizard.state.name = ctx.message.text;
      await ctx.reply("Enter package detail",{reply_markup: {keyboard: [['exit']],resize_keyboard: true}});
      ctx.wizard.next()
    },
    async (ctx) => {
      ctx.wizard.state.detail = ctx.message.text
      await ctx.reply("Enter package price",{reply_markup: {keyboard: [['exit']],resize_keyboard: true, 'input_field_placeholder': 'ex: 4000'}})
      ctx.wizard.next()
    },
    async (ctx) => {
      ctx.wizard.state.price = ctx.message.text

      const _pkg = await createPackage(ctx.wizard.state)
      ctx.session.influencer.packages.push(_pkg)
      await ctx.reply("Package saved!", Markup.removeKeyboard())
      // await ctx.session.influencer.save()
      ctx.scene.enter('influencer-scene-id')
    }
  );

packageScene.enter(async(ctx)=>{
  
    await ctx.deleteMessage()
    await ctx.reply('Enter package name',{reply_markup: {'keyboard': [['exit']],'resize_keyboard': true, 'input_field_placeholder': 'ex: boost3x'}})
    await ctx.answerCbQuery()
})  

// packageScene.on('text', async (ctx, next) => {
//   await next()
// })  
packageScene.on('message', async (ctx, next) => {
  if(ctx.message.text === undefined)
    return await ctx.reply('Only text messages!')
  await next()  
})  



packageScene.hears('exit', async (ctx) => {
  await ctx.scene.leave()
  await ctx.reply('See you', Markup.removeKeyboard())
  await ctx.scene.enter('influencer-scene-id')
})