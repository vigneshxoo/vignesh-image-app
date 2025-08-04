import express, { Request, Response } from "express";
import { v2 as cloudinary } from 'cloudinary';
import Post from "../DATABASE/user/Post";
import connectDB from "../DATABASE/ConnectDb/MONGO";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}

console.log("Cloudinary configured with cloud name:", process.env.CLOUDINARY_CLOUD_NAME);

export const Storeimg = async (req: AuthenticatedRequest, res: Response) => {
    try {

        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "User is not authenticated" });
        }
        const currentUser = req.user._id;

        console.log("Storeimg called with body:", req.body.imgName);
        if (!req.body.imgName) {
            return res.status(400).json({ error: "Image name is required" });
        }
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        if (!req.file.mimetype.startsWith('image/')) {
            return res.status(400).json({ message: "Uploaded file is not an image" });
        }
        const arrayBuffer = req.file.buffer;
        const buffer = Buffer.from(arrayBuffer);
        await connectDB()

        console.log("Buffer created from uploaded file" + buffer);

        const uploadResponse = await new Promise<{ secure_url: string }>((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
                if (error) reject(error);
                else resolve(result as { secure_url: string });
            }).end(buffer);
        });

        const imageUrl = uploadResponse.secure_url;
        console.log("Uploaded URL:", imageUrl);

        const newPost = new Post({
            author: currentUser,
            title: req.body.imgName,
            img: imageUrl,
        });

        await newPost.save();


        res.status(200).json({
            message: "File uploaded successfully",
            imageUrl: imageUrl,
            postId: newPost._id,
        });

    } catch (error) {
        console.error("Error in Storeimg:", error);
        res.status(500).json({ error: "Internal server error" });

    }


}