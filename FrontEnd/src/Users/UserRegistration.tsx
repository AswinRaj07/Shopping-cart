import React, { FunctionComponent, useState } from "react";
import style from "./userergstyl.module.scss";
import axios from "axios";

interface RegistrationFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const UserRegistration: FunctionComponent = () => {
  const [register, setRegister] = useState<RegistrationFormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Users/register",
        register
      );
      console.log("Register sucess", response.data);
    } catch (err) {
      console.log("RegistrationFailed", err);
    }
  };
  return (
    <div>
      <div className={style.productPage}>
        <form className={style.container} onSubmit={handleFormSubmit}>
          <div>
            <h2>Register here</h2>
          </div>
          <div>
            <input
              type="text"
              name="firstname"
              required
              placeholder="firstname"
              value={register.firstname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="lastname"
              required
              placeholder="lastname"
              value={register.lastname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              required
              placeholder="email"
              value={register.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="password"
              required
              placeholder="Password"
              value={register.password}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;
