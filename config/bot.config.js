import { Telegraf } from "telegraf";
import dbConnect from "../api/config/db.js";

import { config } from "dotenv";
config();

dbConnect();

const bot = new Telegraf(process.env.TOKEN);


bot.telegram.setMyCommands([
  { command: "start", description: "Start the bot" },
  { command: "help", description: "Be aware of what you can do with bot" },
  { command: "add", description: "Add proposal" },
]);

export default bot;
