import mongoose, { Schema } from "mongoose";
import type { Connections } from "../types/user.types.js";
import type { NextFunction } from "express";

const connectionModel = new Schema<Connections>(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["pass", "like", "accept", "reject"],
        message: `{VALUE} is not valid connection status`,
      },
    },
  },
  { timestamps: true },
);

connectionModel.pre("save", function (next) {
  if (this.toUserId.equals(this.fromUserId)) {
    throw new Error("Both user id can't be same");
  }
});

export default mongoose.model("TodoSchema", connectionModel);
