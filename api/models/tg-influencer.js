import mongoose from "mongoose";
import logger from "../logger/index.js";
import Package from "./tg-package.js";
import Social from "./tg-social.js";

const { Schema, model } = mongoose;

const influencerSchema = new Schema(
  {
    name: String,
    username: String,
    userID: Number,
    chatID: Number,
    packages: [{ type: Schema.Types.ObjectId, ref: "tg-package" }],
    socials: [{ type: Schema.Types.ObjectId, ref: "tg-social" }],
    requirement: { type: String, default: "requirement" },
    wallet: { type: String, default: "wallet address" },
    status: {
      type: String,
      enum: ["staged", "inreview", "active", "inactive"],
      default: "staged",
    },
  },
  { timestamps: true }
);

influencerSchema.post("findOneAndDelete", async function (doc) {
  // console.log(doc);

  if (doc) {
    const packagesdeleted = await Package.deleteMany({
      influencer: doc._id,
    });
    const socialsdeleted = await Social.deleteMany({
      _id: { $in: doc.socials },
    });
    // console.log(`socialsdeleted: ${socialsdeleted}`)
    logger.info(
      `Influencer: ${"@" + doc.username + "/" + doc.name} deleted profile`
    );
  }
});

export default model("tg-influencer", influencerSchema);
