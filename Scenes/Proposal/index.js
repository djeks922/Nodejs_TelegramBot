import { Scenes , Composer} from "telegraf";

import {
  nameStep,
  websiteStep,
  contractStep,
  twitterStep,
  telegramStep,
  developerUsernameStep,
  descriptionStep,
  enter,
  leave,
  done,
  onMessage,
  influencerSelectionActions,
  packageSelectionActions,
} from "./handlers.js";

const { WizardScene } = Scenes;

const selectionComposer = new Composer() 

selectionComposer.on('text', async ( ctx )=> {
  try {
    return await ctx.reply('Please select influencer from above list.')
  } catch (error) {
    throw error
  }
})

// selectionComposer.action(/ps+/g, influencerSelectionActions);
// selectionComposer.action(/pp+/, packageSelectionActions);

selectionComposer.on("callback_query", async (ctx) => {
  ctx.answerCbQuery('selectionComposer');
});

const consumerScene = new WizardScene(
  "consumer-scene-id",
  nameStep,
  websiteStep,
  contractStep,
  twitterStep,
  telegramStep,
  developerUsernameStep,
  descriptionStep,
  selectionComposer
);

consumerScene.enter(enter);
// consumerScene.leave(leave);

consumerScene.on("message", onMessage);

consumerScene.action("ps leave", leave);

consumerScene.action("ps done", done);

consumerScene.action(/ps+/g, influencerSelectionActions);

consumerScene.action(/pp+/, packageSelectionActions);

consumerScene.on("callback_query", async (ctx) => {
  ctx.answerCbQuery('consumerScene');
});

export default consumerScene;
