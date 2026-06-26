import { type Request, type Response } from "express";
import catchAsynError from "../utils/catchAsync.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import connectionsModel from "../models/connections.model.js";
import mongoose from "mongoose";

export const getAllRequest = catchAsynError(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    if (!userId) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "Unauthorized request"));
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const allRequestes = await connectionsModel.find({
      toUserId: userObjectId,
      status: "like",
    });

    if (allRequestes.length === 0) {
      return res.status(404).json(new ApiResponse(404, {}, "No request yet"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, allRequestes, "All request fetched successfully"),
      );
  },
);

export const allSentRequest = catchAsynError(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    if (!userId) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "Unauthorized request"));
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const allRequestes = await connectionsModel.find({
      fromUserId: userObjectId,
      status: "like",
    });

    if (allRequestes.length === 0) {
      return res.status(404).json(new ApiResponse(404, {}, "No request yet"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, allRequestes, "All request fetched successfully"),
      );
  },
);

export const getAllConnection = catchAsynError(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    if (!userId) {
      return res
        .status(401)
        .json(new ApiResponse(401, {}, "Unauthorized request"));
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const userConnections = await connectionsModel.find({
      $or: [
        {
          toUserId: userObjectId,
          status: "accept",
        },
        {
          fromUserId: userObjectId,
          status: "accept",
        },
      ],
    });

    if (userConnections.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, [], "No connections found yet"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          userConnections,
          "All connections fetched successfully",
        ),
      );
  },
);

export const getFeed = catchAsynError((req: Request, res: Response) => {
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Feed fetched succesfully"));
});
