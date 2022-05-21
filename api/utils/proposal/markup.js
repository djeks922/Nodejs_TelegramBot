import { Markup } from "telegraf";

export const adminButtons = (data, admin) => {
  return Markup.inlineKeyboard([
    Markup.button.callback(
      "approve",
      `a-a ${data.documentKey._id} ${admin._id}`
    ),
    Markup.button.callback(
      "reject",
      `r-a ${data.documentKey._id} ${admin._id}`
    ),
  ])
    .oneTime()
    .resize();
};

export const influencerButtons = (proposal, inf) => {
  return Markup.inlineKeyboard([
    Markup.button.callback("accept", `a-i ${proposal._id} ${inf._id}`),
    Markup.button.callback("reject", `r-i ${proposal._id} ${inf._id}`),
  ])
    .oneTime()
    .resize();
};
