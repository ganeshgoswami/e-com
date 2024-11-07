import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/mycontext";

const NavbarUser = () => {
  const navigate = useNavigate();
 const {setUser} = useContext(AuthContext)
  const logOut = () => {
    localStorage.clear();
    setUser(null)
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary p-2"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <div>
          <NavLink
            to="/bookStore"
            className="nav-link text-warning me-3 fw-bold "
          >
          Books Store
          </NavLink>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
           
            <li className="nav-item me-3">
              <NavLink
                to="/home"
                className="nav-link"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "red" : "white",
                })}
              >
               Home
              </NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink
                to="/addCart"
                className="nav-link"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "red" : "white",
                })} 
              >
                Add To Cart
              </NavLink>
            </li>
          </ul>
          <div className="d-flex">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                logOut();
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarUser;
