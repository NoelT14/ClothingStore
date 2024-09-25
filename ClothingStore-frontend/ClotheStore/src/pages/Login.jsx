import React, { useContext, useState,useEffect } from 'react'
import "./SignUp.css"
import { Link, useNavigate} from 'react-router-dom'
import Navbar from "../Components/Navbar"
import AuthContext from '../Context/AuthContext'


export default function Login() {

    const [email,setEmail] = useState("")
    const [password ,setPassword] = useState("")
    const [error ,setError] = useState("")

    const {logIn,userRole} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogin = async(e)=>{

        e.preventDefault()
        setError("")

        try{
            await logIn(email,password)
            
        }
        catch(err){
           
            setError(err.message || "Invalid email or password. Please try again.")
        }
     }
        
        useEffect(() => {
            if (userRole === "USER") {
                navigate("/");
            } else if (userRole === "ADMIN") {
                navigate("/admin");
            }
        }, [userRole, navigate]);

  return (
    
    <div>
        <Navbar className="navbar-signup" />
    <div className="signup-container">
    <div className="signup-box">
        <h2>Log in</h2>
       
        <form  method="POST" onSubmit={handleLogin}>
            
            <div className="input-box">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="input-box">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required onChange={(e)=>setPassword(e.target.value)} />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="signup-btn">Login</button>

        </form>
        
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
    </div>
    </div>

  )
}
