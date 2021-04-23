import React,{Profiler, useEffect} from "react";
import {Route,Switch,BrowserRouter} from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup"
import PrivateRoute from "./auth/helper/PrivateRoute"
import AdminRoute from "./auth/helper/AdminRoute"
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProduct from "./admin/ManageProduct"
import UpdateProduct from "./admin/UpdateProduct";
import ManageCategory from "./admin/ManageCategory";
import UpdateCategory from "./admin/UpdateCategory";
import Signin from "./user/Signin";
import "aos/dist/aos.css";
import AOS from "aos"
import Cart from "./core/Cart";
import Profile from "./user/Profile"
const Routes = ()=>{

    useEffect(() => {
        AOS.init({
          duration : 1500
        });
      }, []);

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/signup" component={Signup}></Route>
                <PrivateRoute exact path="/cart" component={Cart}></PrivateRoute>
                <PrivateRoute exact path="/profile" component={Profile}></PrivateRoute>
                <Route exact path="/signin" component={Signin}></Route>
                <PrivateRoute path="/user/dashboard" component={UserDashBoard}></PrivateRoute>
                <AdminRoute path="/admin/dashboard" component={AdminDashBoard}></AdminRoute>
                <AdminRoute path="/admin/create/category" component={AddCategory}></AdminRoute>
                <AdminRoute path="/admin/create/product" component={AddProduct}></AdminRoute>
                <AdminRoute path="/admin/products" component={ManageProduct}></AdminRoute>
                <AdminRoute exact path="/admin/product/update/:productId" component={UpdateProduct}></AdminRoute>
                <AdminRoute exact path="/admin/categorys" component={ManageCategory}></AdminRoute>
                <AdminRoute exact path="/admin/category/update/:categoryId" component={UpdateCategory}></AdminRoute>
            </Switch>
        </BrowserRouter>
    )
}


export default Routes;