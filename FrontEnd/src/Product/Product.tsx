import { FunctionComponent, useEffect, useState } from "react";
import productstyl from "./Product.module.scss";
import axios from "axios";
import { useNavigate } from "react-router";

interface Products {
  id: number;
  name: string;
  price: string;
  imagePath: string;
}

const Product: FunctionComponent = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [array, setArray] = useState<any>([]);

  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");
  console.log(currentUser);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/viewProduct");

      setProducts(response.data.products);
    } catch (err) {
      console.log(err);
    }
  };
  const handleButtonClick = async (e: any) => {
    try {
      
      const response = await axios(
        "http://localhost:5000/api/product/addTocart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data:{user:currentUser,product :e}
          
        }
       
      );} catch(err){
          console.log(err)
      }}

  //     if (!response) {
  //       alert("Please login");
  //       navigate("/Login");
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const newArray = await response.json();
  //     setArray(newArray.cartProduct.product);
  //     console.log(newArray);
  //     alert("Product added sucessfull");
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <div>
      <section className={productstyl.productPage}>
        <h1>Products</h1>

        <div className={productstyl.container}>
          {products.map((product) => {
            return (
              <div className={productstyl.product} key={product.id}>
                <img src={product.imagePath} alt={product.name} />
                <h3>{product.name}</h3>
                <p>price{product.price}</p>
                <button onClick={() => handleButtonClick(product.name)}>
                  Add To Cart
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Product;
