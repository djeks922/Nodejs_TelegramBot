import bot from "./config/bot.config.js";
import start from "./Composers/start/index.js";
import commands from "./Composers/commands/index.js";
import actions from "./Composers/actions/index.js";
import on from "./Composers/on/index.js";
import scenes from "./Scenes/index.js";
import logger from "./api/logger/index.js";
import sessionMiddleware from "./helpers/sessionCustomerMiddleware.js";

bot.use(scenes);
bot.use(sessionMiddleware);

bot.use(start);

bot.use(commands);
bot.use(on);
bot.use(actions);

bot.catch((err, ctx) => {
  logger.error(err);
  ctx.reply("I do not feel well, :( , Please try it later.");
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
