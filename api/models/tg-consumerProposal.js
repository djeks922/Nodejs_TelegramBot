import mongoose from "mongoose";

const { Schema, model } = mongoose;

const proposalSchema = new Schema(
  {
    name: { type: String, required: true },
    website: { type: String, required: true },
    contractAddress: { type: String, required: true },
    twitter: String,
    telegram: String,
    developerUsername: String,
    description: String,
    packages: [{type: Schema.Types.ObjectId, ref: "tg-package"}],
    packagesPayedToAdmin: [{type: Schema.Types.ObjectId, ref: 'tg-package'}],
    packagesPayedToInfluencer: [{type: Schema.Types.ObjectId, ref: 'tg-package'}],
    consumer: { type: Schema.Types.ObjectId, ref: "tg-consumer" },
    status: {
      type: String,
      enum: ["staged", "approved", "rejected-by-admin" ,"accepted", "rejected-by-influencer"],
      default: "staged",
    },
    acceptedBy: [{ type: Schema.Types.ObjectId, ref: "tg-influencer" }],
    approvedFor: [{ type: Schema.Types.ObjectId, ref: "tg-influencer" }],
    approvedBy: { type: Schema.Types.ObjectId, ref: "tg-consumer" },
  },
  { timestamps: true }
);

export default model("tg-proposal", proposalSchema);
