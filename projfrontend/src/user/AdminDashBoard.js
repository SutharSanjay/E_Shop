import React from "react"
import {NavLink} from "react-router-dom"
import "./AdminDashboard.css"
import logo from "../logo1.png"
import {isAuthenticated} from "../auth/helper/index"
import Menu from "../core/Menu"
import admin from "../admin2.png"


const AdminDashBoard = () => {

    const{user : {_id,firstname,lastname,email,role}} = isAuthenticated()

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
                    <h2>Welcome To Admin Area!</h2>
                </div>
                <div className="main_right">
                    <ul>
                        <li className="info"><h3>Admin Information</h3></li>
                        <li><span>ID</span>: {_id}</li>
                        <li><span>Name</span>: {firstname} {lastname}</li>
                        <li><span>Email</span>: {email}</li>
                    </ul>
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

export default AdminDashBoard