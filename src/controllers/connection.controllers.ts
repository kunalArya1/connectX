import { type Request, type Response } from "express";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import catchAsynError from "../utils/catchAsync.js";
import ConnectionModel from "../models/connections.model.js";
import mongoose from "mongoose";
import { type Connections } from "../types/user.types.js";
import User from "../models/user.model.js";

export const sendRequest = catchAsynError(
  async (req: Request, res: Response) => {
    const loggedInUser = req.user;
    const toUserId: string = req.params.toUserId as string;
    const status: string = req.params.status as string;

    const allowedStatus = ["pass", "like"];

    if (!allowedStatus.includes(status as string)) {
      return res.status(400).json(new ApiResponse(400, {}, "Invalid Status"));
    }

    if (!mongoose.isObjectIdOrHexString(toUserId)) {
      return res.status(400).json(new ApiResponse(400, {}, "Invalid UserId"));
    }

    const toUserExist = await User.findOne({ _id: toUserId });

    if (!toUserExist) {
      return res.status(404).json(new ApiResponse(404, {}, "User not found"));
    }

    // check for existing conection
    const existingConnection = await ConnectionModel.findOne({
      $or: [
        { fromUserId: loggedInUser._id, toUserId: toUserId },
        {
          fromUserId: toUserId,
          toUserId: loggedInUser._id,
        },
      ],
    });

    if (existingConnection) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Connection request alredy exist"));
    }

    const newConnection = await ConnectionModel.create({
      toUserId: toUserId,
      fromUserId: loggedInUser._id,
      status: status as Connections["status"],
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          newConnection,
          "Connection request sent succesfully",
        ),
      );
  },
);

export const reviewRequest = catchAsynError(
  async (req: Request, res: Response) => {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    // check for allowed status
    const allowedReview = ["accept", "reject"];

    if (!allowedReview.includes(status as string)) {
      return res.status(400).json(new ApiResponse(400, {}, "Invalid Status"));
    }

    // we will check only for that request which status is intrested
    const request = await ConnectionModel.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "like",
    });

    if (!request) {
      return res.status(404).json(new ApiResponse(404, {}, "No request found"));
    }

    // updata the status of the request
    request.status = status as Connections["status"];
    const coneectionData = await request.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          coneectionData,
          `Request ${status}ed successfully`,
        ),
      );
  },
);
