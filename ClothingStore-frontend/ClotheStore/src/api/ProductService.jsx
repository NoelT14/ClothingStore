import axios from "axios"

const REST_API_CART = "http://localhost:8080/api/cart"
const REST_API_PRODUCT = "http://localhost:8080/api/products"


export const getCart = ()=>{return axios.get(REST_API_CART + "/getCart")}

export const addToCart = (productId)=> {return axios.post(REST_API_CART + `/add/${productId}`)}

export const deleteFromCart = (productId)=> {return axios.delete(REST_API_CART + `/delete/${productId}`)}


export const getProducts = ()=> {return axios.get(REST_API_PRODUCT)
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching products:", error);
        throw error;
    });}

export const createProduct = (product)=> {return axios.post(REST_API_PRODUCT,product,
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
)}



export const getProduct = (productId)=>{return axios.get(REST_API_PRODUCT + `/${productId}`)}

export const updateProduct = (productId, product) => {
    return axios.put(`${REST_API_PRODUCT}/${productId}`, product, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const deleteProduct = (productId)=>{return axios.delete(REST_API_PRODUCT + `/${productId}`,
     {
    withCredentials: true
  })}


