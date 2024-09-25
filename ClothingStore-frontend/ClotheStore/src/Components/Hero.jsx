import React from 'react'
import { Link } from 'react-router-dom'


export default function Hero() {
  return (
    <section className="hero">
    <div className="hero-content">
      <h1>New Season, New Styles</h1>
      <p>Discover the latest trends in our new collection.</p>
      <Link to="/shop" className="active btn">Shop now</Link>
    </div>
  </section>
  )
}
