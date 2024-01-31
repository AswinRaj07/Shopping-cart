import React, { FunctionComponent, useEffect, useState } from "react";
import style from "./AdminLogin.module.scss";
import { useLocation, useNavigate } from "react-router";

interface product {
  id: number;
  name: string;
  price: number;
  imagePath: string;
}
const EditProduct: FunctionComponent = () => {

  const navigate =useNavigate()

  const location = useLocation();
  console.log(location.state.product);
  //  console.log(params.id)
  const [productdetails, setProductdetails] = useState<product>({
    id: 0,
    name: "",
    price: 0.0,
    imagePath: "",
  });
  
 
  useEffect(() => {
    if (location.state.product) {
      setProductdetails(location.state.product);
    }
  }, [location.state.product]);

  const handleInputChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductdetails({ ...productdetails, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = fetch(
        `http://localhost:5000/api/product/edit/${productdetails.id}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productdetails),
        }
      );
      console.log(response);
      console.log("Product added sucessfull", response);
      navigate('/adminpage')
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className={style.productPage}>
        <form className={style.container} onSubmit={handleFormSubmit}>
          <div>
            <h3>Edit Product here</h3>
          </div>
          <div>
            <input
              required
              name="name"
              value={productdetails.name}
              placeholder="ProductName"
              onChange={handleInputChnage}
            />
          </div>
          <div>
            <input
              required
              name="price"
              placeholder="Prize"
              value={productdetails.price}
              onChange={handleInputChnage}
            />
          </div>
          <div>
            <input
              required
              name="imagePath"
              placeholder="ProductImage"
              value={productdetails.imagePath}
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

export default EditProduct;
