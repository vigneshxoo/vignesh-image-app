"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
exports.default = handler;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookieParser = require("cookie-parser");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
function handler(req, res) {
    res.status(200).json({ message: "Hello from Vercel backend!" });
}
const Route_1 = require("./Router/Route");
const MONGO_1 = __importDefault(require("./DATABASE/ConnectDb/MONGO"));
exports.app.use(body_parser_1.default.urlencoded({ extended: false }));
exports.app.use(body_parser_1.default.json());
// app.use(express.json())
exports.app.use(cookieParser());
exports.app.use((0, cors_1.default)({
    origin: process.env.ORGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
exports.app.use(Route_1.Router);
exports.app.get("/", (req, res) => {
    res.send("Hello World!");
});
(0, MONGO_1.default)();
exports.app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
