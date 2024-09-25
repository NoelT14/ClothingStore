import Home from "./pages/Home"
import {Route,Routes}from 'react-router-dom'
import Shop from "./pages/Shop"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Cart from "./Components/Cart"
import Product from "./pages/Product"
import { DataProvider } from "./Context/DataContext"
import Admin from "./pages/Admin"
import CreateProduct from "./Components/CreateProduct"
import AuthContext from "./Context/AuthContext"
import { useContext } from "react"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Failed from "./pages/Failed"


function App() {

  const {user} = useContext(AuthContext)

  return (
    <>
    
    <DataProvider>
    <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/" element={<Home/>} />
      <Route path="/shop" element={<Shop/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/product/:id" element={<Product/>}></Route>
      <Route path="/admin" element={<AdminElement user={user}><Admin/></AdminElement>}></Route>
      <Route path="/createProduct" element={<AdminElement user={user}><CreateProduct/></AdminElement>}></Route>
      <Route path="/createProduct/:id" element={<AdminElement user={user}><CreateProduct/></AdminElement>}></Route>

      <Route path="/*" element={<Failed></Failed>}></Route>

    </Routes>
    </DataProvider>
    </>
  )

  function UserElement({children,user}){
    if (user === undefined) {
      // Show loading state while user data is being fetched
      return <p>Loading...</p>;
    }
    
    if(user?.role==="ADMIN" || user?.role==="USER"){
  
      return (<>{children}</>)
      
    }
    else{
      return(<p>You do not have access to this page</p>)
    }
  }
  
  function AdminElement({children,user}){
    if (user === undefined) {
      // Show loading state while user data is being fetched
      return <p>Loading...</p>;
    }

    if(user?.role === "ADMIN"){
      return (<>{children}</>)
    }
    else{
      return(<p>You do not have access to this page</p>)
    }
  }

}

export default App
