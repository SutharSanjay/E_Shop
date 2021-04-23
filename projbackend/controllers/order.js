const order = require("../models/order")
const Order = require("../models/order")
const ProductCart = require("../models/productcart")
const User = require("../models/user")


exports.getOrderById = (req,res,next,id)=>{
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        if(err||!order){
            return res.status(400).json({
                err : "Order is Not Found!"
            })
        }
        req.order = order
        next()
    })
}

exports.createOrder = (req,res)=>{
    req.body.order.user = req.profile
    const order =  new Order(req.body.order)
    order.save((err,order)=>{
        if(err || !order){
            return res.status(400).json({
                err : "Can't Create Order!"
            })
        }
        res.json(order)
    })
}

exports.getAllOrder = (req,res)=>{
    Order.find()
    .populate("user","_id name lastname")
    .exec((err,orders)=>{
        if(err || !orders){
            return res.status(400).json({
                err : "Can't Get Orders!"
            })
        }
        return res.json(orders)
    })
}


exports.updateStatus = (req,res)=>{
    order.update({_id:req.order._id},{$set:{status:req.body.status}},(err,order)=>{
        if(err || !order){
            return res.status(400).json({
                err : "Can't Update Status!"
            })
        }
        res.json(order)
    })
}

exports.getStatus = (req,res) => {
    return res.json(Order.schema.path("status").enumValues)
}