
// const multer=require("multer")

// const storage= multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,"uploads")
//     },
//     filename:function(req,file,cb){
//         cb(null,Date.now()+"-"+file.originalname)
//     }
// })

// const uploads=multer({storage:storage})

// module.exports={uploads}
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
 
const upload = multer({ storage });
 
export default upload;

