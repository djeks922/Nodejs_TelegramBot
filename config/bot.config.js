import { Telegraf } from "telegraf";

import { config } from "dotenv";
config();



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

bot.telegram.setMyCommands([], { scope: { type: "all_group_chats" } });
bot.telegram.setMyCommands(
  [
    {
      command: "verifiedtransactions",
      description: "get verified transactions",
    },
    {
      command: "stat",
      description: "Bot statistics about consumers, influencers and etc.",
    },
    { command: "getinfluencers", description: "Get list of influencers" },
    {
      command: "transactionbytx",
      description: "Get related transaction by txID",
    },
    {
      command: "transactionbykeyword",
      description:
        "Get list of transactions by keyword(Consumer name,username | Proposal name,website,telegram,twitter,developerUsername)",
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
