import { Composer } from "telegraf";
import {add,register,myproposals,verifiedTransactions} from './handlers.js'
const composer = new Composer();

// Add command
composer.command("add", add);

composer.command("register", register);

composer.command("myproposals", myproposals);

composer.command('verifiedtransactions', verifiedTransactions)


export default composer;
