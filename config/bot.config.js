import { Telegraf,session } from "telegraf"
import {config} from 'dotenv'
import dbConnect from '../api/config/db.js'
config()
export default (() => {
    dbConnect()
    const bot = new Telegraf(process.env.TOKEN)
    bot.use(session())

    bot.telegram.setMyCommands([
        {command: 'start', description: 'Start the bot'},
        {command: 'help', description: 'Be aware of what you can do with bot'},
        {command: 'add', description: 'Add proposal'}
    ])

    return bot 
})()