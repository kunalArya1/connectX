import type mongoose from "mongoose";
type Gender = "Male" | "Female" | "Other";
export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar: string;
  skills: string[];
  about: string;
  age: number;
  gender: Gender;
  resetPasswordToken: string;
  resetPasswordExpires: number;
  isPasswordCorrect(password: string): boolean;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

export interface UserSignUp {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
export interface UserSignIn {
  email: string;
  password: string;
}

export interface UserChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface Connections {
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId;
  };
  toUserId: {
    type: mongoose.Schema.Types.ObjectId;
  };
  status: string;
}

import { Types } from "mongoose";

export interface JwtPayload {
  _id: Types.ObjectId;
  email: string;
}
