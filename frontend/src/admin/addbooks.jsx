// src/Register.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/mycontext";

const AddBooks = () => {
    const [image, setImage] = useState("");
  const [bookName, setbookName] = useState("");
  const [price, setPrice] = useState(0);
  const [titel, setTitel] = useState("");
  const [writer, setWriter] = useState("");
  const [quantity, setQuantity] = useState(0);
  // navigate the page other page

  const {addBooks} = useContext(AuthContext)

//   const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const productData = { image, bookName, price, titel, writer,quantity};
    addBooks(productData);
  }

  return (
    <div className="container mt-5">
      {/* <p onClick={() => navigate("/adminHome")}>Admin User Table</p> */}
      <div className="row justify-content-center">
        <div className="col-md-6 shadow p-3 mb-5 bg-body-tertiary rounded">
          <h2 className="text-center">Add Book</h2>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="form-group mb-3">
              <label>Book Name</label>
              <input
                type="text"
                name="bookName"
                className="form-control"
                value={bookName}
                onChange={(e) => {
                  setbookName(e.target.value);
                }}
              />
            </div>
            <div className="form-group mb-3">
              <label>Img Url</label>
              <input
                type="text"
                name="image"
                className="form-control"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </div>

            <div className="form-group mb-3">
              <label>Price</label>
              <input
                type="text"
                name="price"
                className="form-control"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className="form-group mb-3">
              <label>Titel</label>
              <input
                type="text"
                name="titel"
                className="form-control"
                value={titel}
                onChange={(e) => {
                  setTitel(e.target.value);
                }}
              />
            </div>
            <div className="form-group mb-3">
              <label>Writer</label>
              <input
                type="text"
                name="writer"
                className="form-control"
                value={writer}
                onChange={(e) => {
                    setWriter(e.target.value);
                }}
              />
            </div>
            <div className="form-group mb-3">
              <label>Book Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={quantity}
                onChange={(e) => {
                    setQuantity(e.target.value);
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Add new Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBooks;