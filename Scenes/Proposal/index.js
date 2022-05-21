import { Scenes} from "telegraf";
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
  chooseInfluencer_callback,
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

consumerScene.action("leave", leave);

consumerScene.action("done", done);

consumerScene.action(/[0-9]+/g, chooseInfluencer_callback);

export default consumerScene;
