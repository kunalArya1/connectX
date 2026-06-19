import mongoose, { Schema } from "mongoose";

const userShcema = new Schema(
  {
    id: {
      type: Number,
    },
    username: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("UserShema", userShcema);
