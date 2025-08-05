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
exports.getimage = void 0;
const Post_1 = __importDefault(require("../DATABASE/user/Post"));
const getimage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: "User is not authenticated" });
    }
    const currentUser = req.user._id; // Assuming user ID is available in req.user
    try {
        const images = yield Post_1.default.find({ author: currentUser }).populate("author");
        if (!images || images.length === 0) {
            return res.status(404).json({ message: "No images found for this user" });
        }
        return res.json({ images });
    }
    catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getimage = getimage;
