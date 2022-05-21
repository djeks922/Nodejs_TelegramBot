import { Markup } from "telegraf";

export const leaveButton = () => {
   return  Markup.inlineKeyboard([Markup.button.callback("leave", "leave")])
}

export const influencerButtons = (influencers) => {
    const callbackArr = [];
    let counter = 0;
  
    for (const inf of influencers) {
      callbackArr.push(Markup.button.callback(`${counter}`, inf._id));
      counter++;
    }
  
    return Markup.inlineKeyboard([
      callbackArr,
      [Markup.button.callback("done", "done")],
    ]);
};