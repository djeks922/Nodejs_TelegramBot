export const startHandler = async (ctx) => {
  try {
    await ctx.reply(`Hello, ${ctx.message.from.first_name}`);
  } catch (error) {
    throw error;
  }
};

export const helpHandler = (ctx) => {
  try {
    ctx.replyWithHTML(
      `<strong>/start</strong>- initialize bot\n<strong>/help</strong> - get information about commands\n<strong>/add</strong> - add proposal for promotion\n<strong>/register</strong> - register as influencer`
    );
  } catch (error) {
    throw error;
  }
};
