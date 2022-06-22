import winston from "winston";
import levels from "./levels.js";
import { errorFormat, formatProduction, infoFormat,combineFormat} from "./logFormat.js";
import color from "./color.js";
import {config} from 'dotenv'
config()

winston.addColors(color);
const logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL,
  levels: levels,
});

logger.format = formatProduction;
// logger.add(
//   new winston.transports.File({
//     filename: "app.log",
//     level: "info",
//     colorize: false,
//     format: infoFormat,
//     maxsize: 5242880, //5mb,
//     maxFiles: 15,
//   })
// );
// logger.add(
//   new winston.transports.File({
//     filename: "combine.log",
//     level: "info",
//     format: combineFormat,
//     maxsize: 5242880, //5mb,
//     maxFiles: 15,
//   })
// );
// logger.add(
//   new winston.transports.File({
//     // handleExceptions: true,
//     filename: "error.log",
//     level: "error",
//     format: errorFormat,
//     maxsize: 5242880, //5mb,
//     maxFiles: 15,
//   })
// );
logger.add(
  new winston.transports.Console()
);

export default logger;
