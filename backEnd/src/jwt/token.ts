// // import  Jwt from "jsonwebtoken";
// import jwt from "jsonwebtoken"
// import  express,{Request,Response} from "express";
// const secretKey = process.env.JWT_SECRET
// console.log("token oda screct "+ secretKey)
// export const GenerateToken = (userid: any, res: any): string => {

//     if (!secretKey) {
//         console.error("SECRET_KEY is missing in environment variables");
//         return "missing_secret_key";
//     }

//     const token =jwt.sign({  userid }, secretKey, { expiresIn: '3h' });
//     // console.log("Token generated:", token);
//         res.cookie("token",token,{
//         maxAge:15*24*60*1000, 
//         httpOnly:false,
//         sameSite:"strict",

//     })



//     return token;

// };

// import { Response } from "express"
// import jwt from "jsonwebtoken"
// const generateToken = (userId: any, res: any) => {
//     let secretKey = process.env.JWT_SECRET
//     console.log("token oda screct " + secretKey)
//     if (!secretKey) {
//         return res.status(500).json({ message: "JWT_SECRET is not defined in environment variables" });
//     }
//     const token = jwt.sign({ userId }, secretKey, { expiresIn: "2h" })
//     res.cookie("jwt", token, {
//         maxAge: 15 * 24 * 60 * 1000,
//         secure: true,
//         httpOnly: true,
//     })
//     return token


// }
// export default generateToken;

// src/utils/generateToken.ts
import { Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (userId: string, res: any) => {
    const secretKey = process.env.JWT_SECRET;
    
    if (!secretKey) {
        return res.status(500).json({ message: "JWT_SECRET is not defined in environment variables" });
    }

    const token = jwt.sign({ userid: userId }, secretKey, { expiresIn: "2h" });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true in prod
        sameSite: "strict",
        maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
    });

    return token;
};

export default generateToken;
