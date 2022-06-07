import { Scenes } from "telegraf";
import {
  enter,
  viewProfile,
  saveleave,
  applyForReview,
  deactivate,
  activate,
  updateProfile,
  deleteProfile,
  deleteAccVerStep,
  addPackage,
  addRequirement,
  addSocial,
  addWalletAddress,
  onMessage,
  onCallbackQr,
  addSocialActions,
  leave,
} from "./handlers.js";

const { BaseScene } = Scenes;

const registryScene = new BaseScene("influencer-scene-id");

registryScene.enter(enter);
registryScene.leave(leave);

registryScene.on("message", onMessage);

registryScene.action("1", addSocial);
registryScene.action("2", addPackage);
registryScene.action("3", addRequirement);
registryScene.action("4", addWalletAddress);
registryScene.action("5", viewProfile);
registryScene.action("6", saveleave);
registryScene.action("7", applyForReview);
registryScene.action("8", deactivate);
registryScene.action("9", activate);

registryScene.action("updateProfile", updateProfile);
registryScene.action("deleteinfluenceraccaunt", deleteAccVerStep);
registryScene.action(/Delete+/, deleteProfile);

// Social callback actions
registryScene.action(/rs +/, addSocialActions);

registryScene.on("callback_query", onCallbackQr);

export default registryScene;

export { socialScene } from "./Social/index.js";
export { packageScene } from "./Pkge/index.js";
export { requirementScene } from "./Requirement/index.js";
export { walletScene } from "./Wallet/index.js";
