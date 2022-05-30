import { Markup } from "telegraf";

export const adminButtons = () => {

  return Markup.inlineKeyboard([
    Markup.button.callback(
      "activate",
      "admin-activated-influencer"
    ),
    Markup.button.callback(
      "refuse to activate",
      "admin-rejectedActivation-influencer"
    ),
  ])
    .oneTime()
    .resize();
};




