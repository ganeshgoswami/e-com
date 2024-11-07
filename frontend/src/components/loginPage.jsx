// src/Login.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/loginPage.css";
import { AuthContext } from "../context/mycontext";

const LoginPage = () => {
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
      isAdmin: email === "admin@gmail.com", // Replace with actual admin check
    };

    if (email === "admin@gmail.com" && password == "1234") {
      localStorage.setItem("admin", JSON.stringify(loginData));
      navigate("/userTable");
    } else {
      loginUser(loginData); // login is Context Function
    }
    
 
    console.log(loginData);
  };

  
  return (
    <div className="container mt-5">
      
      <div className="row justify-content-center">
        <div className="col-md-6 shadow p-3 mb-5 bg-body-tertiary rounded rotate-card" style={{"backgroundImage": "repeating-conic-gradient(green 8%, white 20%)"}}>
          <h2 className="text-center text">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label><b>Email</b></label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label><b>Password</b></label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                required
              />
            </div>
            <button type="submit" className="btn btn-success btn-block m-3"  >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
