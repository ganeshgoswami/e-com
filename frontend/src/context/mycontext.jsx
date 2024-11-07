// src/Context/AuthContext.js
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [allusers,setAllusers] = useState([])
  const [books,setbooks] = useState([])
  const [orders,setOrders] = useState([])
  const [user,setUser] = useState(null)
const navigate =  useNavigate();
const getUser = JSON.parse(localStorage.getItem("user"))


useEffect(()=>{
  getData();
  allbooks();
  allOrders();
  setUser(getUser)
},[])

// Admin Block 

// add book 

  const addBooks = (bookData) =>{
    fetch("http://localhost:5000/addbook",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData)
    }).then((res)=>res.json()).then((data)=>{
      if (data.data._id != null){
        console.log("Book Successfully Add")
        navigate("/bookStore")
        allbooks()
      }
      else{
        alert("Same Book ,Add Diffrent Book")
      }
    })
  }

  const getData = () => {
    fetch("http://localhost:5000/alldata")
      .then((res) => res.json())
      .then((data) => {
        setAllusers(data.data);
        localStorage.getItem('admin')
        localStorage.getItem("user")
      });
  };

  const allbooks = () =>{
    fetch("http://localhost:5000/allbooks")
      .then((res) => res.json())
      .then((data) => {
        setbooks(data.data);
      });
  }
  const allOrders = () =>{
    fetch("http://localhost:5000/allOrders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.data);
      });
  }

  // update user data 
  const updateDataInform = async (id,formData) => {
    await fetch(`http://localhost:5000/userdataUpdate/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        getData();
      });
  };

  // delete user 
  const deleteUserData = (id) => {
    debugger
    fetch(`http://localhost:5000/datadetele/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (id) {
          getData();
        }
        console.log("Delete response:", data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  // Users Block 
  const singupUser = (userData) =>{
    fetch("http://localhost:5000/singupUser",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    }).then((res)=>res.json()).then((data)=>{
      if (data.data._id != null){
        console.log("User Successfully Register")
        navigate("/login")
      }
      else{
        alert("User Allready Register")
      }
    })
  }
  const loginUser = (loginData) => {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("user",JSON.stringify(data.data))
       console.log("SuccessFully Login")
       navigate("/home")
      });
  };
  
  
  const hideAndShow = (id, newStock) => {
    
    fetch(`http://localhost:5000/bookHideShow/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Stock: newStock }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Prime user updated successfully", data);
      })
      .catch((err) => console.log("Error updating Prime Status:", err));
  };
  
  const neworderBook = (cart,userId,bookupdatedata) =>{
    debugger
    fetch(`http://localhost:5000/addCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Cart: cart.cart.items , userId : userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setbooks(bookupdatedata);
        console.log("Order successfully Added", data);
        allbooks();
      })
      .catch((err) => console.log("Error updating Order Status:", err));
  }

  console.log(allusers)
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        addBooks,
        singupUser,
        loginUser,
        allusers,
        setAllusers,
        updateDataInform,
        deleteUserData,
        books,
        setbooks,
        hideAndShow,
        orders,
        setOrders,
        neworderBook
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
