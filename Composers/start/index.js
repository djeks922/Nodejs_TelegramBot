import { Composer } from "telegraf";
import { helpHandler, startHandler } from "./handlers.js";

const composer = new Composer();

composer.start(startHandler);
composer.help(helpHandler);

export default composer;
