import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from "../Components/Footer"
import "./Shop.css"
import { useContext } from 'react'
import DataContext from '../Context/DataContext'
import Cart from '../Components/Cart'
import { getProducts } from '../api/ProductService'
import { Link } from 'react-router-dom'
import fallbackImage from "../images/logo.png"
import Pagination from '../Components/Pagination'


export default function Shop() {

  const {products,setLoading,loading,
    toggleCart,showCart,handleAddToCart,addedToCart,currentPage,setCurrentPage,postsPerPage} = useContext(DataContext)
  const [sortedProducts,setSortedProducts] = useState([])
  const [sortOptions,setSortOptions] = useState("popularity")
  const [search,setSearch] = useState("")

  const indexOfLastProduct = currentPage * postsPerPage
  const indexOfFirstProduct = indexOfLastProduct - postsPerPage
  
  const currentProducts = products.slice(indexOfFirstProduct,indexOfLastProduct) 

  const paginate = (pageNumber)=>{setCurrentPage(pageNumber)}
 

  useEffect(()=>{

    sortProducts(sortOptions)
    
  },[products,sortOptions,currentPage])


  const sortProducts = (option)=>{
    const copiedProducts = [...products]

    switch(option){
      case "price-low-high":{
        copiedProducts.sort((a,b)=>a.price - b.price)
        break;
      }
      case "price-high-low":{
        copiedProducts.sort((a,b)=>b.price - a.price)
        break;
      }
      case "popularity" :{
        break;
      }
      default: break;
    }
    setSortedProducts(copiedProducts)
  }

  const handleSortChange = (e)=>{setSortOptions(e.target.value)}

  //fetch by category male female or accessory

  const fetchByCategory = async(e)=>{

    const category = e.target.value

      try {
          const response = await getProducts()
   
          let displayedProducts = response

          if(category==="men"){
            displayedProducts = response.filter(product=>(
                product.wearType==="men"
            ))
          }
          else if(e.target.value==="women"){
            displayedProducts = response.filter(product=>(
              product.wearType==="women"
          ))
          }
          else if(e.target.value==="accessories"){
            displayedProducts = response.filter(product=>(
              product.wearType==="accessories"
          ))
          }
          else{
            displayedProducts = response
          }
          
          setSortedProducts(displayedProducts)

    } catch (err) {
      console.error("Error fetching products:", err)
    } finally {
        setLoading(false)
    }
      
  }

  

  

  return (
    <>

     <Navbar toggleCart={toggleCart}/>

     <section className="shop">
    <div className="container">
      <h1>Shop All Products</h1>

      <div className="shop-options">
        <div className="filters">
          <button className="filter-btn" value={"all"} onClick={fetchByCategory}>All</button>
          <button className="filter-btn" value={"men"} onClick={fetchByCategory}>Men</button>
          <button className="filter-btn" value={"women"} onClick={fetchByCategory}>Women</button>
          <button className="filter-btn" value={"accessories"} onClick={fetchByCategory}>Accessories</button>
        </div>

        <div className='search-container'>
            <input placeholder='Search product' onChange={(e)=>setSearch(e.target.value)}></input>
        </div>

        <div className="sort">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortOptions} onChange={handleSortChange}>
            <option value="popularity">Popularity</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="product-list">
      {loading && <div>Loading...</div>}
      {(!products || products.length===0) ?  <div>No featured products available</div> : 
        
      currentProducts.filter(item=>(search.toLowerCase() === "" ? item : (item.name).toLowerCase().includes(search))) //filterin the search word in search bar
      .map((product,index)=>(
         <div  className='product-card' key={index}>
          <Link to={`/product/${product.id}`}>
              <div>
              <img src={product.imageUrl ? `http://localhost:8080/product-images/${product.imageUrl}` : fallbackImage} alt={product.name}/>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
          </Link>
            <button  className="btn" onClick={()=>handleAddToCart(product.id)}
                disabled={addedToCart[product.id]} > {addedToCart[product.id] ? 'Added to Cart' : 'Add to Cart'}</button>
          </div>
            ))
          }
        
      </div>

      <Pagination postsPerPage={postsPerPage}
                  totalPosts={sortedProducts.length}
                  paginate={paginate}
                  currentPage={currentPage}
      ></Pagination>

    </div>
  </section>

     {showCart && <Cart />}
    <Footer/>

  </>
  )
}
