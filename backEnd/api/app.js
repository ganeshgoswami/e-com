const express = require('express');
const cors = require("cors");
const app = express();
const ApiRouter = require("./routers/router")


// database connect

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/bookStore")
  .then(() => {
    console.log("Database is Connected to bookStore");
  })
  .catch((error) => {
    console.log(`error in Database ${error}`);
  });


const PORT = 5000 ;
app.get('/',(req,res)=>{
    res.json("Hello")
})

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(ApiRouter);

app.listen(PORT , ()=>{
console.log(`server is Running on ${PORT}`)
})