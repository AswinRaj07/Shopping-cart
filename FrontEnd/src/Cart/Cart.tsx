import { FunctionComponent, useState, useEffect } from "react";
// import cartprops from '../Product/Product'
import classes from "./Cart.module.scss";
import axios from "axios";
import Product from "../Product/Product";
interface CartProduct {
  products: string;
  id:number;
  name:string;
  price:string;
  imagePath:string
}
const Cart: FunctionComponent = () => {
  const [cartProduct, setCartProduct] = useState<CartProduct[]>([]);
  const [userName, setUserName] = useState<string>(""); 
  //  const user =localStorage.getItem('email')
  useEffect(() => {
   
    const fetchCartProduct = async (user:any) => {
      
      try {
        const response = await axios.get(
          `http://localhost:5000/api/product/viewcartproduct/${user}`
        );
        const data = response.data;

        // if (data.message === "CartProduct viewed successfully") {
          setCartProduct(data.cartproduct);
          console.log(data);
        //  else {
        //   console.log("User not found");
        // }
      } catch (error) {
        console.error("Error fetching cart product:", error);
      }
    };
 fetchCartProduct('')
   
  }, []);
  return (
    // <div>
    //   <section className={classes.cart}>
    //   <h1>Cart</h1>

    //   <div className={classes.container}>
    //     {cartProduct.map((product) => {return(

    
    //       <div className={classes.product} key={product.id}>
    //         <img src={product.thumbnail} alt={product.title} />
    //         <h3>{product.title}</h3>
    //         {/* <Quantifier
    //           removeProductCallback={() => handleRemoveProduct(product.id)}
    //           productId={product.id}
    //           handleUpdateQuantity={handleUpdateQuantity} /> */}
    //       </div>
    //     )}))}
    //   </div>
    //   {/* <TotalPrice amount={totalPrice} /> */}
    // </section>
    // </div>

    <div>
      <section className={classes.cart}>
        <h1>Cart</h1>
        <div className={classes.container}>
          {cartProduct.map((product)=>{return(<div>
            <div className={classes.product} key={product.id}>
              <img src={product.imagePath} alt={product.name}/>
              <h3>{product.name}</h3>
            </div>
          </div>)})}
        </div>
      </section>
    </div>
  );
};

export default Cart;
