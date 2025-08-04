import  express,{Request,Response}  from "express";
import { Storeimg } from "../auth/StoreImg";
import { Login_out } from "../auth/log_out";
import { getimage } from "../auth/Getimg";
import { ProductRouter } from "../ProducterControllor/ProducterRoute";
import { getalliamge } from "../auth/GetAllimg";
export const Router=express.Router()

import multer from 'multer'

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, ".uploads/"); // Create this folder if not exists
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });

const storage = multer.memoryStorage(); // using memory for now (we’ll use this to upload to Cloudinary later)
const upload = multer({ storage });

console.log("Multer storage configured" + storage);

Router.post("/login", Login_out);
Router.post("/img", upload.single("profileImg"),ProductRouter, Storeimg);
Router.get("/getimg", ProductRouter, getimage);
Router.get('/all',getalliamge)

async function connec(req: Request, res: Response) {
    try {
        console.log(req)
        // await connectDB(); // Assuming you have a connectDB function to connect to your database
        console.log("Connected to the database");
        res.status(200).json({ message: " connection successful" });
        
    } catch (error) {
        console.error("Error connecting to the database:", error);
        
    }

}
Router.get("/connect", ProductRouter, connec);