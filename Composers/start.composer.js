import { Composer, Telegram } from "telegraf";
import { createConsumer } from "../api/service/consumer.js";
const composer = new Composer();

composer.start(async (ctx) => {
  try {
    await ctx.reply(`Hello, ${ctx.message.from.first_name}`);
    // console.log(ctx.message)
    createConsumer({
      name: ctx.message.from.first_name,
      username: ctx.message.from.username,
      userID: ctx.message.from.id,
      chatID: ctx.chat.id,
    });
    
  } catch (error) {
    throw error;
  }

  // console.log(ctx.user)
});

composer.help((ctx) => {
  try {
    ctx.replyWithHTML(
      `<strong>/start</strong>- initialize bot\n<strong>/help</strong> - get information about commands\n<strong>/add</strong> - add proposal for promotion`
    );
  } catch (error) {
    throw error;
  }
});

export default composer;
