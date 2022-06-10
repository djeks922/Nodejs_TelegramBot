import mongoose from "mongoose";

const { Schema, model } = mongoose;

const transactionSchema = new Schema(
  {
    txID: String,
    from: { type: Schema.Types.ObjectId, ref: "tg-consumer" },
    to: { type: Schema.Types.ObjectId, refPath: "onUser" },
    onUser: { type: String, enum: ["tg-consumer", "tg-influencer"] },
    proposal: { type: Schema.Types.ObjectId, ref: "tg-proposal" },
    package: { type: Schema.Types.ObjectId, ref: "tg-package" },
    status: {
      type: String,
      enum: [
        "NOT VERIFIED",
        "VERIFIED-admin",
        "VERIFIED-influencer",
        "REJECTED-admin",
        "REJECTED-influencer",
      ],
      default: "NOT VERIFIED",
    },
    forwarded: {type: Boolean, default: false}
  },
  { timestamps: true }
);

export default model("tg-transaction", transactionSchema);
