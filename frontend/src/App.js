import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./components/loginPage";
import AddBooks from "./admin/addbooks";
import RegisterPage from "./components/registerPage";
import Home from "./pages/home";
import UserTable from "./admin/usersTable";
import BookStoreAdmin from "./admin/bookStoreAdmin";
import NavbarAdmin from "./admin/navbarAdmin";
import { useEffect, useState } from "react";
import NavbarUser from "./components/navbarUser";
import AddCart from "./pages/addCart";

function App() {
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    const userLogin = JSON.parse(localStorage.getItem("user"));
    setAdmin(storedAdmin);
    setUser(userLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin" || "user");
    setAdmin(null);
    navigate("/login");
  };

  return (
    <div className="App">
      {admin == null ? "" : <NavbarAdmin onLogout={handleLogout} />} 
      {user == null ? "" : <NavbarUser onLogout={handleLogout} />} 
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/addbook" element={<AddBooks />} />
        <Route path="/userTable" element={<UserTable />} />
        <Route path="/bookStore" element={<BookStoreAdmin />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addCart" element={<AddCart />} />
      </Routes>
    </div>
  );
}

export default App;
