import User from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signupSchema, signinSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";

dotenv.config();

export const createAccount = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(200).json({
        message: errors,
      });
    }
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist)
      return res.status(200).json({
        message: "Email da ton tai!!",
      });

    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hashedPwd,
      role: "member",
    });
    if (!user) {
      return res.json({
        message: "Tao tai khoan không thành công",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    user.password = undefined;
    return res.json({
      message: "Tao tai khoan thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(200).json({
        message: errors,
      });
    }
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(200).json({
        message: "Tai khoan khong ton tai !",
      });
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(200).json({
        message: "Mat khau khong dung !",
      });
    }
    const token = jwt.sign({ id: userExist._id }, process.env.SECRET_KEY);
    userExist.password = undefined;
    return res.status(200).json({
      data: userExist,
      accessToken: token,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
