import { Scenes } from "telegraf";

const { WizardScene } = Scenes;

const name = async (ctx) => {
    try {
      ctx.wizard.state.name = ctx.message.text
      await ctx.reply('Please,enter your nickname')
      ctx.wizard.next()
    } catch (error) {
      console.log(error)
    }
}

const consumerScene = new WizardScene(
  "influencer-scene-id",
   name
);

consumerScene.enter(async (ctx) => {
  try {
    await ctx.reply(`Hi again, ${ctx.message.from.first_name}`);
    await ctx.reply(`Please enter name`);
  } catch (error) {
    console.log(error);
  }
});

export default consumerScene;