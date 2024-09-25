import React, { useContext, useEffect, useState } from 'react'
import fallbackImage from "../images/logo.png"
import DataContext from '../Context/DataContext'
import { Link } from 'react-router-dom'


export default function Featured() {


  const { products, loading, 
    addedToCart,handleAddToCart} = useContext(DataContext);
  
  

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!products || products.length === 0) {
    return <div>No featured products available.</div>;
  }

  

  return (
    <section className="featured-products">
        <div className="container">
        <h2>Featured Products</h2>
        <div className="product-grid">

            {products.slice(0,4).map((product,index)=>(
              
              <div key={index} className='product-card'>
                <Link to={`/product/${product.id}`}>
                <div >
                <img src={product.imageUrl ? `http://localhost:8080/product-images/${product.imageUrl}` : fallbackImage} alt={product.name}/>
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                </div>
                </Link>
                <button  className="btn" onClick={()=>handleAddToCart(product.id)}
                disabled={addedToCart[product.id]} > {addedToCart[product.id] ? 'Added to Cart' : 'Add to Cart'}</button>
              </div>
            ))}

        </div>
        </div>
    </section>
  )
}

