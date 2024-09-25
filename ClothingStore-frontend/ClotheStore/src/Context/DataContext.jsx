import React, {  useEffect, useState } from 'react'
import { createContext } from 'react'
import { getProducts,getCart,addToCart } from '../api/ProductService'

const DataContext = createContext({})


export const DataProvider = ({children})=>{

    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(true)
    const [cartItems,setCartItems] = useState([])
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const [addToCartMsg, setAddToCartMsg] = useState('');
    const [currentPage,setCurrentPage] = useState(1)
    const [postsPerPage,setPostsPerPage] = useState(2)


  const handleAddToCart = async (productId) => {

    try {
      
      const response = await addToCart(productId);
      setAddToCartMsg(response.data.message);
      setAddedToCart((prevState) => ({...prevState,[productId]:true}));

      // Fetch cart data after adding the product
      const cartResponse = await getCart();
      setCartItems(cartResponse.data);


    } catch (err) {

      setAddToCartMsg('Failed to add product to cart');
      console.error(err.message);

    }
  };


    const toggleCart = () => {
        setShowCart((prevState) => !prevState);
        console.log("Cart visibility:", !showCart);
      };

    useEffect(()=>{
        
            fetchProducts();

    },[])

    async function fetchProducts() {
      try {
          const response = await getProducts()
          setProducts(response)
      } catch (err) {
          console.error("Error fetching products:", err)
      } finally {
          setLoading(false)
      }
  };


    return (
        <DataContext.Provider value={{
            products,loading,cartItems,setCartItems,
            showCart,setShowCart,toggleCart,addedToCart, setAddedToCart,handleAddToCart,setProducts,setLoading,fetchProducts,currentPage,setCurrentPage,postsPerPage
        }}>
            {children}
        </DataContext.Provider>
    )
    
}


export default DataContext