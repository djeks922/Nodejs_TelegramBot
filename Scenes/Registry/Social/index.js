import { Scenes } from "telegraf";
import { enter } from "./handlers.js";
import { socialButtonsForSocial } from "./markup.js";
import { createSocial } from "../../../api/service/influencer.js";
const { WizardScene } = Scenes;

const existSocial = (arr = [], obj) => {
  return arr.find((e) => e.platform === obj.platform && e.url === obj.url);
};

export const socialScene = new WizardScene(
  "influencer-scene-social-id",
  async (ctx) => {
    try {
      ctx.session.socialtmp.url = ctx.message.text;
      if (!existSocial(ctx.session.influencer.socials, ctx.session.socialtmp)) {
        const _social = await createSocial(undefined, ctx.session.socialtmp);
        await ctx.reply("Saved!");
        ctx.session.influencer.socials.push(_social);
        // await ctx.session.influencer.save();
        await ctx.scene.enter("influencer-scene-id");
      } else {
        await ctx.reply("Social already exist,enter valid url");
      }
    } catch (error) {
      throw error;
    }
  }
);

socialScene.enter(enter);
socialScene.leave((ctx) => {
  console.log("leaved social scene");
});

socialScene.action(/ss +/, async (ctx) => {
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
});

socialScene.on("callback_query", async (ctx) => {
  try {
    await ctx.answerCbQuery();
  } catch (error) {
    throw error;
  }
});

export default socialScene;
