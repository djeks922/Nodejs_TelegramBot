import member from "./memberLogging.js";
import { Composer } from "telegraf";

const composer = new Composer();

composer.use(member);


export {errorHandler} from './errorHandler.js'
export default composer;
