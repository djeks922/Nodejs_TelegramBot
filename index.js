import { Telegraf, Markup } from "telegraf";
import {config} from 'dotenv'
import startComposer from './Composers/start.composer.js'
config()

const bot = new Telegraf(process.env.TOKEN)
bot.use(startComposer)


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))