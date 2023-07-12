import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user";

dotenv.config();
export const checkPermission = async (req, res, next) => {
  try {
    //check login
    if (!req.headers.authorization) {
      res.json({
        message: "Ban phai dang nhap de thuc hien hanh dong nay.",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    //decode jwt
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    //get user
    const user = await User.findOne({ _id: decodedToken.id });
    if (!user.role === "admin") {
      res.json({
        message: "Ban phai la admin de thuc hien quyen nay!",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
