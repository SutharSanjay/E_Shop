const express = require("express")
const router = express.Router()
const {signup,signout,signin,isSignedIn} = require("../controllers/auth")
const {body,validationResult, check} = require("express-validator")

router.post("/signup",[
    body("firstname").isLength({min:3}).withMessage("Minimum length is 3 for FirstName"),
    body("lastname").isLength({min:3}).withMessage("Minimum length is 3 for LastName"),
    body("email").isEmail().withMessage("Invalid Email please try again"),
    body("password").isLength({min : 8}).withMessage("Password Is must be atleast 8 character")
],signup)

router.post("/signin",[
    body("email").isEmail().withMessage("Please Enter Valid Email"),
    body("password").isLength({min:8}).withMessage("Enter Valid password")
],signin)

router.get("/signout",signout)

router.get("/test",isSignedIn,(req,res)=>{
    res.send("User is Protected....")
})

module.exports=router