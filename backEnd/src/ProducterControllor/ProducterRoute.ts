import express, { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import User from "../DATABASE/user/UserModel";
import { UserDocument } from "../DATABASE/user/UserModel";
import dotenv from "dotenv";
import connectDB from "../DATABASE/ConnectDb/MONGO";

dotenv.config()


interface AuthenticatedRequest extends Request {
    user?: UserDocument;
}

export const ProductRouter = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const secretKey = process.env.JWT_SECRET
    try {
        const token = req.cookies.jwt;
        console.log("Token received:", token);

        if (!token) {
            console.log("No token provided");
            return res.status(401).json({ message: "Unauthorized: No token provided" });

        }

        if (!secretKey) {
            return res.status(400).json({ message: "Error: SECRET_KEY is missing" });
        }

        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        console.log("Decoded token:", decoded);


        if (!decoded || !decoded.userid) {
            return res.status(401).json({ message: "Token unauthorized" });
        }
connectDB()
        const userp = await User.findOne({ _id: decoded.userid }).select('-password')
        if (!userp) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = userp
        next()

        console.log("Product route called");
        // res.status(200).json({ message: "Product route is working" });
    } catch (error) {
        console.error("Error in Product route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// import express, { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import User from "../DATABASE/user/UserModel";
// import { UserDocument } from "../DATABASE/user/UserModel";
// import connectDB from "../DATABASE/ConnectDb/MONGO";
// interface AuthenticatedRequest extends Request {
//     user?: UserDocument;
// }

// export async function producterRoute(req: AuthenticatedRequest, res: Response, next: NextFunction) {
//     const scretkey = process.env.JWT_SECRET

//      const token = req.cookies.jwt;
//     console.log("reqest:",req.cookies.jwt)
//     // console.log(scretkey)
//     try {

       

//         if (!scretkey) {
//             return res.status(500).json({ message: "JWT_SECRET is not defined in environment variables" });
//         }

//         if (!token) {
//             return res.status(400).json({ message: "Token not provided" });
//         }
//         await connectDB()

//         const decoded = jwt.verify(token, scretkey) as JwtPayload;
//         console.log(decoded)

//         if (!decoded || !decoded.userid) {
//             return res.status(401).json({ message: "Token unauthorized" });
//         }
//         console.log(decoded.userid)


//         const userp = await User.findOne({ _id: decoded.userid }).select('-password')
//         console.log(userp)
//         if (!userp) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         req.user = userp
//         next()
//         //  res.status(200).json({ message: "User authenticated", userp });




//     } catch (error) {
//         console.error("Error verifying token:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }

// src/middleware/producterRoute.ts

// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import User from "../DATABASE/user/UserModel";
// import { UserDocument } from "../DATABASE/user/UserModel";

// interface AuthenticatedRequest extends Request {
//     user?: UserDocument;
// }

// export const producterRoute = async (
//     req: AuthenticatedRequest,
//     res: Response,
//     next: NextFunction
// ) => {
//     const secretKey = process.env.JWT_SECRET;

//     if (!secretKey) {
//         return res.status(500).json({ message: "JWT_SECRET not defined" });
//     }
// console.log(req.cookies)
//     const token = req.cookies.jwt; // Make sure your cookie name is 'token'
//     console.log("Token from cookie:", token);

//     if (!token) {
//         return res.status(401).json({ message: "Token not provided" });
//     }

//     try {
//         const decoded = jwt.verify(token, secretKey) as JwtPayload;

//         if (!decoded || !decoded.userid) {
//             return res.status(401).json({ message: "Unauthorized token" });
//         }

//         const user = await User.findById(decoded.userid).select("-password");

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         req.user = user;
//         next();
//     } catch (err) {
//         console.error("JWT Verification Error:", err);
//         return res.status(401).json({ message: "Invalid or expired token" });
//     }
// };
