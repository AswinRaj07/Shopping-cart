import express from "express";
import cors from "cors";
const { Op } = require('sequelize');
import { Sequelize, DataTypes, where } from "sequelize";
import jwt from 'jsonwebtoken'
import { authMiddleware } from "./auth";
import cookieparser from 'cookie-parser'
// import sequelize from './dbconnection'
// import UserController from "./Users/UserController";
// import ProductController from "./Product/ProductController";
// import AdminController from './Admin/AdminController'
// import CartController from './Cart/CartController'

const bcrypt = require ('bcrypt')
const bodyparser = require("body-parser");
const app = express();
app.use(express.json());

app.use(bodyparser.json())
app.use(cookieparser())

// app.use("/",UserController);
// app.use("/",ProductController);
// app.use("/",AdminController);
// app.use("/",CartController)

const allowedOrigins =["http://localhost:5173"]
const corsOptions :cors.CorsOptions ={
  origin:function (origin, callback){
    if(!origin || allowedOrigins.includes(origin)){
      callback(null,true)
    }else{
      callback(new Error("Not allowed by cors"))
    }
  },
  credentials:true
}
app.use(cors(corsOptions));


const sequelize = new Sequelize({
  dialect: "postgres",
  username: "ygucojho",
  password: "ENvoGb57zXy5oYKN9SoqNk_BCXD-Juu3",
  database: "ygucojho",
  host: "hattie.db.elephantsql.com",
  port: 5432,
});

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Product = sequelize.define("products", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  count:{
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

const CartProduct:any = sequelize.define("cartsnew1", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false,
   
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});


const username1 = "Arun";
const password1 = "098";
app.post("/api/admin/login", async (req, res) => {
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

app.post("/api/Users/register", async (req, res) => {
  try {
    const {firstname,lastname,email,password} = req.body;
    const alreadyuser =await User.findOne({where:{email}})
    
    if(alreadyuser){
      res.json({message:" email already exists!!"})
    }
    else{
      const createUser = await User.create({firstname,lastname,email,password});
      res.status(201).json({ message: "User created sucessfully" });
    }
    
  } catch (err) {
    console.log(err,"Cannot register at the mooment");
  }
});




app.post("/api/Users/Login",authMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;
    const userWithEmail = await User.findOne({ where: { email} });
    if (!userWithEmail) {
      res.status(500).json({ sucess:false, message: "Email is Invalid" });
    } 
    if(userWithEmail){
      const passwordcheck =await User.findOne({where:{password}})
      // const passwordMatch =await bcrypt.compare(password,password)
      if(passwordcheck){
        const token =jwt.sign({username:email},'sddfghhjhjbgh',{expiresIn:'1hr'})
        res.cookie('token',token,{httpOnly:true})
        res.status(200).json({message:"Login Sucess",userWithEmail})
      }
      else{
        res.status(500).json({message:"Password Incorrect"})
      }
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/addProduct", async (req, res) => {
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

app.get("/api/viewProduct", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ message: "success", products });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.post("/api/product/addTocart", async (req, res) => {
 
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

app.get("/api/product/viewcartproduct/:user", async (req, res) => {
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



app.put("/api/product/edit/:id", async (req, res) => {
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


app.delete("/api/product/delete/:id", async (req, res) => {
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

app.post("/api/product/detailview",async (req,res)=>{
      const {name}  =req.body
      console.log(name)
      // if (!name) {
      //   return res.status(400).json({ message: "Name parameter is missing in the request body" });
      // }
  try{
        const response =await Product.findAll({where:{name}});
        res.status(200).json({message :"Product detailed view",response})
        console.log(response)
  }
  catch(err){
    console.log(err)
  }
})


app.put("/api/quantity/:product",  async (req, res) => {
  const  product:any  = req.params;
  const operation = req.body.operation;
  const user = req.body;

  const transaction = await sequelize.transaction();

  try {
    const cartItem = await CartProduct.findOne({
      where: {
        user: user,
        product: product,
      },
      transaction,
    });

    if (!cartItem) {
      await transaction.rollback();
      return res.status(404).json({ message: "Cart item not found" });
    }

    const Products:any = await Product.findOne({
      where: { name: product },
      transaction,
    });


    if (!Products) {
      await transaction.rollback();
      return res.status(404).json({ message: "Product not found" });
    }

    if (operation === "increment") {
      if (Products.productQuantity > 0) {
        cartItem.quantity += 1;
        Products.productQuantity -= 1;
      } else {
        await transaction.rollback();
        return res.status(400).json({ message: "Product is out of stock" });
      }
    } else if (operation === "decrease") {
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        Products.productQuantity += 1;
      } else {
        await cartItem.destroy({ transaction });
        Products.productQuantity += 1;
      }
    }

    await cartItem.save({ transaction });
    await Products.save({ transaction });

    await transaction.commit();
    res.status(200).json({ message: "Quantity updated" });
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating quantity:", error);
    res.status(500).json({ message: "Error updating quantity" });
  }
});



sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => {
      console.log("server running on localhost:5000");
    });
  })
  .catch(() => {
    console.log("error sync");
  });
