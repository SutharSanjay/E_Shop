import React,{useState} from "react"
import {NavLink} from "react-router-dom"
import logo from "../logo1.png"
import {isAuthenticated} from "../auth/helper/index"
import Menu from "../core/Menu"
import admin from "../admin2.png"
import {createCategory} from "../admin/helper/adminapicall"


const AddCategory = () => {

    const [values,setValues] = useState({
        name:"",
        error:false,
        success:false
    })

    const {name,error,success} = values

    const{user : {_id,firstname,lastname},token} = isAuthenticated()

    const handlechange = name => event => {
        setValues({...values,error : false,[name]:event.target.value})
    } 


    const successMessage =()=>{
        return(
            <div style={{display: success ? "" : "none"}} className="success-category">
                <h5>Category Created Successfully</h5>
            </div>
        )
    }

    const errorMessage =()=>{
        return(
            <div style={{display: error ? "" : "none"}} className="error-category">
                <h5>{values.error}</h5>
            </div>
        )
    }

    const onSubmit = event =>  {
        event.preventDefault();
        setValues({...values,error:false,success:false})
        createCategory(_id,token,{name})
        .then(data=>{
            if(data.err){
                setValues({...values,error:data.err,success:false})
            }
            else{
                setValues({
                    ...values,
                    success:true,
                    name:""
                })

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
                    <h2>Create Category</h2>
                </div>
                    {successMessage()}
                    {errorMessage()}
                <div className="main_right">
                    <div className="center-category">
                        <form className="input-category">
                            <div className="category">
                                <label>Enter Category Name</label>
                                <br />
                                <input value={name} onChange={handlechange("name")} autoFocus required placeholder="eg.Summer" type="text" name="" />
                            </div>
                            <br />
                            <div>
                                <button onClick={onSubmit} className="create-btn-category" type="button">Create</button>
                            </div>
                        </form>
                    </div>
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

export default AddCategory