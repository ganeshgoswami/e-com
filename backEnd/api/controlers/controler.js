const { Books , Users ,Orders } = require("../models/data");
const nodemailer = require('nodemailer');
// const {EMAIL,PASSWORD} = require("../env");
const Mailgen = require("mailgen")

exports.home = (req, res) => {
  res.send("Hello Ganesh Puri");
};

// Admin APIS 

exports.addbook = async (req, res) => {
  try {
    const { image, bookName, price, titel, writer,quantity } = req.body;
    const userCheck = await Books.findOne({ BookName: bookName });

    if (userCheck == null) {
      const record = new Books({
        Image : image,
        BookName : bookName,
        Price:price,
        Titel:titel,
        Writer:writer,
        Quantity:quantity
      });

      record.save();

      res.json({
        statusCode: 202,
        message: "Successfully Insert Book",
        data: record,
      });
    } else {
      res.json({
        statusCode: 404,
        message: "Book is Allready Added",
        data: null,
      });
    }
  } catch (err) {
    res.json({
      statusCode: 404,
      message: `page not Found ---- Err in Data Api ${err}`,
      data: null,
    });
  }
};

exports.allData = async (req, res) => {
  try {
    const record = await Users.find();
    const totalCount = await Users.countDocuments();
    res.json({
      TotalCount: totalCount,
      statusCode: 202,
      message: "Users Data Finded Successfully",
      data: record,
    });
  } catch (err) {
    res.json({
      statusCode: 404,
      message: `Error in Find Api ${err}`,
      data: record,
    });
  }
};

exports.allbooks = async(req,res) =>{
  try {
    const record = await Books.find();
    const totalCount = await Books.countDocuments();
    res.json({
      TotalCount: totalCount,
      statusCode: 202,
      message: "Users Data Finded Successfully",
      data: record,
    });
  } catch (err) {
    res.json({
      statusCode: 404,
      message: `Error in Find Api ${err}`,
      data: record,
    });
  }
}
exports.allOrders = async(req,res) =>{
  try {
    const record = await Orders.find();
    const totalCount = await Orders.countDocuments();
    res.json({
      TotalCount: totalCount,
      statusCode: 202,
      message: "Orders Data Finded Successfully",
      data: record,
    });
  } catch (err) {
    res.json({
      statusCode: 404,
      message: `Error in Find Api ${err}`,
      data: record,
    });
  }
}

// edit user finddata and userDataUpdate

exports.finddata = async (req, res) => {
  try {
    const id = req.params.id;
 
    const record = await Users.findById(id);
    res.json({
      statusCode: 202,
      message: "Update Value",
      data: record,
    });
  } catch (err) {
    res.json({
      statusCode: 500,
      message: `Update API is not working: ${err.message}`,
    });
  }
};

exports.userdataUpdate = async (req, res) => {
  try {
    const id = req.params.id; 
    const { name, city, mobileNumber, email, password } = req.body; // Assuming the updated data is coming from req.body
  
    const record = await Users.findByIdAndUpdate(id, {
      Name: name,
      City: city,
      MobileNumber: mobileNumber,
      Email: email,
      Password: password,
    });

   
    res.json({
      statusCode: 202,
      message:"Data Updated",
      record
    });

  } catch (err) {
    res.json({
      statusCode: 500,
      message: `Update API is not working: ${err.message}`,
    });
  }
};


exports.addtoCart = async(req,res) =>{
  try {
    const {id,BookName,Image, Price, BookQuantity } = req.body.Cart[0];
    const userCheck = await Users.findOne({ _id: req.body.userId });
    console.log(req.body.userId)
    if (userCheck) {
      const record = new Orders({
        UserId: req.body.userId,
        items: [
          {
            BookId: id,
            BookName: BookName,
            Image: Image,
            Price: Price,
            BookQuantity: BookQuantity,
          },
        ],
        OrderDate: new Date(),
      });

      record.save();

      const bookToUpdate = await Books.findOne({ _id: id }); // Assuming you have a Books model
      if (bookToUpdate) {
        bookToUpdate.Quantity -= BookQuantity;
        
        // Ensure the quantity doesn't go below zero
        if (bookToUpdate.Quantity < 0) {
          bookToUpdate.Quantity = 0;
        }
        await bookToUpdate.save();
      }

      res.json({
        statusCode: 202,
        message: "Successfully Add to Cart",
        data: record,
      });
    } 
  } catch (err) {
    res.json({
      statusCode: 500,
      message: `page not Found ---- Err in Order Api ${err}`,
      data: null,
    });
  }
}
 


// new order book 

// exports.placeOrder = async (req, res) => {
//   const { userEmail } = req.body;

//   // Configure the transporter with environment variables
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     },
//   });

//   // Initialize Mailgen
//   const mailGenerator = new Mailgen({
//     theme: "default",
//     product: {
//       name: "Bookstore",
//       link: "https://localhost:5000/placeOrder",
//     },
//   });

//   try {
//     // Fetch the user by email and check if the cart is non-empty
//     const user = await Orders.findOne({ userEmail });
//     if (!user || !user.Cart || user.Cart.length === 0) {
//       return res.status(400).json({ message: "No items in cart to place an order." });
//     }

//     // Save the order in the database
//     const order = new Order({
//       userId: user._id,
//       items: user.Cart,
//     });
//     await order.save();

//     // Clear the user's cart after saving the order
//     user.Cart = [];
//     await user.save();

//     // Generate the email content with Mailgen
//     const emailContent = {
//       body: {
//         name: user.Name,
//         intro: "Your order has been placed successfully! Here are your order details.",
//         table: {
//           data: user.Cart.map(item => ({
//             "Book Name": item.bookName,
//             "Quantity": item.bookQuantity,
//             "Price": `₹${item.price}`,
//           })),
//         },
//         outro: "Thank you for shopping with us!",
//       },
//     };
// console.log(emailContent.body)
//     const emailBody = mailGenerator.generate(emailContent);

//     // Email message configuration for the user
//     const message = {
//       from: process.env.EMAIL,
//       to: userEmail,
//       subject: "Order Confirmation - Your Bookstore",
//       html: emailBody,
//     };

//     // Send the email to the user
//     await transporter.sendMail(message);

//     return res.status(201).json({ message: "Order placed and email sent to user." });
//   } catch (error) {
//     console.error("Error placing order:", error);
//     return res.status(500).json({ message: "Error placing order", error });
//   }
// };



// delete user 

exports.datadetele = async (req,res) =>{
  try{
    const id = req.params.id ; 
    const record = await Users.findByIdAndDelete(id);
    console.log(record)
    res.json({
          statusCode: 202,
          message: "data Deleted ",
          data: record,
        });
  }
  catch (err) {
    res.json({
      statusCode : 404,
      message :`Error in Api ${err}`,
      data:null
    })
  }

}

// hide And show 

exports.bookHideShow = async (req, res) => {
    try {
      const id = req.params.id;
      const book = await Books.findById(id);
      // Find user
      if (!book) {
        return res.status(404).json({
          statusCode: 404,
          message: "Book not found",
        });
      }
      
      book.Stock= !book.Stock;
      
      await book.save();
  
      res.status(202).json({
        statusCode: 202,
        message: "Book Stock updated successfully",
        data: book,
      });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: `Error in API prime update: ${err.message}`,
      });
    }
  };

 

// User APIS

exports.singupUser = async (req, res) => {
  try {
    const {  name, city, mobileNumber, email, password  } = req.body;
    const userCheck = await Users.findOne({ Email: email });

    if (userCheck == null) {
      const record = new Users({
        Name: name,
        City: city,
        MobileNumber: mobileNumber,
        Email: email,
        Password: password,
      });
      record.save();

      res.json({
        statusCode: 202,
        message: "Successfully Register User",
        data: record,
      });
    } else {
      res.json({
        statusCode: 404,
        message: "User is Allready register",
        data: null,
      });
    }
  } catch (err) {
    res.json({
      statusCode: 404,
      message: `page not Found ---- Err in Data Api ${err}`,
      data: null,
    });
  }
};

exports.loginUser = async (req,res) =>{
  const {email,password} = req.body;
  const checkLogin = await Users.findOne({Email:email});
  
  if(checkLogin !== null){
    if(checkLogin.Password == password){
      res.json({
        message:"Login Successfully",
        data:checkLogin
      })
    }
    else{
      res.json({
        message:"Password not Match",
        data:null
      })
    }
  }
  else{
    res.json({
      message:"user Not founded",
      data:null
    })
  }
}
