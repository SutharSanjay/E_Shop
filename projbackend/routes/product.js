const express = require("express");
const router = express.Router();
const  {check,validationResult} = require("express-validator")

const {getProductById,createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProduct,getUniqueCategory} = require("../controllers/product");
const {getUserById} = require("../controllers/user");
const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth");

router.param("userId",getUserById);
router.param("productId",getProductById);


router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);

router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)

router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)

router.get("/products",getAllProduct)
router.get("/product/categorys",getUniqueCategory)


module.exports = router;