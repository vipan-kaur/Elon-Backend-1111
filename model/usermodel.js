import mongoose from "mongoose"
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        maxlength:30,
         required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:Number
    },
    profilePic:{
        type:String,
        default:null
    },
    role:{
        type:String,
        default:"user"
    }
})
const User=mongoose.model("user",userSchema)
export default User