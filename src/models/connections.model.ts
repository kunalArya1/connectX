import mongoose, { Schema } from "mongoose";
import type { Connections } from "../types/user.types.js";

const todoModel = new Schema<Connections>(
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

export default mongoose.model("TodoSchema", todoModel);
