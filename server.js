import bot from "./config/bot.config.js";
import start from "./Composers/start/index.js";
import commands from "./Composers/commands/index.js";
import actions from "./Composers/actions/index.js";
import on, { errorHandler } from "./Composers/on/index.js";
import scenes from "./Scenes/index.js";

import express from "express";
import cors from "cors";
import routes from "./api/routes/index.js";
import dbConnection from "./api/config/db.js";
import errorMiddleware from "./api/middlewares/errorMiddleware.js";
import logger from "./api/logger/index.js";

/************************ Secret Path for bot updates to assign to Express Server ***************************** */

const secretPath = `/telegraf/${bot.secretPathComponent()}`;

/**************************************** Express App ************************************************* */

const app = express();

app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));

routes(app);
app.use(bot.webhookCallback(secretPath));

app.use(errorMiddleware);
app.listen(3002, async () => {
  const info = await bot.telegram.getWebhookInfo();
  console.log(info);
  if (info.url) {
    const dropInfo = await bot.telegram.deleteWebhook({ drop_pending_updates: true });
    console.log({dropInfo})
    const ret = await bot.telegram.setWebhook(
      `${process.env.APP_URL}${secretPath}`,
      { drop_pending_updates: false }
    );
    console.log(ret);
  }else{
    const setWebhookInfo = await bot.telegram.setWebhook(
      `${process.env.APP_URL}${secretPath}`,
      { drop_pending_updates: false }
    );
    console.log({setWebhookInfo});
  }

  await dbConnection();
  logger.info("Example app listening on port 3002 !");
});

/**************************************** Telegram Bot & Handlers ************************************************* */

bot.use(scenes);

bot.use(start);

bot.use(commands);
bot.use(on);
bot.use(actions);


bot.catch(errorHandler);

// bot.launch()

// Enable graceful stop

process.on("SIGINT", () => {
  bot.stop("SIGINT");
  logger.info("sigint");
  bot.telegram.deleteWebhook({ drop_pending_updates: true });
});
process.on("SIGTERM", () => {
  bot.stop("SIGTERM");
  logger.info("sigterm");
  bot.telegram.deleteWebhook({ drop_pending_updates: true });
});
