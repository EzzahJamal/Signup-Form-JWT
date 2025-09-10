import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
import { useState } from 'react'

function Login() {
const [loginInfo, setloginInfo]= useState({
    email:'',
    password:''
  })

  const navigate = useNavigate();
  const handleChange =(e) =>{
    const {name, value} = e.target;
    console.log(name,value);
    const copyloginInfo={...loginInfo};

    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);

  }

const handleLogin = async (e)=>{
  e.preventDefault();
  const{ email , password} = loginInfo;
  if (!email ||!password){
    return handleError(' email and password are required');
  }
try{
  const url ="http://localhost:8000/auth/login";
  const response = await fetch(url,{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(loginInfo)
  });
  const result = await response.json();

  const {name, success, message, jwtToken, error }= result;
  if(success){
    
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('loggedInUser', name);
    handleSuccess(message);


    setTimeout(() => {
      navigate('/home')
      
    }, 500);
    
  }else if (error?.details?.message){
      handleError(error?.details?.message);
      } else{
        handleError(message || 'Login failed');
      }
console.log(result)
}catch(err){
  handleError(err);
}
  
}

  return (
    <div>
     <div className="container">
      <h1> Login </h1>
      <form onSubmit={handleLogin}>
      
        <div>
          <label htmlFor='email'>Email</label>
          <input 
          type="text"
          name="email"
          autoFocus
          placeholder='Enter your email'
          onChange={handleChange}
          value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input 
          type="password"
          name="password"
          autoFocus
          placeholder='Enter your password'
          onChange={handleChange}
          value={loginInfo.password}
          

          />
        </div>
        <button type="submit">Login</button>
        <span>Don't have account? </span>
        <Link to="/signup">Signup</Link>
      </form>

      <ToastContainer/>

      
    </div>
    </div>
  )
}

export default Login
