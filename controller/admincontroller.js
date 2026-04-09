import User from "../model/usermodel.js";
import Product from "../model/productmodel.js";

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      message: "All users retrieved successfully",
      count: users.length,
      users
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products (admin only - includes detailed info)
const getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find();
    
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({
      message: "All products retrieved successfully",
      count: products.length,
      products
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, getAllProductsAdmin };
