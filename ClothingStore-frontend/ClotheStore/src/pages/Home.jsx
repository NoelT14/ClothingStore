import React, { useContext } from 'react'
import "./Home.css"
import Navbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import Featured from "../Components/Featured"
import Footer from "../Components/Footer"
import Cart from '../Components/Cart'
import DataContext from '../Context/DataContext'

export default function Home() {
  
  const {toggleCart,showCart} = useContext(DataContext)

  return (
    <>
      <Navbar toggleCart={toggleCart}/>
      <Hero />
      <Featured />
      <Footer />
      {showCart && <Cart/>}
    </>
  );
}
