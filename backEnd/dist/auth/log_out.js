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
exports.Login_out = Login_out;
const UserModel_1 = __importDefault(require("../DATABASE/user/UserModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const MONGO_1 = __importDefault(require("../DATABASE/ConnectDb/MONGO"));
const token_1 = __importDefault(require("../jwt/token"));
function Login_out(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, MONGO_1.default)();
            const { username, password, type, email } = req.body;
            console.log("Request body:", req.body);
            if (type === "signup") {
                if (!username || !email || !password || !type) {
                    return res.status(400).json({ error: "Please provide all required fields" });
                } // Email validation
                const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!regex.test(email)) {
                    return res.status(400).json({ error: "Invalid email format" });
                }
                // Check if user already exists
                const checkEmail = yield UserModel_1.default.findOne({ email });
                const checkUsername = yield UserModel_1.default.findOne({ username });
                if (checkEmail || checkUsername) {
                    return res.status(400).json({ error: "Already existing email or username" });
                }
                if (password.length < 6) {
                    return res.status(400).json({ error: "Password is too short" });
                }
                // Password hashing
                const salt = yield bcryptjs_1.default.genSalt(10);
                const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
                const newUser = new UserModel_1.default({
                    username,
                    email,
                    password: hashedPassword,
                    // Ensure this is the correct field name
                });
                yield newUser.save();
                // Generate JWT token
                const token = (0, token_1.default)(newUser._id, res);
                return res.status(200).json({
                    message: "User created successfully",
                    user: newUser,
                    token, // Send token with the response
                });
            }
            else if (type === "login") {
                console.log("Login request received with username:", username);
                console.log("Login request received with email:", password);
                if (!username || !password) {
                    console.log("Login request received without email or password");
                    return res.status(400).json({ error: "Please provide email and password" });
                }
                // Login logic
                const user = yield UserModel_1.default.findOne({ username });
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }
                // Compare passwords
                const validPassword = yield bcryptjs_1.default.compare(password, user.password);
                if (!validPassword) {
                    return res.status(400).json({ error: "Invalid password" });
                }
                // Generate JWT token
                console.log("User found, generating token for user ID:", user._id);
                const token = (0, token_1.default)(user._id, res);
                const response = res.status(200).json({
                    message: "Login successful",
                    user,
                    jwt: token
                    // token,
                });
                return response;
            }
            else {
                return res.status(400).json({ error: "Invalid request type" });
            }
        }
        catch (error) {
            console.error("Signup Error:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
