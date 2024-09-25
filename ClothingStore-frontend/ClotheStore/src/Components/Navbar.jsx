import React, { useEffect, useState } from 'react'
import logo from "../images/logo.png"
import {NavLink, useNavigate} from "react-router-dom"
import { useContext } from 'react'
import DataContext from '../Context/DataContext'
import { getCart } from '../api/ProductService'
import AuthContext from '../Context/AuthContext'


export default function Navbar({toggleCart}) {

    const {cartItems,setCartItems} = useContext(DataContext)
    const [cartQuantity,setCartQuantity] = useState(0)
    const {logOut,isLogged} = useContext(AuthContext)



   useEffect(()=>{

    const fetchCart = async()=>{

      try{

      const cartResponse = await getCart()
      setCartItems(cartResponse.data)
      
     }

     catch(err){
      console.log(err.message)
     }
    }
    fetchCart()
    
  },[setCartItems])

  useEffect(()=>{

      const newQuantity = cartItems.reduce((acc,item)=>{
        return (acc + item.quantity)    
      },0)  

      setCartQuantity(newQuantity)
  },[cartItems])



  const handleLogout = async()=>{

    try {
      await logOut();
      
    } catch (err) {
      console.log("Logout failed:", err.message);
    }

  }


  return (
    <header>
      <nav className="navbar">
        <div className="container">

          <div className="logo-container">
            <img src={logo} className="brand-logo" alt="Logo" />
            <span>ClothingStore</span>
          </div>

          <ul className="nav-links">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "aa active" : "aa"}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/shop" 
                className={({ isActive }) => isActive ? "aa active" : "aa"}
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? "aa active " : "aa"}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => isActive ? "aa active" : "aa"}
              >
                Contact
              </NavLink>
            </li>

            <li>
              <button 
                className="cart-btn"
                onClick={toggleCart}
              >
                Cart: {cartQuantity}
              </button>
           </li>

           <li>
            {isLogged ?( <button 
                className="cart-btn"
                onClick={handleLogout}
              >
                Logout
              </button> ): 
              (<button className="cart-btn"><NavLink to="/login">Login</NavLink></button> )
              }
     
           </li>
          </ul>
        </div>
      </nav>
    </header>
  )


}
