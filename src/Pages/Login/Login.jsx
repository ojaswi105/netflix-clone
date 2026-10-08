import React, { use, useState } from "react";
import "./Login.css";
import logo from '../../assets/logo.png'
import { login, signup } from "../../firebase";
import { useNavigate } from "react-router-dom";
import netflix_spinner from "../../assets/netflix_spinner.gif"

function Login(){

   const[signState,setSignState]=useState('Sign In')

   const[name,setName]=useState("")
   const[email,setEmail]=useState("")
   const[password,setPassword]=useState("")
   const[loading,setLoading]=useState(false)

   const navigate=useNavigate()

   const user_auth=async(event)=>{
        setLoading(true)
          event.preventDefault()
          if(signState==="Sign In"){
            await login(email,password)
          }
          else{
            await signup(name,email,password)
          }
         setLoading(false)
   }

   return(

      loading?
      <div className="login-spinner"><img src={netflix_spinner} alt="" /></div>
      :

   <div className="login">
        <img src={logo} alt="" className="login-logo"/>
        <div className="login-form">
         <h1>{signState}</h1>
         <form action="">
            {signState==="Sign Up"? <input type="text" name="" id="" placeholder="your name" value={name} onChange={(e)=>{setName(e.target.value)}}/>:<></>}
           
            <input type="email" name="" id="" placeholder="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type="password" name="" id="" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            <button type="submit" onClick={user_auth}>{signState}</button>
            <div className="form-help">
               <div className="remember">
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Remember Me</label>
               </div>
               <p>Need Help?</p>
            </div>
         </form>
         <div className="form-switch">
            {signState==="Sign In"? <p>New to Netflix ? <span onClick={()=>{setSignState('Sign Up')}}>Sign Up Now</span></p>
            :  <p>Already have Account ? <span onClick={()=>{setSignState('Sign In')}}>Sign In</span></p>}
           
           
         </div>
        </div>
   </div>
   )
}

export default Login