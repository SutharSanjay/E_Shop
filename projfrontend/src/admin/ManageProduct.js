import React,{useState,useEffect} from "react"
import {Link, NavLink} from "react-router-dom"
import logo from "../logo1.png"
import {isAuthenticated} from "../auth/helper/index"
import Menu from "../core/Menu"
import admin from "../admin2.png"
import {createCategory, deleteProduct, getallproduct} from "../admin/helper/adminapicall"
import photo from "../photo.jpg"
import UpdateProduct from "./UpdateProduct"
import ImageHelper from "./helper/imagehelper"

const ManageProduct = () => {

    const [products, setproducts] = useState([])

    const{user : {_id,firstname,lastname},token} = isAuthenticated()

    const preload =()=>{
        getallproduct()
        .then(data=>{
            if (data.error) {
                console.log(data.error)
            }
            else{
                setproducts(data)
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const deleteThis = productId =>{
        deleteProduct(productId,_id,token).then(data=>{
            if (data.error) {
                console.log(data.error)
            }
            else{
                preload()
            }
        })

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
                    <h2>Manage Products</h2>
                </div>
                <div className="main">
                    {products.map((product,index)=>{
                        return(
                        <div className="card">
                        <ImageHelper product={product}/>
                        <span className="card-name">{product.name}</span>
                        <span className="update-btn"><Link style={{textDecoration:"none",color:"white"}} to={`/admin/product/update/${product._id}`}>Update</Link></span>
                        <span className="delete-btn" onClick={()=>{deleteThis(product._id)}} >Delete</span>
                        </div>
                        )
                    
                    })}
                    
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

export default ManageProduct