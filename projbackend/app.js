require("dotenv").config()
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const express = require("express");
const app = express();
const userroutes = require("./routes/user")
const authroutes = require("./routes/auth")
const categoryroutes = require("./routes/category")
const productroutes = require("./routes/product")
const orderroutes = require("./routes/order")
const {body} = require("express-validator")
const port  = process.env.PORT;




mongoose.connect(process.env.DATABASE, 
{useNewUrlParser: true, 
useUnifiedTopology: true,
useCreateIndex:true}
).then(()=>{
    console.log("DB IS CONNECTED")
})


app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//Routes
app.use("/api",authroutes)
app.use("/api",userroutes)
app.use("/api",categoryroutes)
app.use("/api",productroutes)
app.use("/api",orderroutes)
//Server

app.listen(port,()=>{
    console.log(`Server is Running........ at ${port}`)
})