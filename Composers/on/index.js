import member from "./memberLogging.js";
import { Composer } from "telegraf";

const composer = new Composer();

composer.use(member);

export default composer;
