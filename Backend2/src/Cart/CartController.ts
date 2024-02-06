import express from 'express'
import CartProduct from './CartSchema'
import Product from '../Product/ProductSchema'
const router = express.Router();


router.post("/api/product/addTocart", async (req, res) => {
 
  try {
  const {user,product} =req.body;
    const[existingProduct,create]  = await CartProduct.findOrCreate({ where: { user:user,product:product },defaults:{quantity:1} });
    if (!create) {
      existingProduct.quantity+=1
      await existingProduct.save();
      
    } 
    const requiredProduct:any =await Product.findOne({
      where:{name:product}
    })
    const requiredQuantity =requiredProduct.quantity
    if(requiredQuantity>=1){
      const changedQuantity =requiredQuantity-1
      const response =await Product.update({
        quantity:changedQuantity
      },{where:{name:product}})
    }
    res.status(201).json({message:"new user created"})
  } catch (error) {
    console.error("Error updating favourites array:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/api/product/viewcartproduct/:user", async (req, res) => {
   const { user } = req.params;

  try {
    const cartProduct = await CartProduct.findAll({where:{user}});

    if (cartProduct) {
      
      res.json({
        message: "Cart products viewed successfully",
        data: cartProduct, 
      });
    } else {
      
      res.json({ message: "User not found" });
    }
  } catch (err) {
    
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

  
  


  router.get("/api/product/detailview/:name",async (req,res)=>{
    const name  =req.params.name
    console.log(name)
    if (!name) {
      return res.status(400).json({ message: "Name parameter is missing in the request body" });
    }
try{
      const response =await Product.findAll({where:{name:name}});
      res.status(200).json({message :"Product detailed view",response})
      console.log(response)
}
catch(err){
  console.log(err)
}
})
   
 export default router