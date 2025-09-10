import React, {useEffect, useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Home() {
  const [loggedInUser, setLoggedInUser]= useState('');
  const [products, setProducts]= useState([]);


  const navigate= useNavigate();

  useEffect(()=> {
    const user= (localStorage.getItem('loggedInUser'))
    setLoggedInUser(user);  // Handling name of user
  },[])

  const handleLogout = (e)=> {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');

    handleSuccess('User Loggedout')
    setTimeout(() => {
      navigate('/login')
      
    }, 500);
  }

  const fetchProducts = async () => {
    try{
      const url= "http://localhost:8000/products";
      
    const response= await fetch(url,{
      method:'GET',
      headers: {
    'Authorization': localStorage.getItem('token'),
    'Content-Type': 'application/json'
    }
    } );
    const result = await response.json();
    console.log(result);
    setProducts(result)


  } catch(err){
    handleError(err);
  }
}
useEffect(()=>{
  fetchProducts()
},[])




  return (
    <div>
      <h1>Welcome, {loggedInUser || 'Guest'}!</h1>

      <button onClick={handleLogout}>Logout</button>

      <div>
        {
          products && products?.map((item, index)=>(
            <ul key ={index}>
              <span> {item.name}  :  {item.price} </span>


            </ul>
          ))
        }
      </div>

      <ToastContainer/>


    </div>
  )
}

export default Home
