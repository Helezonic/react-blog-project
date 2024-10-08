
//import './App.css'
import { useEffect, useState } from 'react'
import { login, logout } from './app/authSlice'
import { authserv } from './appwrite/authServ'
import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoaderAnimation from './components/LoaderAnimation'

function App() {
  const [isLoading,setLoading] = useState(true)
  const dispatch = useDispatch()
  const loadState = useSelector((state) => state.load.status)

  /* LOADING STATE :  To check whether session is logged in or not */
  const loadingState = () => {
    console.log("Loading session check")
    console.log("STATE - ", loadState)
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

  return !isLoading? (
    <>
    
      <div className=' fixed w-full top-0 z-10 '>
        <Header/>
      </div>
      <div className='flex flex-col min-h-screen w-full bg-gradient-to-r from-violet-950 via-black to-violet-950 '>
        <div className='flex-grow py-24  '>
          {loadState? <LoaderAnimation/> : <Outlet/>  }
        </div>
        <div className='w-full'>
          <Footer/>
        </div>  
      </div>
    </>
  ) : <LoaderAnimation/>
}

export default App
