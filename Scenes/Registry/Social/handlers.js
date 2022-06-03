import { socialButtonsForSocial } from "./markup.js";

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
