
import express, { Request, Response } from "express"
import Post from "../DATABASE/user/Post"
import connectDB from "../DATABASE/ConnectDb/MONGO"
export const getalliamge = async (req:Request, res:Response) => {

    try {
        connectDB()
        const images=await Post.find({}).populate("author")
         if (!images || images.length === 0) {
            return res.status(404).json({ message: "No images found for this user" });
        }
        return res.json({ images });

    } catch (error) {

    }
}