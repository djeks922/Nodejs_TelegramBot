import {startText, helpText} from './text.js'


export const startHandler = async (ctx) => {
  try {
    await ctx.replyWithHTML(startText(ctx));
  } catch (error) {
    throw error;
  }
};

export const helpHandler = (ctx) => {
  try {
    ctx.replyWithHTML(helpText(ctx));
  } catch (error) {
    throw error;
  }
};
