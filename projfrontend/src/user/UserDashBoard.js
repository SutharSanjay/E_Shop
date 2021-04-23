import React from "react"
import {NavLink} from "react-router-dom"
import "./AdminDashboard.css"
import logo from "../logo1.png"
import {isAuthenticated} from "../auth/helper/index"
import Menu from "../core/Menu"
import admin from "../admin2.png"


const UserDashBoard = () => {

    const{user : {_id,firstname,lastname,email,role}} = isAuthenticated()

    const leftSide = () => {
        return(
            <div className="leftSide">
                <img src={logo}></img>
                 <ul>
                    <NavLink className="admin" exact to="/user/dashboard" activeStyle={{backgroundColor:"rgba(245, 245, 245,.15)"}} style={{ textDecoration: 'none' ,color :"white"}}><img src={admin} /><p>{firstname}{lastname}</p></NavLink>
                    <NavLink exact to="/profile" activeStyle={{backgroundColor:"rgba(245, 245, 245,.15)"}} style={{ textDecoration: 'none' ,color :"white"}}><li>Profile</li></NavLink>
                </ul>
            </div>
        )
    }

const rightSide = () => {
        return(
            <div className="rightSide">
                <div>
                    <h2>Welcome {firstname}!</h2>
                </div>
                <div className="main_right">
                    <ul>
                        <li className="info"><h3>User Information</h3></li>
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

export default UserDashBoard