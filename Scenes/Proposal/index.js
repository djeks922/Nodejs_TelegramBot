import { Scenes } from "telegraf";

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

consumerScene.enter(enter);
// consumerScene.leave(leave);

consumerScene.on("message", onMessage);

consumerScene.action("ps leave", leave);

consumerScene.action("ps done", done);

consumerScene.action(/ps+/g, influencerSelectionActions);

consumerScene.action(/pp+/, packageSelectionActions);

consumerScene.on("callback_query", async (ctx) => {
  ctx.answerCbQuery();
});

export default consumerScene;
