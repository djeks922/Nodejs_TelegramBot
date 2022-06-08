import { socialButtonsForSocial } from "./markup.js";
import { createSocial } from "../../../api/service/influencer.js";

const existSocial = (arr = [], obj) => {
  return arr.find((e) => e.platform === obj.platform && e.url === obj.url);
};

export const enter = async (ctx) => {
  try {
    ctx.session.socialtmp = {};
    const platform = ctx.callbackQuery.data.split(" ")[1];
    ctx.session.socialtmp.platform = platform;
    await ctx.editMessageText(
      `Enter ${platform} URL`,
      socialButtonsForSocial()
    );
  } catch (error) {
    throw error;
  }
};

export const leave = (ctx) => {
  console.log("leaved social scene");
};

export const platformActions = async (ctx) => {
  try {
    await ctx.answerCbQuery();
    const platform = ctx.callbackQuery.data.split(" ")[1];
    if (platform === "back") {
      await ctx.deleteMessage();
      return ctx.scene.enter("influencer-scene-id");
    }
    ctx.session.socialtmp.platform = platform;
    await ctx.reply(`Enter ${platform} URL`, {
      reply_markup: { force_reply: true },
    });
  } catch (error) {
    throw error;
  }
};

export const urlStep = async (ctx) => {
  try {
    ctx.session.socialtmp.url = ctx.message.text;
    if (!existSocial(ctx.session.influencer.socials, ctx.session.socialtmp)) {
      const _social = await createSocial(undefined, ctx.session.socialtmp);
      await ctx.reply("Saved!");
      ctx.session.influencer.socials.push(_social);
      ctx.session.socialtmp = undefined;
      await ctx.scene.enter("influencer-scene-id");
    } else {
      await ctx.reply("Social already added,enter valid url");
    }
  } catch (error) {
    throw error;
  }
};

export const onCallbackQr = async (ctx) => {
  try {
    await ctx.answerCbQuery();
  } catch (error) {
    throw error;
  }
};
