import bodyParser from "body-parser";
import express, { Response, Request, Application } from "express";
import { Login_out } from "./auth/log_out";
import cors from "cors"
import dotenv from "dotenv";
import cookieParser = require("cookie-parser");
dotenv.config();
export const app: Application = express();

// api/index.ts
import { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ message: "Hello from Vercel backend!" });
}



import { Router } from "./Router/Route";
import connectDB from "./DATABASE/ConnectDb/MONGO";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json())
app.use(cookieParser())


app.use(cors({
   origin: process.env.ORGIN,
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(Router);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
connectDB()
app.listen(4000,()=>{
    console.log("Server is running on port 4000");
})

