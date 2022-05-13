import { Telegraf, Markup } from "telegraf";
import {config} from 'dotenv'
config()

const bot = new Telegraf(process.env.TOKEN)
bot.start((ctx) => ctx.reply(`Welcome ${ctx.message.from.first_name}`))
bot.help((ctx) => ctx.replyWithHTML(Markup))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.on('text', (ctx)=> {console.log(ctx)})

bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('hipster', Telegraf.reply('λ'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))



