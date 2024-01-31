import React, { FunctionComponent, useState } from "react";
import style from "./AdminLogin.module.scss";
import axios from "axios";

interface product {
  name: string;
  price: number;
  imagePath: string;
}
const AddProducts: FunctionComponent = () => {
  const [products, setProducts] = useState<product>({
    name: "",
    price: 0,
    imagePath: "",
  });
  console.log(products);

  const handleInputChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducts({ ...products, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/addProduct", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(products),
      });
      console.log(response);
      console.log("Product added sucessfull", response);
      alert("Product Added sucessfully")
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  

  return (
    <div>
      <div className={style.productPage}>
        <form className={style.container} onSubmit={handleFormSubmit}>
          <div>
            <h3>Add Products</h3>
          </div>
          <div>
            <input
              required
              name="name"
              placeholder="ProductName"
              value={products.name}
              onChange={handleInputChnage}
            />
          </div>
          <div>
            <input
              required
              name="price"
              placeholder="Prize"
              value={products.price}
              onChange={handleInputChnage}
            />
          </div>
          <div>
            <input
              required
              name="imagePath"
              placeholder="ProductImage"
              value={products.imagePath}
              onChange={handleInputChnage}
            />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
