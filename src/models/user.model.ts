import mongoose, { Schema } from "mongoose";
import type { User } from "../types/user.types.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userShcema = new Schema<User>(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error(`Invalid Email: ${value}`);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value: string) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong");
        }
      },
    },
    avatar: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1740779693~exp=1740783293~hmac=3ffc11733917c931bddeec957e8fa649e6a1590282b3210d816ccbf54dab2e94&w=900",
      validate(value: string) {
        if (!validator.isURL(value)) {
          throw new Error(`Url is not valid`);
        }
      },
    },
    age: {
      type: Number,
      required: false,
      min: 18,
      max: 108,
    },
    gender: {
      type: String,
      lowercase: true,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not a valid gender`,
      },
    },
    skills: {
      type: [String],
      validate(value: string[]) {
        if (value.length > 15) {
          throw new Error("Skills cannot be more than 15");
        }
      },
    },
  },
  {
    timestamps: true,
  },
);

userShcema.pre("save", async function () {
  if (!this.isModified(this.password)) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userShcema.methods.isPasswordCorrect = async function (
  userPassword: string,
): Promise<Boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

userShcema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESSTOKEN_SECRET as string,
    { expiresIn: "1d" },
  );
};

userShcema.methods.generateRefreshToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.REFRESHTOKEN_SECRET as string,
    { expiresIn: "1d" },
  );
};

export default mongoose.model("User", userShcema);
