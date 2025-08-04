import mongoose,{model,Schema,Document} from "mongoose";

export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;

}
const user=new Schema<UserDocument>({
    username:{
        type:String,
        required:true,
        unique:true,
    },
  
     email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
      
    },

})

const User=mongoose.models.User||model<UserDocument>('User',user)
export default User;