const router = require('express').Router();
const apis = require("../controlers/controler")


//Admin Apis
router.post("/addbook",apis.addbook)
router.get("/alldata",apis.allData)

// data find and update 

router.get("/finddata/:id",apis.finddata)
router.put("/userdataUpdate/:id",apis.userdataUpdate)

// hide and show book 
router.put("/bookHideShow/:id",apis.bookHideShow)

// delete User 
router.delete("/datadetele/:id",apis.datadetele)

router.get("/allbooks",apis.allbooks)
router.get("/allOrders",apis.allOrders)


router.post("/addCart",apis.addtoCart)

// router.post("/placeOrder",apis.placeOrder)

// users Apis
router.post("/singupUser",apis.singupUser)
router.get("/home",apis.home)
router.post("/login",apis.loginUser)

module.exports = router;