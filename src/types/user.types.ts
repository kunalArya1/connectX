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
