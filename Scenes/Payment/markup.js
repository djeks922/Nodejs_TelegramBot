import { Markup } from "telegraf";

export const adminPaymentButtons = (trID) => {
    return Markup.inlineKeyboard([
        Markup.button.callback('Verify', `adminvt ${trID}`),
        Markup.button.callback('Reject', `adminrt ${trID}`)
    ])
}
export const influencerPaymentButtons = (transaction) => {
    return Markup.inlineKeyboard([
        Markup.button.callback('Verify', `infvt ${transaction._id}`),
        Markup.button.callback('Reject', `infrt ${transaction._id}`)
    ])
}