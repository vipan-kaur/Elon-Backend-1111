import cloudinary from "../config/cloudinary.js";
// const Product= require("../model/productmodel.js")
import Product from "../model/productmodel.js";

const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, subCategory } = req.body;

    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    let images = [];

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file =>
        cloudinary.uploader.upload(file.path)
      );

      const results = await Promise.all(uploadPromises);

      images = results.map(result => result.secure_url);
    }

    const newproduct = new Product({
      title,
      description,
      price,
      category,
      subCategory: subCategory || "general",
      images
    });

    await newproduct.save();

    return res.status(201).json({
      message: "Product created successfully",
      newproduct
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const deleteProduct =async(req,res)=>{
    try {
        const {id}=req.params;
        const deletedProduct = await Product.findByIdAndDelete(id)
        if(!deletedProduct){
           return res.status(404).json({message:"Product not found"})
        }
        return res.status(200).json({message:"Product deleted successfully"})
    } catch(error) {
        return res.status(500).json({message:error.message})
    }
}

const updateProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const updatedProduct=await Product.findByIdAndUpdate(
          id,
          req.body,
          {new:true, runValidators: true }
        )
        if(!updatedProduct){
           return res.status(404).json({message:"Product not found"})
        }
        return res.status(200).json({message:"Product updated successfully", updatedProduct})
    } catch(error) {
        return res.status(500).json({message:error.message})
    }
} 

const getProductById =async(req,res) => {
  try{
    const{id}=req.params;
    const product=await Product.findById(id)
    if(!product){
      return res.status(404).json({message:"Product not found"})
    }
    return res.status(200).json({message:"Product fetched successfully",product})
  }catch(error){
    return res.status(500).json({message:error.message})
  }
}

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const query = { category };
    
    // Support filtering by subCategory if passed in query string (e.g. ?subCategory=formal)
    if (req.query.subCategory) {
      query.subCategory = req.query.subCategory;
    }
    
    const products = await Product.find(query);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getallProducts =async(req,res)=>{
  try {
      const AllProduct=await Product.find()
      if(AllProduct.length===0){
       return res.status(404).json({message:"No products found"})
      }
      return res.status(200).json({
        message:"Data fetched Successfully",
        product: AllProduct
      })
  } catch(error) {
      return res.status(500).json({message:error.message})
  }
}

export {createProduct,updateProduct,deleteProduct,getProductsByCategory,getallProducts,getProductById}