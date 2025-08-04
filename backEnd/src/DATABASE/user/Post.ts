import mongoose, { models } from "mongoose";
import { model, Schema, Document } from "mongoose";



interface Ipost {
    title?: string;
    img: string;
    author: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
const Postschema = new Schema({
    title: { type: String,  },
    img: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }


}, {
    timestamps: true
})

const Post = models.Post || model<Ipost>('Post', Postschema);
export default Post;