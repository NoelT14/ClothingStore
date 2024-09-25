import React, { useContext, useEffect, useState } from 'react'
import "./Cart.css"
import DataContext from '../Context/DataContext'
import { deleteFromCart } from '../api/ProductService'

export default function Cart() {

  const {cartItems,setCartItems,setAddedToCart,toggleCart} = useContext(DataContext)
  const [total,setTotal] = useState(0)


  const incrementQuantity = (productId)=>{

    const updatedItems = cartItems.map(item=>(
        item.product.id === productId ? {...item,quantity:item.quantity+1} : item
    ))

    setCartItems(updatedItems)

  }
  const decrementQuantity = (productId)=>{
      
    const updatedItems = cartItems.map(item=>(
      item.product.id === productId&&item.quantity>1 ? {...item,quantity:item.quantity-1} : item
  ))

  setCartItems(updatedItems)

  }

  const handleDeleteFromCart = async(productId)=>{

    console.log(productId)

    try{
      const response = await deleteFromCart(productId)

      const updatedItems = cartItems.filter(item=> item.product.id !== productId)
      setCartItems(updatedItems)

      //update the state in button addTocart
      removeAddedToCart(productId)


    }
    catch(err){

      console.error("Error deleting product from cart:", err.response?.data?.message || err.message);
    }
  }

  const removeAddedToCart = (productId)=>{

    setAddedToCart((prevState) => ({...prevState,[productId]:false}));
  } 


  useEffect(()=>{

    const calculateTotal = ()=>{

      const newTotal = cartItems.reduce((acc,item)=>{
        return acc + (item.product.price * item.quantity)
      },0)

      setTotal(newTotal)
      
    }
    calculateTotal()


  },[cartItems])

 
  return (

    <div className="cart-panel">
    <h2>Your Cart</h2>
    <ul className="cart-items">
      {cartItems.map((item, index) => (
        <li className="cart-item" key={index}>
          <span className="product-name">{item.product.name}</span>
          <div className="quantity-controls">
            <span className="quantity">{item.quantity}</span>
            <button onClick={() => incrementQuantity(item.product.id)} className='plus'>+</button>
            <button onClick={() => decrementQuantity(item.product.id)} className='minus'>-</button>
            <button onClick={() => handleDeleteFromCart(item.product.id)}>Delete</button>
          </div>
          <span className="price">${item.product.price}</span>
        </li>
      ))}
    </ul>
    <div className="cart-summary">
      <p>Total: <span className="cart-total">${total}</span></p>
      <div className='btn-div'>
        <button className="checkout-btn">Checkout</button>
        <button className="checkout-btn" onClick={toggleCart}>Close</button>
      </div>
    </div>
  </div>

  )
}
