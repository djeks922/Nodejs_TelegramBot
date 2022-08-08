import mongoose from "mongoose";
import logger from "../logger/index.js";
import {proposalListener} from "../events/proposal.js";
import {influencerListener} from "../events/registry.js";

mongoose.connection
  .once("connected", () => {
    logger.debug("Connected to DB...");
  })
  .on("error", (error) => {
    logger.error(`Error connecting to DB: ${error.message}`);
    dbConnect()
  })
  .on("disconnected", async () => {
    logger.info(`Disconnected from DB...`);
  })
  .on("connecting", () => {
    logger.debug(`Connecting to Db...`);
  })
  .on("reconnected", () => {
    logger.debug(`Reconnecting to Db...`);
  })
  .on("disconnecting", async () => {
    logger.debug(`Disconnecting from Db...`);
    await proposalListener.close()
    await influencerListener.close()

    console.log(proposalListener.closed,influencerListener.closed)
  })
  

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

let dbConnect;
export default dbConnect = async () => {
  const dbAddress = process.env.DB_URL;
  // mongoose.set("bufferCommands", false);
  const options = {
    // autoCreate: false,
    // autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 100 socket connections
    minPoolSize: 2, // Maintain up to 100 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 5000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  };
  try {
   await mongoose.connect(dbAddress, options)
  } catch (error) {
    throw error
  }
  
};
