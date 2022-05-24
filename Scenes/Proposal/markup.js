import { Markup } from "telegraf";


export const leaveButton = () => {
   return  Markup.inlineKeyboard([Markup.button.callback("leave", "ps leave")])
}

export const leaveButtonEdited = () => {
   
   return  Markup.inlineKeyboard([[Markup.button.callback("leaved", "ps leaved")]])
}

export const influencerButtons = (influencers) => {
    const callbackArr = [];
    let counter = 0;
  
    for (const inf of influencers) {
      callbackArr.push(Markup.button.callback(`${counter}`, `ps ${inf._id}`));
      counter++;
    }
  
    return Markup.inlineKeyboard([
      callbackArr,
      [Markup.button.callback("done", "ps done")],
    ]);
};

export const sentProposalButton = () => {
  return Markup.inlineKeyboard([Markup.button.callback('sent', 'ps sent')])
}