
//import './App.css'
import { useEffect, useState } from 'react'
import { login, logout } from './app/authSlice'
import { authserv } from './appwrite/authServ'
import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  const loadingState = () => {
    console.log("Loading session check")
    authserv.getUser()
    .then((userData) => {
      if(userData) {
        dispatch(login(userData))
        console.log("Session running")
      } else {dispatch(logout)}
    })
    .finally(() => {
      setLoading(false)
    })
  }

  useEffect(()=>{loadingState()}, [])

  return !loading? (
    <>
    <div className='bg-blue-300 h-screen'>
    <Header/>
      <div className='p-4'>
        <Outlet/>
      </div>
    
    <Footer/>
    </div>
    </>
  ) : null
}

export default App
