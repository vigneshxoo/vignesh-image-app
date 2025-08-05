"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storeimg = void 0;
const cloudinary_1 = require("cloudinary");
const Post_1 = __importDefault(require("../DATABASE/user/Post"));
const MONGO_1 = __importDefault(require("../DATABASE/ConnectDb/MONGO"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});
console.log("Cloudinary configured with cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
const Storeimg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield (0, MONGO_1.default)();
        console.log("Buffer created from uploaded file" + buffer);
        const uploadResponse = yield new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            }).end(buffer);
        });
        const imageUrl = uploadResponse.secure_url;
        console.log("Uploaded URL:", imageUrl);
        const newPost = new Post_1.default({
            author: currentUser,
            title: req.body.imgName,
            img: imageUrl,
        });
        yield newPost.save();
        res.status(200).json({
            message: "File uploaded successfully",
            imageUrl: imageUrl,
            postId: newPost._id,
        });
    }
    catch (error) {
        console.error("Error in Storeimg:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.Storeimg = Storeimg;
