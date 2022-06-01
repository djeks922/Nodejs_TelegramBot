import { Composer } from "telegraf";
import {add,register,myproposals} from './handlers.js'
const composer = new Composer();

// Add command
composer.command("add", add);

composer.command("register", register);

composer.command("myproposals", myproposals);


export default composer;
