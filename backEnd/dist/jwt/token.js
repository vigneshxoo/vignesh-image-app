"use strict";
// // import  Jwt from "jsonwebtoken";
// import jwt from "jsonwebtoken"
// import  express,{Request,Response} from "express";
// const secretKey = process.env.JWT_SECRET
// console.log("token oda screct "+ secretKey)
// export const GenerateToken = (userid: any, res: any): string => {
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId, res) => {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        return res.status(500).json({ message: "JWT_SECRET is not defined in environment variables" });
    }
    const token = jsonwebtoken_1.default.sign({ userid: userId }, secretKey, { expiresIn: "2h" });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true in prod
        sameSite: "strict",
        maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
    });
    return token;
};
exports.default = generateToken;
