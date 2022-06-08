import { backToRegistryButtons } from "../markup.js";
import { Markup } from "telegraf";

export const enter = async (ctx) => {
  try {
    await ctx.reply("Enter your requirement", backToRegistryButtons());
  } catch (error) {
    throw error;
  }
};

export const leave = async (ctx) => {
  // await ctx.scene.enter('influencer-scene-id')
};

export const onBackHears = async (ctx) => {
  try {
    await ctx.scene.enter("influencer-scene-id");
  } catch (error) {
    throw error;
  }

  // await ctx.deleteMessage()
  // await ctx.deleteMessage(ctx.message.message_id - 1)
};

export const onText = async (ctx) => {
  try {
    ctx.session.influencer.requirement = ctx.message.text;
    await ctx.reply("Requirement saved!", Markup.removeKeyboard());
    await ctx.scene.enter("influencer-scene-id");
  } catch (error) {
    throw error;
  }
};

export const onMessage = async (ctx) => {
  try {
    await ctx.reply("No such option");
  } catch (error) {
    throw error;
  }
};

export const onCallbackQr = async (ctx) => {
  try {
    await ctx.answerCbQuery("");
  } catch (error) {
    throw error;
  }
};
