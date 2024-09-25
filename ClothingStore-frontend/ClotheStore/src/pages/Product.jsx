
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../api/ProductService'
import Navbar from '../Components/Navbar'
import "./Product.css"
import DataContext from '../Context/DataContext'
import Footer from '../Components/Footer'
import Cart from '../Components/Cart'
import fallbackImage from "../images/logo.png"

export default function Product() {

    const {showCart,toggleCart} = useContext(DataContext)
    const {id} = useParams()
    const [product,setProduct] = useState({})

    useEffect(()=>{

        const fetchProduct = async()=>{

            try{

                const response = await getProduct(id)
                setProduct(response.data)

            }
            
            catch(err){
                console.log(err.message)
            }

        }
        fetchProduct()
    
    },[])
    

  return (
    <div >
      <Navbar toggleCart={toggleCart}/>
      
      <div className="product-page-container">
        <div className="product-details">
          <img src={product.imageUrl ? `http://localhost:8080/product-images/${product.imageUrl}` : fallbackImage} alt={product.name} />
          <p><strong>Product Name:</strong> {product.name}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Type:</strong> {(product.wearType || '').toUpperCase()}</p>
          <p><strong>Description:</strong> {product.productDetails}</p>
        </div>
      </div>
      {showCart && <Cart />}
      <Footer/>
    </div>
  )
}
