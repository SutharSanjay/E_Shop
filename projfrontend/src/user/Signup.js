import React,{useState} from "react"
import "./Signup_style.css"
import Logo from "../logo1.png"
import Flag from "../flag.png"
import Menu from "../core/Menu";
import { signup } from "../auth/helper";
import { Link } from "react-router-dom";


const Signup = ()=>{

    const [values, setvalues] = useState({
        firstname : "",
        lastname : "",
        email: "",
        password : "",
        error: "",
        success : false
    })

    const {firstname,lastname,email,password,error,success} = values

    const handlechange = name => event => {
        setvalues({...values,error : false,[name]:event.target.value})
    } 

    const onSubmit = event => {
        event.preventDefault();
        setvalues({...values,error:false})
        signup({firstname,lastname,email,password})
        .then(data => {
            if(data && data.error){
                setvalues({...values,error:data.error,success:false})
            }
            else {
                setvalues({
                    ...values,
                    firstname : "",
                    lastname : "",
                    email: "",
                    password : "",
                    error: "",
                    success : true
                    
                })
            }
        })
        .catch(console.log("Error In SignUp!"))
    }


    const successMessage =()=>{
        return(
            <div style={{display: success ? "" : "none"}} className="success-main">
                <h5 style={{color:"white"}}>Account is Created Successfully To Login <Link style={{textDecoration:"none",color:"rgb(155, 151, 151)"}} to="/signin">Click Here</Link></h5>
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
            <div className="title">
                <h1>Create an account</h1>
            </div>
            <div className="main-content">
                
                {successMessage()}
                {errorMessage()}
                <div className="div-form">
                    <form className="input-group">
                        <div className="fullname">
                            <label className="label-first" >First Name </label>
                            <label className="label-last">Last Name </label>
                            <br />
                            <input value={firstname} onChange={handlechange("firstname")} type="text" name=""  />
                            <input  value={lastname} onChange={handlechange("lastname")} className="input-last" type="text" name="" />
                        </div>
                        <br />
                        <br />
                        <div className="email">
                            <label>Email</label>
                            <input  value={email} onChange={handlechange("email")} type="text" name="" />
                        </div>
                        <br />
                        <div className="pass">
                            <label>Password</label>
                            <input  value={password} onChange={handlechange("password")} type="password"/>
                        </div>
                        <br />
                        <p>By <strong>Creating an account</strong>, you agree to our <strong>User Agreement</strong> and acknowledge reading our <strong>User Privacy</strong> Notice.</p>
                        <br />
                        <button onClick={onSubmit} className="create-btn" type="button">Create account</button>
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

export default Signup