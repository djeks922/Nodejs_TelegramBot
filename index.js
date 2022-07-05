import bot from "./config/bot.config.js";
import start from "./Composers/start/index.js";
import commands from "./Composers/commands/index.js";
import actions from "./Composers/actions/index.js";
import on, { errorHandler } from "./Composers/on/index.js";
import scenes from "./Scenes/index.js";
import webapp from "./webapp/index.js";

import express from "express";
import cors from "cors";
import routes from "./api/routes/index.js";
import errorMiddleware from "./api/middlewares/errorMiddleware.js";

/************************ Secret Path for bot updates to assing to Express Server ***************************** */

const secretPath = `/telegraf/${bot.secretPathComponent()}`;
bot.telegram.setWebhook(`${process.env.APITUNEL_URL}${secretPath}`);

/**************************************** Express App ************************************************* */

const app = express();

app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));

routes(app);
app.use(bot.webhookCallback(secretPath));

app.use(errorMiddleware);
app.listen(3002, () => {
  console.log("Example app listening on port 3002 !");
});

/**************************************** Telegram Bot & Handlers ************************************************* */

bot.use(scenes);

bot.use(start);

bot.use(commands);
bot.use(on);
bot.use(actions);

bot.use(webapp);

bot.catch(errorHandler);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => {
  bot.stop("SIGINT");
  bot.telegram.deleteWebhook();
});
process.once("SIGTERM", () => {
  bot.stop("SIGTERM");
  bot.telegram.deleteWebhook();
});
