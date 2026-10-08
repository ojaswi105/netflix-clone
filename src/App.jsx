 import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Player from './Pages/Player/Player'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer } from 'react-toastify'

function App() {
 
  const navigate=useNavigate()

  // useEffect(()=>{
  //           onAuthStateChanged(auth,
  //             async(user)=>{
  //                  if(user){
  //                   console.log("Logged In")
  //                   navigate('/')
  //                  }
  //                  else{
  //                   console.log("logged out")
  //                   navigate('/login')
  //                  }
  //             }
  //           )
  // },[])


  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
        const path = window.location.pathname   // the page the student actually opened

        if(user){
            console.log("Logged In")
            // only leave the login page; keep any other pasted URL (like /player/123)
            if(path === '/login') navigate('/')
        }
        else{
            console.log("logged out")
            // logged-out users must be on the login page
            if(path !== '/login') navigate('/login')
        }
    })

    return () => unsubscribe()
},[])

  return (
    <>
    <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
      </Routes>
    </>
  )
}

export default App