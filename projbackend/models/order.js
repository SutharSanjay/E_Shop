const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const orderSchema = new mongoose.Schema({
    products :{
        type:ObjectId,
        ref:"productCart"
    },
    transaction_id : {},
    amount : {
        type:Number,
        trim:true,
    },
    address : {
        type:String,
        maxlength:200,
        trim:true,

    },
    updated : {
        type:Date,
    },
    status : {
        type :String,
        default : "",
        enum : ["Cancelled","Delivered","Shipped","Processing","Received"]
    },
    user : {
        type : ObjectId,
        ref : "User"
    }


},{timestamps:true})

module.exports = mongoose.model("Order",orderSchema)