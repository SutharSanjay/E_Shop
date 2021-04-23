import React, { useState,useEffect } from "react"
import {NavLink} from "react-router-dom"
import "./AdminDashboard.css"
import logo from "../logo1.png"
import {isAuthenticated, signout} from "../auth/helper/index"
import Menu from "../core/Menu"
import admin from "../admin2.png"
import { GetUser, UpdateUser } from "./helper/userapicall"

const Profile = ({history}) => {

    const [values, setvalues] = useState({
        firstname : "",
        lastname : "",
        email : "",
        password : "",
        error : "",
        success : false
    })
    const {firstname,lastname,email,password,error,success} = values
    const{token,user} = isAuthenticated()
    const preload = () =>{
        setvalues({
            ...values,
            firstname:user.firstname,
            lastname : user.lastname,
            email : user.email
        })
    }

    useEffect(() => {
        preload()
    }, [])
   
    const onSubmit=(event)=>{
        event.preventDefault()
        UpdateUser({firstname,lastname,email,password},user._id,token)
        .then(data=>{
            console.log(data)
            if(data.error){
                setvalues({...values,error:data.error})
            }
            else{
                setvalues({
                    ...values,
                    firstname:"",
                    lastname:"",
                    email:"",
                    password:"",
                    success:true,
                    error:""
                    
                })
                setTimeout(()=>{
                    signout(() => {
                        history.push("/")
                    })
                },2000)
            }
        })
        .catch(err=>console.log(err))
    }

    const successMessage =()=>{
        return(
            <div style={{display: success ? "" : "none"}} className="success-product">
                <h5>Updated Successfully</h5>
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

    const handlechange = name => event =>{
        setvalues({...values,error : "", [name] : event.target.value})
    }

    const leftSide = () => {
        return(
            <div className="leftSide">
                <img src={logo}></img>
                 <ul>
                    <NavLink className="admin" exact to="/user/dashboard" activeStyle={{backgroundColor:"rgba(245, 245, 245,.15)"}} style={{ textDecoration: 'none' ,color :"white"}}><img src={admin} /><p>{user.firstname}{user.lastname}</p></NavLink>
                    <NavLink exact to="/profile" activeStyle={{backgroundColor:"rgba(245, 245, 245,.15)"}} style={{ textDecoration: 'none' ,color :"white"}}><li>Profile</li></NavLink>
                </ul>
            </div>
        )
    }

const rightSide = () => {
        return(
            <div className="rightSide">
                <div>
                    <h2>UPDATE PROFILE!</h2>
                </div>
                {successMessage()}
                {errorMessage()}
                <div className="div-update-profile">
                    <form className="input-profile">
                        <div className="fullname-profile">
                            <label className="label-first-profile" >First Name </label>
                            <br />
                            <input value={firstname} onChange={handlechange("firstname")} type="text" name=""  />
                        </div>
                        <br/>
                        <div>
                            <label className="label-last-profile">Last Name </label>
                            <br />
                            <input value={lastname} onChange={handlechange("lastname")}   className="input-last-profile" type="text" name="" />
                        </div>
                        <br />
                        <div className="email-profile">
                            <label>Email</label>
                            <br />
                            <input value={email} onChange={handlechange("email")}   type="text" name="" />
                        </div>
                        <br />
                        <div className="pass-profile">
                            <label>New Password</label>
                            <br />
                            <input onChange={handlechange("password")}  type="password"/>
                        </div>
                        <br />
                        <div>
                        <button  onClick={onSubmit} className="create-btn-profile" type="button">Update</button>
                        </div>
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

export default Profile