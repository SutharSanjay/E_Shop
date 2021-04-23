import React,{useState,useEffect} from "react";
import {Link,Redirect} from "react-router-dom"
import Logo from "../logo1.png"
import Flag from "../flag.png"
import Menu from "./Menu"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import "./Base_style.css"
import Signin from "../user/Signin";
import { getallproduct } from "../admin/helper/adminapicall";
import ImageHelper from "../admin/helper/imagehelper";



const ProductDetail = (
    {
        product=product
    }
)=>{

    const [products, setproducts] = useState([])
    const [redirect, setredirect] = useState(false)
    const [count, setcount] = useState(0)

    const doRedirect =(redirect)=>{
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const addtocart = (product) =>{
        addItemToCartHelper(product,()=> setredirect(true))
    }


    const additemTocart = (addTocart,product) =>{
        return(
            addTocart && (
                <span onClick={()=>{addtocart(product,count)}} className="addtocart-btn"><Link style={{textDecoration:"none",color:"white"}}>Add To Cart</Link></span>
            )
        )
    }
    const removeitemFromcart = removeFromCart =>{
        return(
            removeFromCart && (
                <span className="removefromcart-btn"><Link style={{textDecoration:"none",color:"white"}}>Remove Item</Link></span>
            )
        )
    }

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


    return(
        <div className="main-body">
            <div className="header">
                <span>
                    <img className="logo_image" src={Logo} alt="logo"/>
                </span>
                <span className="search">
                    <input className="search-bar" type="text" placeholder="Search Product" /> 
                    <FontAwesomeIcon className="search-icon" icon={faSearch} />   
                </span>
                <Menu />
            </div>
            <div className="product-detail">
                <div>
                    <div data-aos="zoom-in" className="card">
                            <ImageHelper product={product}/>
                    </div>   
                </div>
                <div>
                    <span className="card-name">{product.name}</span>
                    <span className="card-price">Rs.{product.price}</span>
                </div>
                
            </div>
            <footer class="footer-distributed">
 
		<div class="footer-left">
 
		        <h3>E<span>Shop</span></h3>
 
		        <p class="footer-company-name">Design By Sanjay Suthar</p>
		</div>
 
		<div class="footer-center">
 
                        <div>
                                <p><span>Parul University</span> Vadodara, India</p>
                        </div>
 
                        <div>
                                <p>8200142798</p>
                        </div>
 
                        <div>
                                <p><a href="mailto:support@company.com">sanjaysuthar786786@gmail.com</a></p>
                        </div>

		</div>
 
		<div class="footer-right">
 
		<p class="footer-company-about">
		<span>About this Platform</span>
                This is E-Commerce Website with admin control and payment method.
		</p>
 
		<div class="footer-icons">
 
		</div>
 
		</div>
 
		</footer>
        </div>
    )
}


export default ProductDetail
