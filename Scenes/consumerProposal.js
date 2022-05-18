import { Scenes } from "telegraf";

const { WizardScene } = Scenes;

const nameStep = async (ctx) => {
  try {
    console.log(ctx.message.text, 'name');
    await ctx.reply("Enter your token website");
    ctx.wizard.state.name = ctx.message.text;
    ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave()
    console.log(error);
  }
};
const websiteStep = async (ctx) => {
  try {
    console.log(ctx.message.text, 'website');
    await ctx.reply("Keep going...");
    await ctx.reply("Enter token Contract Address");
    ctx.wizard.state.url = ctx.message.text;
    ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave()
    console.log(error);
  }
};
const contractStep = async (ctx) => {
  try {
    console.log(ctx.message.text, 'contract')
    await ctx.reply("Enter token Twitter ");
    ctx.wizard.state.contractAddress = ctx.message.text;
    await ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave()
    console.log(error);
  }
};
const twitterStep = async (ctx) => {
  try {
    console.log(ctx.message.text);
    await ctx.reply("Enter your token telegram");
    ctx.wizard.state.twitter = ctx.message.text;
    ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave()
    console.log(error);
  }
};
const telegramStep = async (ctx) => {
  try {
    console.log(ctx.message.text);
    await ctx.reply("Enter your token developer telegram username");
    ctx.wizard.state.telegram = ctx.message.text;
    ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave()
    console.log(error);
  }
};
const developerUsernameStep = async (ctx) => {
  try {
    console.log(ctx.message.text);
    await ctx.reply("Enter your token description");
    ctx.wizard.state.developerUsername = ctx.message.text;
    ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave()
    console.log(error);
  }
};
const descriptionStep = async (ctx) => {
  try {
    console.log(ctx.message.text);
    await ctx.reply("Thanks for taken time, we will inform you as soon as possible :)");
    ctx.wizard.state.description = ctx.message.text;
    ctx.session.tokenDetails = ctx.wizard.state
    ctx.scene.leave()
  } catch (error) {
    ctx.scene.leave()
    console.log(error);
  }
};

const consumerScene = new WizardScene(
  "consumer-scene-id",
  nameStep,
  websiteStep,
  contractStep,
  twitterStep,
  telegramStep,
  developerUsernameStep,
  descriptionStep
);

consumerScene.enter(async (ctx) => {
  try {
    await ctx.reply(`Hi again, ${ctx.message.from.first_name}`);
    await ctx.reply(`Please enter your token name`);
  } catch (error) {
    console.log(error);
  }
});

export default consumerScene;
