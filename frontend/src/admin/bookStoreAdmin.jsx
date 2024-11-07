import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/mycontext";

const BookStoreAdmin = () => {
  const navigate = useNavigate();
  const { books, setbooks, hideAndShow } = useContext(AuthContext);

  const showHide = (id) => {
    const updatedData = books.map((book) =>
      book._id === id ? { ...book, Stock: !book.Stock } : book
    );

    const findData = id ? updatedData.find((dt) => dt._id === id) : null;

    setbooks(updatedData);

    if (findData) {
      hideAndShow(id, findData.Stock);
    }
  };



  return (
    <div className="container m-2">
      {/* Display filtered products */}
      <div className="row">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={book._id}>
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
                      style={{ maxWidth: "150px",maxHeight:"120px   " }}
                    />
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      <span className="text-success">
                        <b>Title:</b> {book.Titel}
                      </span>
                    </p>
                    <p>
                      <b>Price: </b>
                      {book.Price} Rupees
                    </p>
                  </div>
                  <button
                    className={
                      book.Stock ? "btn btn-sm btn-danger" : "btn btn-sm btn-primary"
                    }
                    onClick={() => showHide(book._id)}
                  >
                    {book.Stock ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Books found.</p>
        )}
      </div>
    </div>
  );
};

export default BookStoreAdmin;
