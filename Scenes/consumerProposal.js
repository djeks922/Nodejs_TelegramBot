import { Scenes, Markup } from "telegraf";
import { createProposal } from "../api/service/proposal.js";
import { getInfluencers } from "../api/service/influencer.js";
const { WizardScene } = Scenes;

const influencerButtons = (influencers) => {
  const callbackArr = [];
  let counter = 0;

  for (const inf of influencers) {
    callbackArr.push(Markup.button.callback(`${counter}`, inf._id));
    counter++;
  }

  return Markup.inlineKeyboard([
    callbackArr,
    [Markup.button.callback("done", "done")],
  ]);
};

const nameStep = async (ctx) => {
  try {
    console.log(ctx.message.text, "name");
    await ctx.reply("Enter your token website");
    ctx.wizard.state.influencers = [];
    ctx.wizard.state.name = ctx.message.text;
    ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave();
    console.log(error);
  }
};
const websiteStep = async (ctx) => {
  try {
    console.log(ctx.message.text, "website");
    await ctx.reply("Keep going...");
    await ctx.reply("Enter token Contract Address");
    ctx.wizard.state.website = ctx.message.text;
    ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave();
    console.log(error);
  }
};
const contractStep = async (ctx) => {
  try {
    console.log(ctx.message.text, "contract");
    await ctx.reply("Enter token Twitter ");
    ctx.wizard.state.contractAddress = ctx.message.text;
    await ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave();
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
    ctx.scene.leave();
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
    ctx.scene.leave();
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
    ctx.scene.leave();
    console.log(error);
  }
};
const descriptionStep = async (ctx) => {
  try {
    console.log(ctx.message.text);
    ctx.wizard.state.description = ctx.message.text;
    const influencers = await getInfluencers();
    await ctx.reply(
      "Choose Influencers with whom you want to proceed promotion",
      influencerButtons(influencers)
    );
    // await ctx.wizard.next()
  } catch (error) {
    ctx.scene.leave();
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
    await ctx.reply(
      `Please enter your token name`,
      Markup.inlineKeyboard([Markup.button.callback("leave", "leave")])
    );
  } catch (error) {
    console.log(error);
  }
});

consumerScene.action("leave", (ctx) => {
  ctx.scene.leave();
  ctx.answerCbQuery('Come back when you feel ready :)')
});

consumerScene.action("done", async (ctx) => {
  await ctx.reply("Processing proposal...");
  await createProposal(ctx.wizard.state, ctx.chat.id);
  await ctx.reply(
    "Thanks for taken time, we will inform you as soon as possible :)"
  );
  ctx.scene.leave();
  return ctx.answerCbQuery("Nicee!");
});

consumerScene.action(/[0-9]+/g, async (ctx) => {
  if (ctx.wizard.state.influencers.indexOf(ctx.callbackQuery.data) === -1) {
    ctx.wizard.state.influencers.push(ctx.callbackQuery.data);
    ctx.answerCbQuery("Nice chose :)");
  } else {
    ctx.answerCbQuery("Already added", { show_alert: true });
  }
});

export default consumerScene;
