import { type Request, type Response, type NextFunction } from "express";
import catchAsynError from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import type { JwtPayload } from "../types/user.types.js";

const isLoggedIn = catchAsynError(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json(new ApiResponse(401, {}, "Unauthorized"));
    }

    const decode: JwtPayload = jwt.verify(
      token,
      process.env.ACCESSTOKEN_SECRET as string,
    ) as JwtPayload;

    const user = await User.findById(decode?._id).select("-password");

    if (!user) {
      return res.status(409).json(new ApiResponse(401, {}, "Invalid token"));
    }
    req.user = user;

    next();
  },
);

export default isLoggedIn;
