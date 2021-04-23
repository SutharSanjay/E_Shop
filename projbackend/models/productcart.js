const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const productCartSchema = new mongoose.Schema({
    product : {
        type:ObjectId,
        ref:"Product",
    },
    name: String,
    count:Number,
    price:Number 
})

module.exports = mongoose.model("productCart",productCartSchema)