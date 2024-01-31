import logo from "./logo.svg";
import shoppingcart from "./shoppingcart.svg";
import headercss from "./header.module.scss";
import Cartprops from "../Product/Product";
import { Link } from "react-router-dom";

const Header = () => {
  
  return (
    <div>
      <header className={headercss.header}>
        {" "}
        <div>
          <img src={logo} className={headercss.logo} alt="Shopping Cart Logo" />
        </div>
        <div>
          <Link to="/login">
            <button className={headercss.button}>Login</button>
          </Link>
        </div>
        <div>
          <Link to='/cart'>
          <img
            src={shoppingcart}
            className={headercss.shoppingCart}
            alt="go to Cart"
          />
          </Link>
         
        </div>
      </header>
    </div>
  );
};

export default Header;
