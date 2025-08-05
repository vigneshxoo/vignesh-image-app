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
exports.Router = void 0;
const express_1 = __importDefault(require("express"));
const StoreImg_1 = require("../auth/StoreImg");
const log_out_1 = require("../auth/log_out");
const Getimg_1 = require("../auth/Getimg");
const ProducterRoute_1 = require("../ProducterControllor/ProducterRoute");
const GetAllimg_1 = require("../auth/GetAllimg");
exports.Router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, ".uploads/"); // Create this folder if not exists
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });
const storage = multer_1.default.memoryStorage(); // using memory for now (we’ll use this to upload to Cloudinary later)
const upload = (0, multer_1.default)({ storage });
console.log("Multer storage configured" + storage);
exports.Router.post("/login", log_out_1.Login_out);
exports.Router.post("/img", upload.single("profileImg"), ProducterRoute_1.ProductRouter, StoreImg_1.Storeimg);
exports.Router.get("/getimg", ProducterRoute_1.ProductRouter, Getimg_1.getimage);
exports.Router.get('/all', GetAllimg_1.getalliamge);
function connec(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req);
            // await connectDB(); // Assuming you have a connectDB function to connect to your database
            console.log("Connected to the database");
            res.status(200).json({ message: " connection successful" });
        }
        catch (error) {
            console.error("Error connecting to the database:", error);
        }
    });
}
exports.Router.get("/connect", ProducterRoute_1.ProductRouter, connec);
