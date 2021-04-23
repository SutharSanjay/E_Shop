import React,{Fragment} from "react"
import {NavLink,withRouter} from "react-router-dom"
import { isAuthenticated } from "../auth/helper"
import {signout} from "../auth/helper/index"


const Menu = ({history})=>{
    const currentTab = (history,path)=>{
        if(history.location.pathname === path){
            return({
                backgroundColor:"rgb(22, 167, 157)",
                padding: "9px 20px",
                border: "1px solid white",
                borderRadius: "5px",
                cursor:"not-allowed"
            })
        }
        else{
            return({
                color : "white"
            })
        }
    }
    return(
        <div className="menu">
            <ul>
                <li>
                    <NavLink exact to="/" activeStyle={currentTab(history,"/")} style={{ textDecoration: 'none' ,color :"white"}}>
                        Home
                    </NavLink>
                </li>
                {!isAuthenticated() && (
                    <Fragment>
                        <li>
                            <NavLink exact to="/signup" activeStyle={currentTab(history,"/signup")} style={{textDecoration: 'none' ,color :"white"}} >
                                Signup
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/signin"  activeStyle={currentTab(history,"/signin")} style={{ textDecoration: 'none' ,color :"white"}}>
                                Signin
                            </NavLink>
                        </li>
                </Fragment>
                )}
                
                {isAuthenticated() && isAuthenticated().user.role===1 && (
                    <Fragment>
                        <li >
                            <NavLink  to="/admin/dashboard" activeStyle={currentTab(history,"/admin/dashboard")} style={{ textDecoration: 'none' ,color :"white"}}>
                                DashBoard
                            </NavLink>
                        </li>
                        <li>
                        <span style={{color:"Red",cursor:"pointer"}} onClick={()=>{
                            signout(() => {
                                history.push("/")
                            })
                        }}>SignOut</span>
                        </li>
                    </Fragment>
                    
                )}
                {isAuthenticated() && isAuthenticated().user.role===0 && (
                    <Fragment>
                        <li >
                        <NavLink exact to="/user/dashboard" activeStyle={currentTab(history,"/")} style={{ textDecoration: 'none' ,color :"white"}}>
                            DashBoard
                        </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/cart" activeStyle={currentTab(history,"/cart")} style={{ textDecoration: 'none',color :"white" }}>
                                Cart
                            </NavLink>
                        </li>
                        <li>
                        <span style={{color:"Red",cursor:"pointer"}} onClick={()=>{
                            signout(() => {
                                history.push("/")
                            })
                        }}>SignOut</span>
                        </li>
                    </Fragment>
                )}

                        
            </ul>
        </div>
    )
}

export default withRouter(Menu)