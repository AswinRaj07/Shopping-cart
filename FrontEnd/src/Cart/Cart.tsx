import { FunctionComponent, useState, useEffect } from "react";
import classes from "./Cart.module.scss";
import axios from "axios";
import Quantity, { Operation } from "../Quantity/Quantity";
import TotalPrice from "../Totalprice/TotalPrice";


interface CartProduct {
  imagePath: string | undefined;
  id: number;
  name: string;
  product: string;
  price:number;
  quantity: number;
}
interface YourComponentProps {
  product: string; // Add any other necessary prop types
  handleUpdateQuantity: (product: string, operation: Operation) => void;
}
const Cart: FunctionComponent<YourComponentProps> = () => {
  const [arry, setArry] = useState<CartProduct[]>([]);
  const [detailarray, setDetailarray] = useState<CartProduct[]>([]);
  const currentUser = localStorage.getItem("currentUser");
  // const [totalPrice, setTotalPrice] = useState<number>(0);
 
  useEffect(() => {
    const fetchCartProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/product/viewcartproduct/${currentUser}`
        );

        const data = response.data.data;
        setArry(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartProduct();
  }, [currentUser]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const val = arry.map((item) => item.product);
      console.log(val);

      try {
        const details = await axios.post(
          "http://localhost:5000/api/product/detailview",
          { name: val }
        );
        console.log(details.data.response);
        setDetailarray(details.data.response);
      } catch (error) {
        console.error(error);
      }
    };

    if (arry.length > 0) {
      fetchProductDetails();
    }
  }, [arry]);

  useEffect(() => {
    console.log("Productname", arry);
    console.log("Detail array:", detailarray);
   
  }, [arry, detailarray]);


  const handleRemoveProduct = (product: any) => {
    setDetailarray((prevCart) => {
      const updatedCart = { ...prevCart }
      delete updatedCart[product]
      return updatedCart
    })
  }


  const handleQuantityUpdate:any = async (
    product: string,
    
    operation: Operation,
  ) => {
    console.log("Handle function", product, operation);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/quantity/${product}`,
        {
          operation,
          user: name,
        },
        { withCredentials: true },
      );
      if (response.status === 200) {
        const newCartData = { ...arry };
        const cartItem = Object.values(newCartData).find(
          (item:any) => item.product === product,
        );
        if (cartItem) {
          if (operation === "increment") {
            cartItem.quantity += 1;
          } else if (operation === "reduce" && cartItem.quantity > 0) {
            cartItem.quantity -= 1;
          }
        }
        setArry(newCartData);

        setDetailarray((prevProducts) =>
          prevProducts.map((product) =>
            product === product
              ? { ...product, productQuantity: product.productQuantity - 1 }
              : product,
          ),
        );
      }
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("error updating quantity :", error);
    }
  };
  
  const totalPrice = detailarray.reduce((total, product) => {
    const quantity =
      Object.values(arry).find((CartProduct:any) => CartProduct.product === product.name)
        ?.quantity || 0;
    return total + product.price * quantity;
  }, 0);

  return (
    <div>
      <div>
        <section className={classes.cart}>
          <h1>Cart</h1>
          <div className={classes.container}>
            {detailarray.map((product) => (
              <div key={product.id} className={classes.product}>
                <img src={product.imagePath} alt={product.name} />
                <h3>{product.name}</h3>
                <Quantity 
                removeProductCallback={() => handleRemoveProduct(product.name)}
                product ={product.name}
                handleUpdateQuantity ={handleQuantityUpdate}
                />
              </div>
            ))}
          </div>
          <TotalPrice amount={totalPrice}/>
        </section>
      </div>
    </div>
  );
};

export default Cart;
