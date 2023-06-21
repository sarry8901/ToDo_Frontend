import React from 'react'
import { Link,Navigate } from 'react-router-dom'
import { useState,useContext } from 'react'
import axios from 'axios'
import { server } from '../main'
import toast from 'react-hot-toast'
import { Context } from '../main'

const Register = () => {

    const [name,setName]= useState("")
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const {isAuthenticated,setIsAuthenticated,loading,setLoading}=  useContext(Context)
    

    const submitHandler=async(e)=>{
      e.preventDefault(); 
      setLoading(true);
      try {
        console.log(name,email,password);
       
      const {data}= await  axios.post(`${server}/users/register`,{
            name,email,password,
        },{
            headers:{
                "Content-Type":"application/json"
                
            },
            withCredentials:true,
        })
        
        toast.success( data.message);
        setIsAuthenticated(true)
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
        setIsAuthenticated(false)
        setLoading(false);
      }
     }

    if(isAuthenticated) return <Navigate to='/'  />

  return (
    <div className="login">
        <section>
            <form onSubmit={submitHandler} >
                <input 
                 value={name}
                 onChange={(e)=> setName(e.target.value)}
                 required
                type="text" placeholder='Name'/>
                
                <input
                 value={email}
                 onChange={(e)=> setEmail(e.target.value)}
                 type="email" 
                 required
                 placeholder='Email'/>
                
                <input
                 value={password}
                 onChange={(e)=> setPassword(e.target.value)}
                 type="password" 
                 required
                 placeholder='Password'/>

                <button disabled={loading} type='submit'>Sign Up</button>

                <Link to="/login">Login</Link>

            </form>
        </section>
    </div>
  )
}

export default Register