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


const Login: FunctionComponent = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
 
  console.log(formData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post( "http://localhost:5000/api/Users/Login",formData,{withCredentials:true});
      
      console.log(response.data)
      // localStorage.setItem("currentUser",response.data.userWithEmail.email)
      localStorage.setItem("token",response.data.token)
      if(response.status == 200){
        navigate("/");
      }else{
        alert("Please enter vaid details")
      }
      
    } catch (error) {
      console.error("Login failed:", error) 
      window.location.reload
      alert("Email or Password Incorrect !!")
     
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
