import React, { useContext, useState } from "react";
import { AuthContext } from "../context/mycontext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { books,user, orders, setbooks,setOrders ,neworderBook} = useContext(AuthContext);
  const [showCart, setShowCart] = useState(false); // State to control cart modal visibility
  const [updateArrData,setupdateArrData] = useState(null)
 const navigate  = useNavigate();

  const addToCart = (id) => {
    // Find the book by ID, and check if it exists and has sufficient quantity
    const findBook = id ? books.find((bk) => bk._id === id) : null;
  
    if (findBook && findBook.Quantity > 0) {
      // Clone the current orders state to update the cart
      const updatedOrders = { ...orders };
  
      // Ensure 'cart' exists in orders and initialize items array if needed
      if (!updatedOrders.cart) {
        updatedOrders.cart = { items: [] };
      }
  
      // Check if the book already exists in the cart
      const existBookIndex = updatedOrders.cart.items.findIndex(
        (item) => item.id === id
      );
  
      if (existBookIndex >= 0) {
        // If the book is already in the cart, increase its quantity
        updatedOrders.cart.items[existBookIndex].BookQuantity += 1;
      } else {
        // If the book is not in the cart, add it as a new item
        const cartItem = {
          id: findBook._id,
          BookName: findBook.BookName,
          Image: findBook.Image,
          Price: findBook.Price,
          BookQuantity: 1,
        };
        updatedOrders.cart.items.push(cartItem);
      }
  
      // Decrease the book quantity by 1 in the books array
      const updatedBooks = books.map((book) =>
        book._id === id
          ? { ...book, Quantity: book.Quantity - 1 }
          : book
      );
  
      // Update both books and orders states to reflect changes
      setupdateArrData(updatedBooks);
      setOrders(updatedOrders);
      setShowCart(true)
    } else {
      alert("Book not available in stock or invalid ID.");
    }
  };

  const totalPayment = () =>
    orders.cart?.items.reduce(
      (pre, curr) => pre + curr.Price * curr.BookQuantity,
      0
    ) || 0;

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const paymentDone =(cart,userId) =>{
    // setbooks(updateArrData);
    neworderBook(cart,userId,updateArrData) 
    navigate("/login")
  }

  return (
    <div className="container m-2">
      <div className="row">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              className="col-lg-4 col-md-6 col-sm-12 mb-3"
              key={book._id}
            >
              <div className="card h-100 p-2 text-center shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                <div className={book.Stock ? "opacity-50" : ""}>
                  <h5 className="text-danger">
                    {book.BookName} {" (By " + book.Writer + ")"}
                  </h5>
                  <div className="text-center">
                    <img
                      src={book.Image}
                      alt={book.title}
                      className="img-fluid"
                      style={{ maxWidth: "150px", maxHeight: "120px" }}
                    />
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      <span className="text-success">
                        <b>Title:</b> {book.Titel}
                      </span>
                    </p>
                    <p>
                      <b>Price: </b>₹ <b>{book.Price}.00 </b>{" "}
                      <del className="text-danger">
                        <small>₹{(book.Price / 100) * 110}.00</small>
                      </del>
                    </p>
                    <p>
                      <b>Available: </b> {book.Quantity} copies
                    </p>
                  </div>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => addToCart(book._id)}
                    disabled={book.Quantity <= 0}
                  >
                    {book.Quantity > 0 ? "Buy" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Books found.</p>
        )}
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="cart-modal shadow-lg" style={modalStyle}>
          <h5 className="text-center">Cart</h5>
          <div className="m-2">
            <button
              type="button"
              className="btn-close float-end"
              aria-label="Close"
              onClick={toggleCart}
            ></button>
          </div>
          <div className="cart-content p-3 m-2">
            {orders.cart?.items.length > 0 ? (
               orders.cart.items.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between my-2"
                >
                  <div>
                    <img
                      src={item.Image}
                      alt={item.BookName}
                      style={{ width: "50px", height: "50px" }}
                    />
                    <span className="ms-2">{item.BookName}</span>
                  </div>
                  <div>
                    <span>Qty: {item.BookQuantity}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">Your cart is empty.</p>
            )}
          </div>
          <div className="text-center">
            <button className="btn btn-sm btn-primary" aria-label="Close" onClick={()=>paymentDone(orders,user._id)}>
              Payment (Pay {totalPayment()} ₹)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

// Styles for the cart modal
const modalStyle = {
  position: "fixed",
  right: "20px",
  bottom: "0",
  width: "300px",
  height: "50vh",
  backgroundColor: "white",
  zIndex: 1000,
  overflowY: "auto",
  borderRadius: "15px",
};
