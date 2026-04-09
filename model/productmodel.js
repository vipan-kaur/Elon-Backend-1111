import mongoose from "mongoose"
const productSchema=new mongoose.Schema({
   title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: false
  },
  price:{
    type:Number,
    required:true
  },
  category:{
    type: String,
    required: true,
    enum: ["men", "women", "kids", "decor", "baby"]
  },
  subCategory: {
    type: String,
    required: false,
    default: "general"
  },
  images:[String],
 rating:{
    type : Number
 }
  
}, { timestamps: true })

const Product =mongoose.model("Product",productSchema)
export default Product;