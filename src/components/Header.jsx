import React from 'react'
import { Link,Navigate } from 'react-router-dom'
import { useState,useContext } from 'react'
import axios from 'axios'
import { server } from '../main'
import toast from 'react-hot-toast'
import { Context } from '../main'

const Header = () => {
 
 const {isAuthenticated,setIsAuthenticated,loading ,setLoading}=  useContext(Context)

 const logoutHandler=async()=>{
  setLoading(true);
  try {
   
   
 await  axios.get(`${server}/users/logout`,{
       
        withCredentials:true,
    })
   
    toast.success( `Logged out successfully `);
    setIsAuthenticated(false)
    setLoading(false)
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
    setIsAuthenticated(true)
    setLoading(false)
  }
 }


  return <nav className="header">

    <div>
        <h2>ToDo App</h2>
    </div>
    <article>
        <Link to='/' >Home</Link>
        <Link to='/profile' >Profile</Link>
        {
          isAuthenticated? <button 
          disabled={loading}
          className='btn ' onClick={logoutHandler} >Logout</button>:<Link to='/login' >Login</Link>
        }
        
        
    </article>

  </nav>

}

export default Header