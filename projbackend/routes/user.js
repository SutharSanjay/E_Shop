const express = require("express")
const router = express.Router()

const {getUser,getUserById,updateUser,userPurchaseList} = require("../controllers/user")
const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth")

router.param("userID",getUserById)

router.put("/user/:userID",isSignedIn,isAuthenticated,updateUser)

router.get("/user/:userID",isSignedIn,isAuthenticated,getUser)

router.get("orders/user/:userID",isSignedIn,isAuthenticated,userPurchaseList)



module.exports = router
