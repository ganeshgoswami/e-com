import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/mycontext";

const UserTable = () => {
  const { allusers, updateDataInform, deleteUserData } = useContext(AuthContext);
  const [updatedData, setUpdatedData] = useState("");
  const [name, setname] = useState("");
  const [city, setcity] = useState("");
  const [mobileNumber, setnumber] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const formData = { name, city, mobileNumber, email, password };

  const handelUpdateUser = (id, e) => {
    e.preventDefault();
    updateDataInform(id, formData);
    console.log(id);
  };

  const searchData = (id) => {
    fetch(`http://localhost:5000/finddata/${id}`, {})
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setUpdatedData(data.data);
        setname(data.data.Name);
        setcity(data.data.City);
        setnumber(data.data.MobileNumber);
        setemail(data.data.Email);
        setpassword(data.data.Password);
       
      });
  };

  return (
    <>
      <div className="container-fluid">
        <h1 className="text-center my-4">
          <u>Users Data</u>
        </h1>
        <p className="fw-bold">{"Total User : " + allusers.length}</p>
        <div className="table-responsive">
          <table className="table table-dark table-striped table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                {/* <th>City</th> */}
                <th>Number</th>
                <th>Email</th>
                {/* <th>Password</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allusers.map((user) => (
                <tr key={user._id}>
                  <td className="fw-bold">{user._id}</td>
                  <td className="fw-bold">{user.Name}</td>
                  {/* <td className="fw-bold">{user.City}</td> */}
                  <td className="fw-bold">{user.MobileNumber}</td>
                  <td className="fw-bold">{user.Email}</td>
                  {/* <td className="fw-bold">{user.Password}</td> */}
                  <td className="d-flex justify-content-around">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => searchData(user._id)}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@mdo"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteUserData(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for updating user */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label>Name:</label>
                <input
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>Number:</label>
                <input
                  value={mobileNumber}
                  onChange={(e) => setnumber(e.target.value)}
                  className="form-control"
                  type="number"
                />
              </div>
              <div className="mb-3">
                <label>Email:</label>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="form-control"
                  type="email"
                />
              </div>
              <div className="mb-3">
                <label>City:</label>
                <input
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                  className="form-control"
                  type="text"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={(e) => handelUpdateUser(updatedData._id, e)}
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserTable;
