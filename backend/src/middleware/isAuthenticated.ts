import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User is not Authenticated...",
      });
    }

    // Verify the token if it exists
    const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

    if (!decode || !decode.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Error arises, user not Authenticated...",
    });
  }
};
