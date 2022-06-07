import { createPackage } from "../../../api/service/influencer.js";
import { Markup } from "telegraf";

export const enter = async (ctx) => {
  try {
    await ctx.deleteMessage();
    await ctx.reply("Enter package name", {
      reply_markup: {
        keyboard: [["exit"]],
        resize_keyboard: true,
        input_field_placeholder: "ex: boost3x",
      },
    });
    await ctx.answerCbQuery();
  } catch (error) {
    throw error;
  }
};

export const onMessage = async (ctx, next) => {
  try {
    if (ctx.message.text === undefined)
      return await ctx.reply("Only text messages!");
    await next();
  } catch (error) {
    throw error;
  }
};

export const onExitHears = async (ctx) => {
  try {
    await ctx.scene.leave();
    await ctx.reply("See you", Markup.removeKeyboard());
    await ctx.scene.enter("influencer-scene-id");
  } catch (error) {
    throw error;
  }
};

export const nameStep = async (ctx) => {
  try {
    ctx.wizard.state.influencer = ctx.session.influencer._id
    ctx.wizard.state.name = ctx.message.text;
    await ctx.reply("Enter package detail", {
      reply_markup: { keyboard: [["exit"]], resize_keyboard: true },
    });
    ctx.wizard.next();
  } catch (error) {
    throw error;
  }
};

export const detailStep = async (ctx) => {
  try {
    ctx.wizard.state.detail = ctx.message.text;
    await ctx.reply("Enter package price", {
      reply_markup: {
        keyboard: [["exit"]],
        resize_keyboard: true,
        input_field_placeholder: "ex: 4000",
      },
    });
    ctx.wizard.next();
  } catch (error) {
    throw error;
  }
};

export const priceStep = async (ctx) => {
  try {
    ctx.wizard.state.price = ctx.message.text;

    const _pkg = await createPackage(ctx.wizard.state);
    ctx.session.influencer.packages.push(_pkg);
    await ctx.reply("Package saved!", Markup.removeKeyboard());
    // await ctx.session.influencer.save()
    ctx.scene.enter("influencer-scene-id");
  } catch (error) {
    throw error;
  }
};
