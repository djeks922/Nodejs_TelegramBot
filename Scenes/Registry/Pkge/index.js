import {Scenes} from 'telegraf'


const {WizardScene} = Scenes

export const packageScene = new WizardScene(
    "influencer-scene-package-id",
    async (ctx) => {
      await ctx.reply(`Enter package name`);
      ctx.wizard.next();
    },
    async (ctx) => {
      ctx.wizard.state.name = ctx.message.text;
      await ctx.reply("Enter package detail");
      ctx.wizard.next()
    },
    async (ctx) => {
      ctx.wizard.state.detail = ctx.message.text
      await ctx.reply("Enter package price")
      ctx.wizard.next()
    },
    async (ctx) => {
      ctx.wizard.state.price = ctx.message.text
      ctx.session.influencer.packages.push(ctx.wizard.state)
      await ctx.reply("Package saved!")
      ctx.scene.enter('influencer-scene-id')
    }
  );