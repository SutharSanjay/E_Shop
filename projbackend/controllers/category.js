const category = require("../models/category")
const Category = require("../models/category")


exports.getCategoryById = (req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err){
            return res.status(400).json({
                err: "Category is not Exists"
            })
        }
        req.category=category;
        next()
    })
}

exports.createCategory = (req,res)=>{

    const category = new Category(req.body)
    category.save((err,category)=>{
        if(err || !category){
            return res.status(400).json({
                err : "Category Can't Store In Database"
            })
        }
        res.json({category})
    })
}

exports.getCategory = (req,res)=>{
    Category.findOne({_id:req.category._id}).exec((err,category)=>{
        if(err || !category){
            return res.status(400).json({
                err : "Category not found in DB"
            })
        }
        return res.json(req.category)
    })
}

exports.getAllCategory = (req,res)=>{
    Category.find().exec((err,categorys)=>{
        if(err || !category){
            return res.status(400).json({
                err : "Category not found in DB"
            })
        }
        return res.json(categorys)
    })
}

exports.updateCategory = (req,res)=>{
    const category = req.category
    category.name = req.body.name;

    category.save((err,updatedcategory)=>{
        if(err || !updatedcategory){
            return res.status(400).json({
                err : "Category not found in DB"
            })
        }
        res.json({updatedcategory})
    })
}


exports.deleteCategory = (req,res)=>{
    const category = req.category
    category.remove((err,category)=>{
        if(err || !category){
            return res.status(400).json({
                err : "Category is not able to delete"
            })
        }
        res.json({

            message:`${category.name} Category is Deleted`,
        })
    })
}