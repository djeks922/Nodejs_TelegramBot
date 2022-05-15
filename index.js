import { Telegraf,Scenes,session } from "telegraf";
import {config} from 'dotenv'
import startComposer from './Composers/start.composer.js'
import stage from './Scenes/index.js'
config()
const user = []
const bot = new Telegraf(process.env.TOKEN)
bot.telegram.setMyCommands([
    {command: 'start', description: 'Start the bot'},
    {command: 'help', description: 'Be aware of what you can do with bot'},
    {command: 'add', description: 'Add proposal'}
])

bot.context.user = user
bot.use(session())
bot.use(stage.middleware())
bot.use(startComposer)

bot.command('add', (ctx)=> {
    ctx.scene.enter('cid')
})


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))