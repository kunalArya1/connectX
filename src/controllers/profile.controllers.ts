import { type Request, type Response } from "express";
import ApiResponse from "../utils/ApiResponse.js";
import catchAsynError from "../utils/catchAsync.js";
import User from "../models/user.model.js";
import { valideEditField } from "../utils/validation.js";
import ApiError from "../utils/ApiError.js";

export const profileView = catchAsynError(
  async (req: Request, res: Response) => {

    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json(new ApiResponse(404, {}, "Invalid Crenditals"))
    }

    res.status(200).json(new ApiResponse(200, user, "Profile fetched succesfully"));
  },
);

export const profileEdit = catchAsynError(
  async (req: Request, res: Response) => {
    const loggedInUser = req.user;

    if (!valideEditField(req)) {
      throw new Error("Invalid Edit request")
    }

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))

    await loggedInUser.save();

    const user = await User.findById(loggedInUser._id).select("-password");

    res.status(200).json(new ApiResponse(200, user, "Profile updated succesfully"));
  },
);
