import { Markup } from "telegraf";

export const adminPaymentButtons = (trID) => {
  return Markup.inlineKeyboard([
    Markup.button.callback("Verify", `adminvt ${trID}`),
    Markup.button.callback("Reject", `adminrt ${trID}`),
  ]);
};
export const influencerPaymentButtons = (transaction) => {
  return Markup.inlineKeyboard([
    Markup.button.callback("Mark as notified", `infvt ${transaction._id}`),
    Markup.button.callback("There is problem?", `infrt ${transaction._id}`),
  ]);
};
