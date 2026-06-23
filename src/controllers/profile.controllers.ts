import { type Request, type Response } from "express";
import ApiResponse from "../utils/ApiResponse.js";
import catchAsynError from "../utils/catchAsync.js";

export const profileView = catchAsynError(
  async (req: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, {}, ""));
  },
);

export const profileEdit = catchAsynError(
  async (req: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, {}, ""));
  },
);
