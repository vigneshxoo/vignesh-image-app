import mongoose from "mongoose";


const connectDB = async () => {
    
    let  MONGO_URI="mongodb://localhost:27017/testvicky";
        const cluster ="mongodb+srv://vigneshxoo:296Ckijsl0UlqK8c@vickynew.orczytk.mongodb.net/?retryWrites=true&w=majority&appName=vickynew";
     try {
         const conn = await mongoose.connect(cluster||MONGO_URI, {
         });
         console.log(`MongoDB Connected: ${conn.connection.host}`);
     } catch (error) {
         if (error instanceof Error) {
             console.error(`Error: ${error.message}`);
         } else {
             console.error('An unknown error occurred');
         }
         process.exit(1);
     }
 };
 export default connectDB;
//  296Ckijsl0UlqK8c  vigneshxoo

 //+srv://vigneshxoo:296Ckijsl0UlqK8c@vickynew.orczytk.mongodb.net/?retryWrites=true&w=majority&appName=vickynew