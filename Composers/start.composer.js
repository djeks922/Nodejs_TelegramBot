import { Composer, Markup, Telegram } from "telegraf";
import { createConsumer } from "../api/service/consumer.js";
const composer = new Composer();

composer.start(async (ctx) => {
  try {
    await ctx.reply(`Hello, ${ctx.message.from.first_name}`);
    // console.log(ctx.message)
    if(ctx.message.from.username === 'alexander_g23'){
      createConsumer({
        name: ctx.message.from.first_name,
        username: ctx.message.from.username,
        userID: ctx.message.from.id,
        chatID: ctx.chat.id,
        isAdmin: true
    });
    }else{
      createConsumer({
        name: ctx.message.from.first_name,
        username: ctx.message.from.username,
        userID: ctx.message.from.id,
        chatID: ctx.chat.id,
      })
    }
    
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

composer.on('sticker', (ctx) => {
  ctx.reply('Nice sticker :)')
  // ctx.reply('chooseinfluencers',Markup.inlineKeyboard([Markup.button.callback('salam','salm')]).oneTime(false))
})

// composer.action('salm', async (ctx) => {
//   await ctx.answerCbQuery('nice', {'show_alert': true})
//   console.log('action salm')
  
// })

export default composer;
