import { Markup, Scenes } from "telegraf";
import { backToRegistryButtons } from "../markup.js";

const { BaseScene } = Scenes;

export const requirementScene = new BaseScene(
  "influencer-scene-requirement-id"
);

requirementScene.enter(async (ctx) => {
  try {
    await ctx.reply("Enter your requirement", backToRegistryButtons());
  } catch (error) {
    throw error;
  }
});
requirementScene.leave(async (ctx) => {
  // await ctx.scene.enter('influencer-scene-id')
});

requirementScene.hears("Back to registry", async (ctx) => {
  try {
    await ctx.scene.enter("influencer-scene-id");
  } catch (error) {
    throw error;
  }
});

requirementScene.on("text", async (ctx) => {
  try {
    ctx.session.influencer.requirement = ctx.message.text;
    await ctx.reply("Requirement saved!", Markup.removeKeyboard());
    await ctx.scene.enter("influencer-scene-id");
  } catch (error) {
    throw error;
  }
});
requirementScene.on("message", async (ctx) => {
  try {
    await ctx.reply("No such option");
  } catch (error) {
    throw error;
  }
});

requirementScene.on("callback_query", async (ctx) => {
  try {
    await ctx.answerCbQuery("");
  } catch (error) {
    throw error;
  }
});

export default requirementScene;
