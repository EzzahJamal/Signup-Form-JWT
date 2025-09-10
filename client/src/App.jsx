import { useState } from 'react'
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css'

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const PrivateRoute = ({ element })=> {
  //   return isAuthenticated? element : <Navigate to='/login'/>
  // }

  const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('token');
    return token ? element : <Navigate to="/login" />;
  };

  return (
    <div> 
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element= {<Home />}/>} />
      </Routes>
    </div>
  )
}

export default App;
