import { FunctionComponent, useEffect, useState } from "react";
import productstyl from "./Product.module.scss";
import axios from "axios";

interface Products {
  id: number;
  name: string;
  price: string;
  imagePath: string;
}

interface ProductProps {
  currentUser: any;
}
const Product: FunctionComponent<ProductProps> = ({ currentUser }) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [array, setArray] = useState<any>([]);
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

  //   const handleButtonClick = async(e:any)=>{
  //    const response =await fetch("http://localhost:5000/api/product/addTocart",{
  //           method :"Post",
  //           headers:{
  //             'Content-Type' :'application/json'
  //           },
  //           body:JSON.stringify({user:currentUser, product: [...array,e]})
  //    })
  //    const newArray =await response.json()
  //    setArray(newArray.cartProduct.product)
  //    console.log(newArray)
  // }

  const handleButtonClick = async (e: any) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/product/addTocart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: currentUser, product: [...array, e] }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newArray = await response.json();
      setArray(newArray.cartProduct.product);
      console.log(newArray);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
