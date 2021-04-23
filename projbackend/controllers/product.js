const Product = require("../models/product")
const formidable = require("formidable")
const {check,validationResult}=require("express-validator")
const _ = require("lodash")
const fs = require("fs")
const { set } = require("lodash")
const product = require("../models/product")

exports.getProductById = (req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err || !product){
            return res.status(400).json({
                err : "Product Not Found"
            })
        }
        req.product = product
        next()
    })
}

exports.createProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                err:"Problem With Data!"
            })
        }
        

        const {name,discription,price,category,stock} = fields;

        // if(!name || !discription || !price || !category || !stock){
        //     return res.status(400).json({
        //         err : "Please Fill Data Carefully"
        //     })
        // }
        let product = new Product(fields);
        
        if(file.photo){
            if(file.photo.size > 2097152 ){
                return res.status(400).json({
                    err : "Image Size is Above 2MB !"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    err : "Saving Product in Database is Failed"
                })
            }
            res.json(product)
        })
    })
}


exports.getProduct = (req,res)=>{
    req.product.photo = undefined
    return res.json(req.product)
}


exports.photo = (req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}


exports.updateProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                err:"Problem With Data!"
            })
        }
        let product = req.product;
        product = _.extend(product,fields)

        if(file.photo){
            if(file.photo.size > 2097152 ){
                return res.status(400).json({
                    err : "Image Size is Above 2MB !"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    err : "Update Product in Database is Failed"
                })
            }
            res.json(product)
        })
    })
}

exports.deleteProduct = (req,res)=>{
    let product = req.product
    product.remove((err,product)=>{
        if(err || !product){
            return res.status(400).json({
                err : "Can't Able To Delete Product"
            })
        }
        return res.json({
            Massage : `${product.name} is Deleted SuccessFully`
        })
    })
}

exports.getAllProduct = (req,res)=>{
    
    let limit = parseInt(req.query.limit) ? req.query.limit : 30
    let sortby = req.query.sortby ? req.query.sortby : "createdAt"

    Product.find()
    .populate("category")
    .sort([[sortby,"asc"]])
    .select("-photo")
    .limit(limit)
    .exec((err,products)=>{
        if(err || !products){
            return res.status(400).json({
                err : "Database Dont Have Products"
            })
        }
        return res.json(products)
    })
}


exports.updateInventory = (req,res,next)=>{
    let myOperations =  req.body.order.products.map(prod =>{
        return {
            updateOne : {
                filter : {_id : prod._id},
                update : {$inc : {stock:-prod.count,sold : +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err || !products){
            return res.status(400).json({
                err : "Bulk Operation is Failed!"
            })
        }
        next()
    })
}


exports.getUniqueCategory = (req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err || !product){
            return res.status(400).json({
                err : "Category Is Not Found"
            })
        }
        res.json(category)
    })
}