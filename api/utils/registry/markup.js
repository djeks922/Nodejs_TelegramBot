import { Markup } from "telegraf";

export const adminButtons = (_influencer) => {

  return Markup.inlineKeyboard([
    Markup.button.callback(
      "activate",
      `admin-activated-influencer ${_influencer._id}`
    ),
    Markup.button.callback(
      "refuse to activate",
      `admin-rejectedActivation-influencer ${_influencer._id}`
    ),
  ]).selective(true)
    .oneTime()
    .resize();
};

export const updateProfile = () => {
  return Markup.inlineKeyboard([Markup.button.callback('Update profile', 'updateProfile')])
}




