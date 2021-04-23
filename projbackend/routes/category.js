const express = require("express")
const { route } = require("./user")
const router = express.Router()
const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,deleteCategory} = require("../controllers/category")
const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

router.param("userID",getUserById)
router.param("categoryId",getCategoryById)

router.post("/category/create/:userID",isSignedIn,isAuthenticated,isAdmin,createCategory)
router.get("/category/:categoryId",getCategory)
router.get("/categorys",getAllCategory)
router.put("/category/:categoryId/:userID",isSignedIn,isAuthenticated,isAdmin,updateCategory)
router.delete("/category/:categoryId/:userID",isSignedIn,isAuthenticated,isAdmin,deleteCategory)


module.exports = router