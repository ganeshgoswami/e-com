const mongoose = require("mongoose");

const mongoSchemaBooks = mongoose.Schema({
  Image: String,
  BookName: String,
  Price: Number,
  Titel: String,
  Writer: String,
  Quantity: Number,
  Stock :Boolean
});

const mongoSchemaUsers = mongoose.Schema({
  Name: String,
  City: String,
  MobileNumber: Number,
  Email: String,
  Password: String,
});

const orderSchema = mongoose.Schema({
  userId: String,
  items: [
    {
      id : String,
      BookName: String,
      Image: String,
      Price: Number,
      BookQuantity: Number,
    },
  ],
  OrderDate: String,
});

const Books = mongoose.model("books", mongoSchemaBooks);
const Users = mongoose.model("users", mongoSchemaUsers);
const Orders = mongoose.model("orders", orderSchema);

module.exports = { Books ,Users ,Orders };
