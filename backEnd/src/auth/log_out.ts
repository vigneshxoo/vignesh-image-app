import User from "../DATABASE/user/UserModel";
import bcrypt from "bcryptjs";
import connectDB from "../DATABASE/ConnectDb/MONGO";
import generateToken from "../jwt/token";
import { Request, Response } from "express";

export async function Login_out(req: Request, res: Response): Promise<any> {
    try {
        await connectDB();
        const { username, password, type, email  } = req.body;
        console.log("Request body:", req.body);

        if (type === "signup") {
          if (!username || !email || !password ||!type ) {
               return res.status(400).json({ error: "Please provide all required fields" });
            }// Email validation

            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regex.test(email)) {
                return res.status(400).json({ error: "Invalid email format" });
            }
            // Check if user already exists
            const checkEmail = await User.findOne({ email });
            const checkUsername = await User.findOne({ username });
            if (checkEmail || checkUsername) {
                return res.status(400).json({ error: "Already existing email or username" });
            }
            if (password.length < 6) {
                return res.status(400).json({ error: "Password is too short" });
            }
            // Password hashing
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
              // Ensure this is the correct field name
            });

            await newUser.save();

            // Generate JWT token
            const token = generateToken(newUser._id,res);

           return res.status(200).json({
               message: "User created successfully",
               user: newUser,
               token,  // Send token with the response
           });

        } else if (type === "login") {
          
            console.log("Login request received with username:", username);
            console.log("Login request received with email:", password);

            if(!username || !password) {
                console.log("Login request received without email or password");
                return res.status(400).json({ error: "Please provide email and password" });
            }
    
            // Login logic
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // Compare passwords
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ error: "Invalid password" });
            }

            // Generate JWT token
            console.log("User found, generating token for user ID:", user._id);
            const token = generateToken(user._id,res);

            const response = res.status(200).json({
                message: "Login successful",
                user,
                jwt:token
                // token,
            });

           return response;

        } else {
            return res.status(400).json({ error: "Invalid request type" });
        }

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}