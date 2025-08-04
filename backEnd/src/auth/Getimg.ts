import express, { Request, Response } from "express";
import Post from "../DATABASE/user/Post";

interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}

export const getimage = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: "User is not authenticated" });
    }
    const currentUser = req.user._id; // Assuming user ID is available in req.user
    try {
        const images = await Post.find({ author: currentUser }).populate("author");
        if (!images || images.length === 0) {
            return res.status(404).json({ message: "No images found for this user" });
        }
        return res.json({ images });
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
