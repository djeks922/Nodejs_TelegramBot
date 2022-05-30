import { Markup } from "telegraf";

export const registryButtons = () => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("Social", "1"),
      Markup.button.callback("Package", "2"),
      Markup.button.callback("Requirement", "3")
    ],
    [Markup.button.callback("Wallet address", "4"), Markup.button.callback("View profile", "5")],
    [Markup.button.callback("Apply for review","7"),Markup.button.callback("save&leave", '6')]
  ]).resize(false);
};


