import { influencerButtons, leaveButton, leaveButtonEdited ,sentProposalButton} from "./markup.js";
import { createProposal } from "../../api/service/proposal.js";
import { getInfluencers } from "../../api/service/influencer.js";

export const nameStep = async (ctx) => {
  try {
    await ctx.reply("Enter your token website");
    ctx.wizard.state.influencers = [];
    ctx.wizard.state.name = ctx.message.text;
    await ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave();
    throw error;
  }
};

export const websiteStep = async (ctx) => {
  try {
    await ctx.reply("Keep going...");
    await ctx.reply("Enter token Contract Address");
    ctx.wizard.state.website = ctx.message.text;
    ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave();
    throw error;
  }
};
export const contractStep = async (ctx) => {
  try {
    await ctx.reply("Enter token Twitter ");
    ctx.wizard.state.contractAddress = ctx.message.text;
    await ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave();
    throw error;
  }
};
export const twitterStep = async (ctx) => {
  try {
    await ctx.reply("Enter your token telegram");
    ctx.wizard.state.twitter = ctx.message.text;
    ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave();
    throw error;
  }
};
export const telegramStep = async (ctx) => {
  try {
    await ctx.reply("Enter your token developer telegram username");
    ctx.wizard.state.telegram = ctx.message.text;
    ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave();
    throw error;
  }
};
export const developerUsernameStep = async (ctx) => {
  try {
    await ctx.reply("Enter your token description");
    ctx.wizard.state.developerUsername = ctx.message.text;
    ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave();
    throw error;
  }
};
export const descriptionStep = async (ctx) => {
  try {
    ctx.wizard.state.description = ctx.message.text;
    const influencers = await getInfluencers();
    await ctx.reply(
      "Choose Influencers with whom you want to proceed promotion",
      influencerButtons(influencers),
    );
  } catch (error) {
    ctx.scene.leave();
    throw error;
  }
};

export const enter = async (ctx) => {
  try {
    await ctx.reply(
      `Hi again, ${ctx.message.from.first_name}\nPlease enter your token name`,
      leaveButton()
    );
  } catch (error) {
    throw error;
  }
};

export const leave = async (ctx) => {
  try {
    // console.log(ctx.callbackQuery)
    await ctx.scene.leave();
    await ctx.editMessageReplyMarkup(leaveButtonEdited().reply_markup)
    await ctx.answerCbQuery("Come back when you feel ready :)");
  } catch (error) {
    throw error;
  }
};

export const done = async (ctx) => {
  try {
    if (ctx.wizard.state.influencers.length === 0)
      return ctx.answerCbQuery("You must choose min. 1 Influencer!");

    await ctx.reply("Processing proposal...");
    await createProposal(ctx.wizard.state, ctx.chat.id);
    await ctx.reply(
      "Thanks for taken time, we will inform you as soon as possible :)"
    );
    await ctx.editMessageReplyMarkup(sentProposalButton().reply_markup)
    await ctx.answerCbQuery("Nicee!");

    return ctx.scene.leave();
  } catch (error) {
    throw error;
  }
};

export const chooseInfluencer_callback = async (ctx) => {
  try {
    if (ctx.wizard.state.influencers.indexOf(ctx.callbackQuery.data) === -1) {
      ctx.wizard.state.influencers.push(ctx.callbackQuery.data);
      // await ctx
      await ctx.answerCbQuery("Nice chose :)");
    } else {
      await ctx.answerCbQuery("Already added", { show_alert: true });
    }
  } catch (error) {
    throw error;
  }
};
