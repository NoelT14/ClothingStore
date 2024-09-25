import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../Context/DataContext'
import { Link } from 'react-router-dom'
import "./Admin.css"
import logo from "../images/logo.png"
import { deleteProduct } from '../api/ProductService'
import fallbackImage from "../images/logo.png"
import AuthContext from '../Context/AuthContext'
import Footer from '../Components/Footer'
import Pagination from '../Components/Pagination'

export default function Admin() {

    const {products,fetchProducts,currentPage,postsPerPage,setCurrentPage} = useContext(DataContext)
    const [search,setSearch] = useState('')
    const {logOut,isLogged,userRole} = useContext(AuthContext)

    const indexOfLastProduct = currentPage * postsPerPage
    const indexOfFirstProduct = indexOfLastProduct - postsPerPage
    const currentProducts = products.slice(indexOfFirstProduct,indexOfLastProduct)

    const paginate = (pageNumber)=>{setCurrentPage(pageNumber)}
   


    const handleDelete = async(id)=>{
        try{
            await deleteProduct(id)
            fetchProducts()
        }
        catch(err){
            console.log(err.message)
        }
    }

    const handleLogout = async()=>{

        try {
          await logOut();
          
        } catch (err) {
          console.log("Logout failed:", err.message);
        }
    
      }

    

      return (
    
        <>
            <nav className="navbar">
            
                <div className="container">
                
                <div className="logo-container">
                    <img src={logo} className="brand-logo" alt="Logo" />
                    <span>ClothingStore</span>
                    
                </div>

                <div> 
                    <span className='user-role'>User Role : {userRole}</span>
                </div>
    
                <ul className="nav-links">
                    <li>
                    AdminShop
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
    
            <div className='page-container'>
            
            <div className='btn-search-container'>
                <button className='add-btn'><Link to={"/createProduct"}>+ Add product</Link></button>
        
                <div className='search-container'>
                    <input placeholder='Search product' onChange={(e)=>setSearch(e.target.value)}></input>
                </div>
            </div>   
            
    
               
                {(!products || products.length===0) ?  <div>No featured products available</div> : 
    
                <div className='product-list'>
                    {currentProducts.filter(item=>(search.toLowerCase()=== "" ? item : item.name.toLowerCase().includes(search)))
                    .map((product,index)=>(
                        <div  className='product-card' key={index}>
                       
                              <img src={product.imageUrl ? `http://localhost:8080/product-images/${product.imageUrl}` : fallbackImage} alt={product.name}/>
                              <h3>Product Name: {product.name}</h3>
                              <p>Product Price : ${product.price}</p>
                              <p>Product Wear Type: {product.wearType}</p>
                              <p>Description: {product.productDetails}</p>
    
                              <div className='crud-btn-div'>
                                <button><Link to={`/createProduct/${product.id}`}>Edit</Link></button>
                                <button onClick={()=>handleDelete(product.id)}>Delete</button>
                              </div>
       
                        </div>
                        
                    ))}
                </div>
                }

                <Pagination postsPerPage={postsPerPage}
                            totalPosts={products.length}
                            paginate={paginate}
                            currentPage={currentPage}
                ></Pagination>

            </div>
                <Footer></Footer>
    
        </>
      )

}
