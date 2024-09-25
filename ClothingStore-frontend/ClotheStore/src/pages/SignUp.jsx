import React, { useContext, useState } from 'react'
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom'
import Navbar from "../Components/Navbar"
import AuthContext from '../Context/AuthContext'



export default function SignUp() {

    const [name,setName] = useState("")
    const [email,setEmail]=useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password,setPassword]=useState("")
    const [error,setError] = useState("")

    const navigate = useNavigate()
    const {signUp} = useContext(AuthContext)

    const handleSignUp = (e)=>{
        e.preventDefault()

        signUp(email, password)
        .then(() => {
          navigate("/"); // Redirect to home or wherever you want after successful sign-up
        })
        .catch((err) => {
          setError("Failed to sign up. Please try again.");
          console.log("Error signing up: ", err.message);
        });
    }

  return (
    <div>
        <Navbar/>
    <div className="signup-container">
    <div className="signup-box">
        <h2>Sign Up</h2>
        <form  method="POST" onSubmit={handleSignUp}>
            {error && <p style={{"color":"red"}}>{error}</p>}
            <div className="input-box">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" required value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>

            <div className="input-box">
                <label htmlFor="email" >Email Address</label>
                <input type="email" id="email" name="email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="input-box">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>

            <div className="input-box">
                 <label htmlFor="confirm-password">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                required
                                value={confirmPassword}
                                onChange={(e) =>{ 
                                    
                                    setConfirmPassword(e.target.value)}
                                  }
                            />
            </div>
            <button type="submit" className="signup-btn">Create Account</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
</div>
</div>
  )
}
