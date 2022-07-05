import bot from "./config/bot.config.js";
import start from "./Composers/start/index.js";
import commands from "./Composers/commands/index.js";
import actions from "./Composers/actions/index.js";
import on from "./Composers/on/index.js";
import scenes from "./Scenes/index.js";
import webapp from './webapp/index.js'
import logger from "./api/logger/index.js";

import express from 'express'
import cors from 'cors'
import routes from './api/routes/index.js'


const secretPath = `/telegraf/${bot.secretPathComponent()}`
bot.telegram.setWebhook(`${process.env.APITUNEL_URL}${secretPath}`)

const app = express()
app.use(cors())
app.use(express.json())
app.use('/public',express.static('public'))
app.get('/', (req, res) => res.send('Hello World!'))
app.use(bot.webhookCallback(secretPath))

app.use( async (err,res,req,next) => {
  const a = await bot.deleteWebhook()
  console.log(a, 'a')
})
app.listen(3002, () => {
  console.log('Example app listening on port 3002 !')
})

routes(app)

bot.use(scenes);

bot.use(start);

bot.use(commands);
bot.use(on);
bot.use(actions);

bot.use(webapp)

bot.catch((err, ctx) => {
  logger.error(err);
  ctx.tg.sendMessage(1316429545,JSON.stringify(err,Object.getOwnPropertyNames()));
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => {
  bot.stop("SIGINT")
  bot.telegram.deleteWebhook()
});
process.once("SIGTERM", () => {
  bot.stop("SIGTERM")
  bot.telegram.deleteWebhook()
});
