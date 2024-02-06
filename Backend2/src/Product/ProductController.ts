

import express from 'express'
import Product from './ProductSchema'


const router = express.Router();

router.post("/api/addProduct", async (req, res) => {
    try {
      const AddProducts = req.body;
      const createdProducts = await Product.create(AddProducts);
      console.log(AddProducts);
      res.json({
        message: "Products added successfully",
        products: createdProducts,
      });
    } catch (err) {
      console.error("Error adding products:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  router.get("/api/viewProduct", async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json({ message: "success", products });
    } catch (err) {
      console.error("Error", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  export default router