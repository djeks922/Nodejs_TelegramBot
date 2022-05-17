import bot from './config/bot.config.js'
import start from './Composers/start.composer.js'
import stage from './Scenes/index.js'
import commands from './Composers/commands/index.js'

bot.use(stage.middleware())
bot.use(start)


bot.use(commands)



bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))