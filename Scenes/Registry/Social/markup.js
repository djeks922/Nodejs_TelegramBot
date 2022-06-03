import { Markup } from "telegraf";

export const socialButtonsForRegistry = () => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("Facebook (Page)", "rs Facebook"),
      Markup.button.callback("Telegram (Channel)", "rs Telegram"),
    ],
    [
      Markup.button.callback("Instagram", "rs Instagram"),
      Markup.button.callback("Twitter", "rs Twitter"),
      Markup.button.callback("Youtube", "rs Youtube"),
    ],
    [Markup.button.callback("Go back", "rs back")],
  ]).resize(false);
};
export const socialButtonsForSocial = () => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("Facebook (Page)", "ss Facebook"),
      Markup.button.callback("Telegram (Channel)", "ss Telegram"),
    ],
    [
      Markup.button.callback("Instagram", "ss Instagram"),
      Markup.button.callback("Twitter", "ss Twitter"),
      Markup.button.callback("Youtube", "ss Youtube"),
    ],
    [Markup.button.callback("Go back", "ss back")],
  ]).resize(false);
};
