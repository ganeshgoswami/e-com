import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/registerPage.css";
import { AuthContext } from "../context/mycontext";

const RegisterPage = () => {
  const [name, setname] = useState("");
  const [city, setcity] = useState("");
  const [mobileNumber, setnumber] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { singupUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
  
    const formData = { name, city, mobileNumber, email, password };
    console.log(formData)
    singupUser(formData);
  }


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div
          className="col-md-6 shadow p-3 mb-5 bg-body-tertiary  rounded rotate-card"
          style={{
            backgroundImage: "repeating-conic-gradient(red 10%, yellow 20%)",
          }}
        >
          <h2 className="text-center text-style">Register</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group mb-3">
              <label>
                <b>Name</b>
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>
                <b>City</b>
              </label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={city}
                onChange={(e) => setcity(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>
                <b>Mobile Number</b>
              </label>
              <input
                type="number"
                name="mobile"
                className="form-control"
                value={mobileNumber}
                onChange={(e) => setnumber(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>
                <b>Email</b>
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>
                <b>Password</b>
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
