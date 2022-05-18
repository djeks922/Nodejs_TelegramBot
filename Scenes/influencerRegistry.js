import { Scenes } from "telegraf";

const { WizardScene } = Scenes;

const name = async (ctx) => {
    
}

const consumerScene = new WizardScene(
  "influencer-scene-id",

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