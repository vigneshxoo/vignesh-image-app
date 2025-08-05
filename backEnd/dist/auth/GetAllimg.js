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
exports.getalliamge = void 0;
const Post_1 = __importDefault(require("../DATABASE/user/Post"));
const MONGO_1 = __importDefault(require("../DATABASE/ConnectDb/MONGO"));
const getalliamge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, MONGO_1.default)();
        const images = yield Post_1.default.find({}).populate("author");
        if (!images || images.length === 0) {
            return res.status(404).json({ message: "No images found for this user" });
        }
        return res.json({ images });
    }
    catch (error) {
    }
});
exports.getalliamge = getalliamge;
