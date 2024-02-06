import express from 'express'
import Product from '../Product/ProductSchema'

const router = express.Router();



const username1 = "Arun";
const password1 = "098";
router.post("/api/admin/login", async (req, res) => {
  try {
    if (username1 == req.body.username) {
      if (password1 == req.body.password) {
        res.status(200).json({ message: "Login Sucess" });
      } else {
        res.status(500).json({ message: "Incorrect Password" });
      }
    } else {
      res.status(500).json({ message: "Invalid username" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/api/product/edit/:id", async (req, res) => {
    const { id } = req.params;
    const { name, price, imagePath,count } = req.body;
    try {
      const response = await Product.update(
        {
          name: name,
          price: price,
          imagePath: imagePath,
          count:count
        },
        {
          where: { id: id },
        }
      );
      res.status(200).json({ message: "product updated" });
    } catch (err) {
      console.log(err);
    }
  });
  
  
  router.delete("/api/product/delete/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findByPk(id);             //find by primary key
      if (!product) {
        res.json({ message: "Product not avilable" });
      } else {
        await product.destroy();
        res.json({ message: "Product deleted sucessfully" });
      }
    } catch (err) {
      console.log(err);
    }
  });

export default router