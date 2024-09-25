import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import "./Contact.css"


export default function Contact() {
  return (
    <>
    
        <Navbar/>
        
        <section class="contact">
            <div class="container">
                <h1>Contact Us</h1>
                <p>If you have any questions, feel free to reach out to us by filling the form below or contacting us directly.</p>

                <div class="contact-form">
                    <form action="#" method="post">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="Your Name" required></input>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Your Email" required></input>
                        </div>
                        <div class="form-group">
                            <label for="subject">Subject</label>
                            <input type="text" id="subject" name="subject" placeholder="Subject" required></input>
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn">Send Message</button>
                    </form>
                </div>

                <div class="contact-info">
                    <h2>Contact Information</h2>
                    <p><strong>Address:</strong> Ali Dem,Tirane</p>
                    <p><strong>Phone:</strong> +355 69 22 07 104</p>
                    <p><strong>Email:</strong> info@clothingstore.com</p>
                </div>
            </div>
        </section>

        <Footer/>

    </>
  )
}
