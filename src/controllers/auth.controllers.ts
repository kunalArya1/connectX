import { type Request, type Response } from "express";
import catchAsynError from "../utils/catchAsync.js";
import ApiResponse from "../utils/ApiResponse.js";
import type {
  UserChangePassword,
  UserSignIn,
  UserSignUp,
} from "../types/user.types.js";
import User from "../models/user.model.js";
import crypto from "crypto"
import sendMail from "../utils/mail/mailer.js";

const options = {
  httpOnly: true,
  secure: true,
  sameSite: true,
};
export const signUp = catchAsynError(
  async (req: Request<{}, {}, UserSignUp>, res: Response) => {
    const { firstname, lastname, email, password } = req.body;

    const exsitingUser = await User.findOne({ email });

    if (exsitingUser) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "User already registred"));
    }

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
    });

    const user = await User.findById(newUser._id).select("-password");

    const accessToken = user?.generateAccessToken();
    const refreshToken = user?.generateRefreshToken;

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refershToken", refreshToken, options)
      .json(new ApiResponse(201, user, "Sing-up successfull"));
  },
);

export const signIn = catchAsynError(
  async (req: Request<{}, {}, UserSignIn>, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json(new ApiResponse(404, {}, "Invalid credintials"));
    }

    const isPasswordCorrect = user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json(new ApiResponse(404, {}, "Invalid credintials"));
    }

    const accessToken = user?.generateAccessToken();
    const refreshToken = user?.generateRefreshToken;

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refershToken", refreshToken, options)
      .json(new ApiResponse(200, user, "Sign-in Succefull"));
  },
);
export const signOut = catchAsynError(async (req: Request, res: Response) => {
  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refershToken")
    .json(new ApiResponse(200, {}, "Sign-out Successfull"));
});

export const changePassword = catchAsynError(
  async (req: Request<{}, {}, UserChangePassword>, res: Response) => {
    const { oldPassword, newPassword } = req.body;

    const userId = req.user?._id;
    const user = await User.findById({ userId });

    if (!user) {
      return res.status(404).json(new ApiResponse(404, {}, "User not found"));
    }

    user.password = newPassword;
    await user.save();
    const newUser = await User.find({ userId }).select("-password");
    return res
      .status(200)
      .json(new ApiResponse(200, newUser, "Password chnaged succesfully"));
  },
);

export const forgotPassword = catchAsynError(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json(new ApiResponse(404, {}, "Invalid Email"))
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const url = `${req.protocol}://${req.get("host")}/auth/reset-password/${resetToken}`;

    const info = await sendMail({
      to: user.email,
      subject: "Reset Paasowrd Link",
      text: "",
      html: "asfdhjasgfjhasg"
    })

    return res.status(200).json(new ApiResponse(200, info, "Mail sent successfully"));
  },
);

export const resetPassword = catchAsynError(
  async (req: Request, res: Response) => {

    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token as string).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gte: Date.now() }
    })

    if (!user) {
      return res.status(400).json(new ApiResponse(400, {}, "Invalid Token"))
    }
    user.resetPasswordToken = "";
    user.resetPasswordExpires = 0;

    user.password = password;

    await user.save()

    return res.status(200).json(new ApiResponse(200, {}, "Password updated successfully. You can now log in."));
  },
);
