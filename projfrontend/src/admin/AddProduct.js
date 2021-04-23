import React,{useState,useEffect} from "react"
import {NavLink} from "react-router-dom"
import logo from "../logo1.png"
import {isAuthenticated} from "../auth/helper/index"
import Menu from "../core/Menu"
import admin from "../admin2.png"
import { createProduct, getallcategories } from "./helper/adminapicall"


const AddProduct = () => {

    const{user : {firstname,lastname,_id},token} = isAuthenticated()

    const [values, setvalues] = useState({
        name:"",
        description:"",
        price:"",
        photo:"",
        categories:[],
        category:"",
        stock:"",
        loading:false,
        error:"",
        didredirect:false,
        formdata:"",
        createdProduct:"",

    })

    const {name,description,price,photo,category,categories,stock,loading,error,didredirect,createdProduct,formdata} = values


    const onSubmit = (event)=>{
        event.preventDefault()
        setvalues({...values,error:"",loading:true})
        createProduct(_id,token,formdata)
        .then(data=>{
            if (data.error) {
                setvalues({...values,error:data.error,loading:false})
            }
            else{
                setvalues({
                    ...values,
                    name:"",
                    description:"",
                    price:"",
                    stock:"",
                    category:"",
                    error:"",
                    createdProduct:data.name,
                    formdata:"",
                    loading:false,
                    didredirect:true,
                    
                })
            }
        })
        .catch(err=>console.log(err))
    }

    const handlechange = name =>event =>{
        const value = name ==="photo"? event.target.files[0] : event.target.value
        formdata.set(name,value)
        setvalues({...values,[name]:value})
           }

    const preload = ()=>{
        getallcategories()
        .then(data=>{
            if (data.error) {
                setvalues({...values,error:data.error,})
            }
            else{
                setvalues({...values,categories:data,formdata:new FormData()})
                console.log(categories)
            }
        })
        
    }

    useEffect(() => {
        preload()
    }, [])

    const successMessage =()=>{
        return(
            <div style={{display: createdProduct ? "" : "none"}} className="success-product">
                <h5>{createdProduct} Created Successfully</h5>
            </div>
        )
    }

    const errorMessage =()=>{
        return(
            <div style={{display: error ? "" : "none"}} className="error-product">
                <h5>{error}</h5>
            </div>
        )
    }

    const leftSide = () => {
        return(
            <div className="leftSide">
                <img src={logo}></img>
                 <ul>
                        <NavLink className="admin" exact to="/admin/dashboard" activeStyle={{backgroundColor:"rgba(245, 245, 245,.15)"}} style={{ textDecoration: 'none' ,color :"white"}}><img src={admin} /><p>{firstname}{lastname}</p></NavLink>
                        <NavLink exact to="/admin/create/category" activeStyle={{backgroundColor:"rgba(245, 245, 245,.15)"}} style={{ textDecoration: 'none' ,color :"white"}}><li>Create Category</li></NavLink>
                        <NavLink exact to="/admin/create/product" activeStyle={{backgroundColor:"rgba(245, 245, 245,.15)"}} style={{ textDecoration: 'none' ,color :"white"}}><li>Create Product</li></NavLink>
                        <NavLink exact to="/admin/products" activeStyle={{backgroundColor:"rgba(245, 245, 245,.15)"}} style={{ textDecoration: 'none' ,color :"white"}}><li>Manage Product</li></NavLink>
                        <NavLink exact to="/admin/categorys" activeStyle={{backgroundColor:"rgba(245, 245, 245,.15)"}} style={{ textDecoration: 'none' ,color :"white"}}><li>Manage Category</li></NavLink>
                        <NavLink exact to="/" activeStyle={{backgroundColor:"rgba(245, 245, 245,.15)"}}  style={{ textDecoration: 'none' ,color :"white"}}><li>Manage Orders</li></NavLink>
                </ul>
            </div>
        )
    }

const rightSide = () => {
        return(
            <div className="rightSide">
                <div>
                    <h2>Create Product</h2>
                </div>
                {successMessage()}
                {errorMessage()}
                <div className="main_right">
                    <form className="input-product">
                                <label>Product Name</label>
                                <input value={name} onChange={handlechange("name")}  required type="text" name="" />
                                <br />
                                <label>Photo</label>
                               
                                <input  onChange={handlechange("photo")} required type="file" name="" />
                                <br />
                                <label>Description</label>
                                
                                <textarea value={description} onChange={handlechange("description")}  required name="" />
                                <br />
                                <label>Price</label>
                                
                                <input value={price} onChange={handlechange("price")} required type="number" name="" />
                                <br />
                                <label>Category</label>
                                
                                <select onChange={handlechange("category")}>
                                    <option>Select</option>
                                    {categories && categories.map((cate,index)=>{
                                        return <option key={index}  value={cate._id}>{cate.name}</option>
                                    })}
                                    
                                </select>
                                <br />
                                <label>Stock</label>
                                
                                <input value={stock} onChange={handlechange("stock")} required type="number" name="" />
                                <br />
                                <button onClick={onSubmit} className="create-btn-product" type="button">Create</button>

                            </form>
                </div>
            </div>
        )
    }


    return(
        <div className="admin_main">
            <Menu />
            {leftSide()}
            {rightSide()}
        </div>
    )
}

export default AddProduct