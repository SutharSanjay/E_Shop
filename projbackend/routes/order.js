const express = require("express")
const router = express.Router()

const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const {getUserById,pushOrderInPurchaseList} = require("../controllers/user")
const {updateInventory} = require("../controllers/product")

const {getOrderById,createOrder,getAllOrder,getStatus,updateStatus} = require("../controllers/order")
const { route } = require("./user")

router.param("userId",getUserById)
router.param("orderId",getOrderById)

router.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateInventory,createOrder)

router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrder)

router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getStatus)
router.put("/order/:orderId/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus)

module.exports = router