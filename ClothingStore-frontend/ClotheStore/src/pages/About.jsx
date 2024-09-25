import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from "../Components/Footer"
import './About.css'

export default function About() {
  return (
    <>
    
    <Navbar/>

    <section class="about">
      <div class="container">
        <h1>About Us</h1>
        <p>Welcome to ClothingStore, your number one source for all things fashion. We're dedicated to providing you the very best of clothing, with an emphasis on quality, affordability, and uniqueness.</p>

        <h2>Our Story</h2>
        <p>Founded in 2024, ClothingStore has come a long way from its beginnings. When we first started out, our passion for eco-friendly and sustainable clothing drove us to start our own business.</p>

        <h2>Our Mission</h2>
        <p>We aim to offer our customers a variety of the latest fashion trends. We’ve come a long way, so we know exactly which direction to take when supplying you with high quality yet budget-friendly products.</p>

        <div class="team">
          <h2>Meet Our Team</h2>
          <div class="team-member">
            <img src="images/team1.jpg" alt="Team Member 1"></img>
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div class="team-member">
            <img src="images/team2.jpg" alt="Team Member 2"></img>
            <h3>Jane Smith</h3>
            <p>Head of Design</p>
          </div>
          <div class="team-member">
            <img src="images/team3.jpg" alt="Team Member 3"></img>
            <h3>Mike Johnson</h3>
            <p>Marketing Manager</p>
          </div>
        </div>
      </div>
    </section>

    <Footer/>
    
  </>
  )
}
