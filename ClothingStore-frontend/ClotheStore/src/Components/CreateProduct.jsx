import React, { useContext, useState,useEffect } from 'react'
import "./Create.css"
import { useNavigate, useParams } from 'react-router-dom'
import { createProduct, getProduct, updateProduct } from '../api/ProductService'
import DataContext from '../Context/DataContext'


export default function CreateProduct() {

    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [wearType,setWearType] = useState('')
    const [productDetails,setProductDetails] = useState('')
    const [image,setImage] = useState(null)
    const {fetchProducts} = useContext(DataContext)

    const navigate = useNavigate()
    const {id} = useParams()


    useEffect(()=>{

        if(id){
    
          getProduct(id).then(response=>{
            setName(response.data.name)
            setPrice(response.data.price)
            setWearType(response.data.wearType)
            setProductDetails(response.data.productDetails)
            
          }).catch(err=>console.log(err))
    
        }
    
      },[id])

    const handleSaveAndUpdate = async(e)=>{

        e.preventDefault()

        const product= {name,price,wearType,productDetails}

        const formData = new FormData()
        formData.append("image",image)
        formData.append("productJson",JSON.stringify(product))

        try {
            if (id) {
              await updateProduct(id, formData);
            } else {
              await createProduct(formData);
            }
            navigate("/admin");
            fetchProducts();
          } catch (err) {
            console.log(err.message);
          }

    }

    const handleImageChange = (e)=>{
        setImage(e.target.files[0])
    }

    function title(){

        if(id){
            return <h2>Edit Product</h2>
        }
        else{
            return <h2>Create Product</h2>
        }
    }

  return (

    <>
        <div className='container'>
            {title()}
            <div className='row'>
            <div>
            <div className='card-body'>
                <form onSubmit={handleSaveAndUpdate}>
                

                <div className='form-group mb-2'>
                    <label>Product Name:</label>
                    <input
                    type='text'
                    placeholder='Enter Product Name'
                    name='name'
                    value={name}
                    className='form-control'
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='form-group mb-2'>
                    <label>Price:</label>
                    <input
                    type='number'
                    placeholder='Enter Product Price'
                    name='price'
                    value={price}
                    className='form-control'
                    onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className='form-group mb-2'>
                    <label>Wear Type:</label>
                    <select id="sort" value={wearType} onChange={(e)=>setWearType(e.target.value)}>
                      <option value="popularity">men</option>
                      <option value="price-low-high">women</option>
                      <option value="price-high-low">accessories</option>
                  </select>
                </div>

                <div className='form-group mb-2'>
                    <label>Product Details:</label>
                    <textarea
                    placeholder='Enter Product Details'
                    name='productDetails'
                    value={productDetails}
                    className='form-control'
                    onChange={(e) => setProductDetails(e.target.value)}
                    />
                </div>

                <div className='form-group mb-2'>
                            <label>Upload Product Image:</label>
                            <input
                                type='file'
                                accept='image/*'
                                className='form-control'
                                onChange={handleImageChange}
                            />
                        </div>

                <button className='btn btn-success'>Submit</button>
                </form>
            </div>
            </div>
        </div>
        </div>


    </>

  )
}
