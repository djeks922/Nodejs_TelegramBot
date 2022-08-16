import { Composer } from "telegraf";
import {
  add,
  register,
  myproposals,
  verifiedTransactions,
  stat,
  retrieveInfluencers,
  getTransactionTx,
  getTransactionKeyword,
  add_webappversion,
  showproposals
} from "./handlers.js";
const composer = new Composer();

// Add command
// composer.command("add", add); //Telegram inline UI
composer.command("add", add_webappversion); // Webapp version

composer.command("register", register);

// composer.command("myproposals", myproposals);
composer.command("myproposals", showproposals);


composer.command("verifiedtransactions", verifiedTransactions);

composer.command("stat", stat);

composer.command('transactionbytx', getTransactionTx)
composer.command('transactionbykeyword', getTransactionKeyword)

composer.command('getinfluencers', retrieveInfluencers)

export default composer;
