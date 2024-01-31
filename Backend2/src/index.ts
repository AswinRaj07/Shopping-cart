import express from "express";
import cors from "cors";
//import UserController from './Users/UserController'
// import UsersSchema from './Users/UsersSchema'
// const sequelize =require('./dbconnection.ts')
import { Sequelize, DataTypes, where } from "sequelize";
const bodyparser = require("body-parser");
const app = express();
app.use(express.json());
app.use(cors());

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

const Product = sequelize.define("product", {
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
});

const CartProduct = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  product: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    unique: true,
  },
});

const username1 = "Arun";
const password1 = "098";
app.post("/api/admin/login", async (req, res) => {
  try {
    if (username1 == req.body.username) {
      if (password1 == req.body.password) {
        res.json({ message: "Login Sucess" });
      } else {
        res.json({ message: "Incorrect Password" });
      }
    } else {
      res.json({ message: "Invalid username" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/Users/register", async (req, res) => {
  try {
    const user = req.body;
    const createUser = await User.create(user);
    res.status(201).json({ message: "User created sucessfully" });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/user/login", async (req, res) => {
  try {
    const usersData = await User.findAll();
    res.json({ message: "success", usersData });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/Users/Login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await User.findAll({ where: { email, password } });
    console.log(response);
    if (response) {
      res.status(200).json({ sucess: true, message: "login sucess" });
      console.log("login sucess");
    } else {
      res.status(500).json({ sucess: false, message: "Invalid data" });
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

// app.post("/api/product/addTocart", async (req, res) => {
//   try {
//     const { userid, productid } = req.body;
//     const response =await CartProduct.findOrCreate({where:{userid,productid}});
//     if(response){
//       res.status(200).json({message:"Product added"})
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

app.post("/api/product/addTocart", async (req, res) => {
  const { user, product } = req.body;

  console.log("User", user, "Product", product);
  // const newProduct = product[0]
  try {
    const existingUser = await CartProduct.findOne({ where: { user } });
    if (existingUser) {
      await existingUser.update({ product });
      res.json({
        message: "Favourites array updated successfully",
        cartProduct: existingUser,
      });
    } else {
      const newFavourite = await CartProduct.create({ user, product });
      res
        .status(201)
        .json({
          message: "New user added with favourites array",
          cartProduct: newFavourite,
        });
    }
  } catch (error) {
    console.error("Error updating favourites array:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/product/viewcartproduct/:user", async (req, res) => {
  const { user } = req.params;
  console.log(user);
  try {
    const cartproduct = await CartProduct.findOne({ where: { user } });
    console.log(cartproduct);
    if (cartproduct) {
      res.json({ message: "CartProduct viewed sucessfully" });
    } else {
      res.json({ message: "user not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.put("/api/product/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, imagePath } = req.body;
  try {
    const response = await Product.update(
      {
        name: name,
        price: price,
        imagePath: imagePath,
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
    const product = await Product.findByPk(id);
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
