import { createConsumer } from "../../api/service/consumer.js";

export const startHandler = async (ctx) => {
  try {
    await ctx.reply(`Hello, ${ctx.message.from.first_name}`);
    // console.log(ctx)
    if(!ctx.session.consumer) {
    
      const  consumer = {
        name: ctx.message.from.first_name,
        username: ctx.message.from.username,
        userID: ctx.message.from.id,
        chatID: ctx.chat.id,
      }
      
      ctx.session.consumer = consumer
      createConsumer(consumer);
    }
   
  } catch (error) {
    throw error;
  }
};

export const helpHandler = (ctx) => {
  try {
    ctx.replyWithHTML(
      `<strong>/start</strong>- initialize bot\n<strong>/help</strong> - get information about commands\n<strong>/add</strong> - add proposal for promotion`
    );
  } catch (error) {
    throw error;
  }
};
