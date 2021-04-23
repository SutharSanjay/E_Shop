import React,{useState,useEffect,forceUpdate} from "react";
import {Link,Redirect} from "react-router-dom"
import Logo from "../logo1.png"
import Menu from "./Menu"
import "./Base_style.css"
import ImageHelper from "../admin/helper/imagehelper";
import {addItemToCartHelper, loadCart, removeItemFromCart} from "./helper/carthelper"
import { isAuthenticated } from "../auth/helper";


const Cart = (
    {
        className = "sanjay",
        addTocart = false,
        removeFromCart=true,
        children
    }
)=>{

    const [products, setproducts] = useState([])
    const [count, setcount] = useState(0)

    const preload = ()=>{
        setproducts(loadCart())
    }

    useEffect(() => {
        preload()
    }, [])
    
  

    const additemTocart = (addTocart,product) =>{
        return(
            addTocart && (
                <span className="addtocart-btn"><Link style={{textDecoration:"none",color:"white"}}>Add To Cart</Link></span>
            )
        )
    }

    const removeitemFromcart = (removeFromCart,product) =>{
        return(
            removeFromCart && (
                <span onClick={()=>{removeItemFromCart(product._id); preload();getFinalAmount();getCount()}} className="removefromcart-btn"><Link style={{textDecoration:"none",color:"white"}}>Remove Item</Link></span>
            )
        )
    }

    const getFinalAmount = ()=>{
        let amount = 0
        products.map(p=>{
            amount = amount + p.price
        })
        return amount

    }
    const getCount = ()=>{
        return products.length
    }



    return(
        <div className="main-body">
            <div className="header">
                <span>
                    <img className="logo_image" src={Logo} alt="logo"/>
                </span>
                
                <Menu />
            </div>
            <h1 className="title_cart">Cart</h1>
            <div className="product-home-main">
                
                <div  className="product-home-main-2">
                        {products.map((product,index)=>{
                            return(
                            <div data-aos="zoom-in" key={index} className="card">
                            <ImageHelper product={product}/>
                            <span className="card-name">{product.name}</span>
                            <span className="card-price">Rs.{product.price}</span>
                            {additemTocart(addTocart,product)}
                            {removeitemFromcart(removeFromCart,product)}
                            </div>
                            )
                        
                        })}
                </div>
                <div className="cart-checkout">
                    <div>
                        <h1 style={{color:"white"}}>Subtotal ({getCount()}): ₹ {getFinalAmount()}</h1>
                        {isAuthenticated() ? (
                            <button>Buy Now</button>
                        ) : (
                            <Link to="/signin">
                                <button>Signin</button>
                            </Link>
                        )}
                    </div>
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


export default Cart
