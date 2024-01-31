import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginstyl from "./login.module.scss";
import { useState } from "react";
import axios from "axios";
import navigate from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

interface ProductProps {
  currentUser: any;
  setCurrentUser: any;
}
const Login: FunctionComponent<ProductProps> = ({
  currentUser,
  setCurrentUser,
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  // const [currentUser,setCurrentUser] =useState<any>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/Users/Login",
        formData
      );
      console.log("Login successful:", response.data);
      setCurrentUser(formData.email);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <div className={loginstyl.productPage}>
        <form className={loginstyl.container} onSubmit={handleFormSubmit}>
          <div>
            <h1>Login</h1>
          </div>
          <div>
            <input
              type="text"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <button type="submit">Login</button>
          </div>
          {/* <div>
            <Link to="/">Forgot Password?</Link>
          </div> */}
          <div>
            <p>
              Dont have an account?<Link to="/UserRegisteration">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
