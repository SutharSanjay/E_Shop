import React,{useState} from "react"
import {NavLink , Redirect, useHistory, withRouter} from "react-router-dom"
import Menu from "../core/Menu"
import Logo from "../logo1.png"
import Flag from "../flag.png"
import "./Signin_style.css"
import { authenticate, isAuthenticated, signin } from "../auth/helper"
import Base from "../core/Base"

const Signin = ()=>{

    const [values, setvalues] = useState({
        email: "",
        password : "",
        error : "",
        loading: false,
        didRedirect : false
    })

    const {email,password,error,loading,didRedirect} = values
    const {user} = isAuthenticated()

    const handlechange = name => event =>{
        setvalues({...values,error:false,[name] : event.target.value})
    } 

    const loadingMessage =()=>{
        return(
            loading && <div style={{display:""}} className="success-main">
                <h5 style={{color:"white"}}>Loading!!</h5>
            </div>
        )
    }

    const errorMessage =()=>{
        return(
            <div style={{display: error ? "" : "none"}} className="error-main">
                <h5>{values.error}</h5>
            </div>
        )
    }

    const ProcessRedirect = ()=>{
        if(didRedirect){
            if(user && user.role===1){
                return <Redirect to="/admin/dashboard" />
                
            }
            else{
                return <Redirect to="/" />
            }
        }
        if(isAuthenticated()){
            return <Redirect exact path="/" />
        }
    }

    const onSubmit = event => {
        event.preventDefault();
        setvalues({...values,error:false,loading:true})
        signin({email,password})
        .then(data=>{
            if(data.error){
                setvalues({...values,error:data.error,loading:false})
            }
            else{
                 authenticate(data,()=>{
                     setvalues({...values,didRedirect:true})
                 })   
            }
        })
        .catch(console.log("Signin having Problem!!"))
        
    }

    return(
        <div>
            <div className="header">
                <span>
                    <img className="logo_image" src={Logo} alt="logo"/>
                </span>
                <div className="menu-div">
                    <Menu className="menu"/>
                </div>
            </div>
            <div className="main-content1">
                <h1 className="heading" >Hello</h1>
                <p>New to Shop? <NavLink exact to="/signup" style={{ color :"rgb(22, 167, 157)"}}>Create an account</NavLink></p>
                {loadingMessage()}
                {errorMessage()}
                {ProcessRedirect()}
                <div className="div-form">
                    <form className="input-group1">
                        <div className="email">
                            <label>Email</label>
                            <input value={email} onChange={handlechange("email")} type="text" name="" />
                        </div>
                        <br />
                        <div className="pass">
                            <label>Password</label>
                            <input value={password} onChange={handlechange("password")} type="password"/>
                        </div>
                        <br />
                        <button onClick={onSubmit} className="create-btn" type="button">Signin</button>
                    </form>
                </div>
            </div>
            <div className="sign-footer">
                <p>Copyright © 2020-2021 Shop Inc. All Rights Reserved</p>
                <img className="flag" alt="flag" src={Flag} />
            </div>
        </div>
       
    )
}


export default withRouter(Signin)