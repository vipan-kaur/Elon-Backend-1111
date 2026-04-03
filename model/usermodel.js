const mongoose=require("mongoose");
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
    }
})
module.exports=mongoose.model("user",userSchema)