import { Link } from "react-router-dom"
import { FunctionComponent } from "react"
import headercss from './header.module.scss'
import shoppingcart from './shoppingcart.svg'
import logo from './logo.svg'
const LogOut:FunctionComponent = () => {
  return (
    <div>
      <header className={headercss.header}>
        {" "}
        <div>
          <img src={logo} className={headercss.logo} alt="Shopping Cart Logo" />
        </div>
        <div>
          <Link to="/login">
            <button className={headercss.button}>LogOut</button>
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
  )
}

export default LogOut
