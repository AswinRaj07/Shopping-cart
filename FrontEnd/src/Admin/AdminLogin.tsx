import { FunctionComponent } from "react";
import style from "./AdminLogin.module.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface LoginFormData {
  username: string;
  password: string;
}
const AdminLogin: FunctionComponent = () => {
  const [login, setLogin] = useState<LoginFormData>({
    username: " ",
    password: " ",
  });
  console.log(login)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        login
      );
      if(response.data.status == 200){
        console.log("LoginSucessfull:", response.data);
        navigate("/adminpage");
      }
      else{
        alert("Email or Password Incorrect!!")
      }
     
    } catch (err) {
      console.log("Login Failed:",err);
      alert("Email or Password Incorrect!!")
    }
  };

  return (
    <div>
      <div className={style.productPage}>
        <form className={style.container} onSubmit={handleFormSubmit}>
          <div>
            <h2>Admin Login</h2>
          </div>
          <div>
            <input
              type="text"
              placeholder="UserName"
              name="username"
              value={login.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="password"
              name="password"
              value={login.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
