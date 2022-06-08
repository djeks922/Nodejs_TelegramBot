import { Scenes } from "telegraf";
import {
  detailStep,
  enter,
  nameStep,
  onExitHears,
  onMessage,
  priceStep,
} from "./handlers.js";

const { WizardScene } = Scenes;

export const packageScene = new WizardScene(
  "influencer-scene-package-id",
  nameStep,
  detailStep,
  priceStep
);

packageScene.enter(enter);

packageScene.on("message", onMessage);

packageScene.hears("exit", onExitHears);
