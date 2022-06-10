import { Telegraf } from "telegraf";
import dbConnect from "../api/config/db.js";

import { config } from "dotenv";
config();

dbConnect();

const bot = new Telegraf(process.env.TOKEN);

bot.telegram.setMyCommands(
  [
    { command: "start", description: "Start the bot" },
    { command: "help", description: "Be aware of what you can do with bot" },
    { command: "add", description: "Add proposal" },
    { command: "register", description: "Register as Influencer" },
    {
      command: "myproposals",
      description: "Proposals which were staged by you",
    },
  ],
  { scope: { type: "all_private_chats" } }
);

bot.telegram.setMyCommands(
  [],
  { scope: { type: 'all_group_chats' } }
);
bot.telegram.setMyCommands(
  [
    {
      command: "verifiedtransactions",
      description: "get verified transactions",
    },
  ],
  {
    scope: {
      type: "chat_administrators",
      chat_id: +process.env.ADMIN_CHAT_ID,
    },
  }
);

export default bot;
