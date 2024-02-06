import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState,useEffect } from "react";
import "./App.css";
import Footer from "./Footer/Footer.tsx";
import Header from "./Header/Header.tsx";
import LogOut from "./Header/LogOut.tsx";
import LoginOutfun from "./Header/LoginOutfun.tsx";
import Product from "./Product/Product.tsx";
import Login from "./Users/Login.tsx";
import UserRegistration from "./Users/UserRegistration.tsx";
import AdminLogin from "./Admin/AdminLogin.tsx";
import AddProducts from "./Admin/AddProducts.tsx";
import AdminPage from "./Admin/AdminPage.tsx";
import EditProduct from "./Admin/EditProduct.tsx";
import Cart from "./Cart/Cart.tsx";
import Quantity from "./Quantity/Quantity.tsx";
import LoginChoice from "./Login/LoginChoice.tsx";
import TotalPrice from "./Totalprice/TotalPrice.tsx";
interface propertie{
  auth :number
}
function App() {
  // const [currentUser, setCurrentUser] = useState<any>(null);
  const [auth,setauth]=useState<number>(0);
  
  useEffect(()=>{
    if(localStorage.getItem('user')!= null){
      setauth(1);
    }
    else{
      setauth(0);
    }
  },[])

  return (
    <BrowserRouter>
      <Header  />
      <main>
        <Routes>
          <Route path="/" element={<Product/>} />
          <Route
            path="/Login"
            element={
              <Login/>
            }
          />
          <Route path="/logout" element={<LogOut />} />
          {/* <Route path="/LoginOut" element={<LoginOutfun/>}/> */}
          <Route path="/UserRegisteration" element={<UserRegistration />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/LoginChoice" element={<LoginChoice/>}/>
          <Route path="/addProduct" element={<AddProducts />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/editproduct" element={<EditProduct />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/quantity" element={<Quantity/>}/>
          <Route path="/totalprice" element={<TotalPrice/>}/>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
