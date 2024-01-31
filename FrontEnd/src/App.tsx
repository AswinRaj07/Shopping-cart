import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Footer from "./Footer/Footer.tsx";
import Header from "./Header/Header.tsx";
import Product from "./Product/Product.tsx";
import Login from "./Users/Login.tsx";
import UserRegistration from "./Users/UserRegistration.tsx";
import AdminLogin from "./Admin/AdminLogin.tsx";
import AddProducts from "./Admin/AddProducts.tsx";
import AdminPage from "./Admin/AdminPage.tsx";
import EditProduct from "./Admin/EditProduct.tsx";
import Cart from "./Cart/Cart.tsx";
import LogOut from "./Header/LogOut.tsx";
function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Product currentUser={currentUser} />} />
          <Route
            path="/Login"
            element={
              <Login
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route path="/logout" element ={<LogOut/>}/>
          <Route path="/UserRegisteration" element={<UserRegistration />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/addProduct" element={<AddProducts />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/editproduct" element={<EditProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
