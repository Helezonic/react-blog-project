
//import './App.css'
import { useEffect, useState } from 'react'
import { login, logout } from './app/authSlice'
import { authserv } from './appwrite/authServ'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import LoaderAnimation from './components/LoaderAnimation'
import { Footer, Header } from './components/index.js'
import postServ from "./appwrite/postServ"
import { addPosts, clearDoc, load, notLoad } from "./app/documentSlice"

function App() {
  const [isAppLoading,setAppLoading] = useState(false)
  const isLoading = useSelector((state) => state.document.loading)
  const dispatch = useDispatch()
  const authStatus = useSelector((state)=>state.auth.status)
  const userData= useSelector((state)=>state.auth.userData)
  const userID = useSelector((state)=>state.auth.userData?.userId)
  const update = useSelector((state)=>state.document.updated)
  const [appRender,setAppRender] = useState(0)
  const [rerenders, setRerenders] = useState(0)

  //LOADING STATE :  To check whether session is logged in or not
  //GET CURRENT SESSION - FROM REDUX - NOT APPWRITE
  
    const sessionCheck = async () => {
      setAppLoading(true)
      setAppRender(value=>value+1)
      console.log("Loading session check")
      try {
        const userData = await authserv.getUser()
        if(userData) {
          dispatch(login(userData))
          console.log("Session running")
        } else {
          console.log("No session running")
          dispatch(logout())
          dispatch(clearDoc())
        }
      } catch (error) {
        console.log("No user sessions")
        dispatch(logout())
        dispatch(clearDoc())
      } finally {
        console.log("Session user details- ",userData)
        console.log("authstatus : ", authStatus)
        setAppLoading(false)
      }
  }

  useEffect(()=>{sessionCheck()},[])

  //GET ALL POSTS FROM APPWRITE
  useEffect(()=>{
    dispatch(load())
    setRerenders(prev => prev+1)
    if(userID){
      console.log("userId-", userID)
      postServ.getAllPosts(userID)
      .then((postsData)=> {
      if(postsData) {
        console.log(postsData)
        dispatch(addPosts(postsData.documents))
        setTotal(postsData.total)
      }})
      .catch(error => 
        console.log("Fetch Post Data Error")
      ).finally(()=>dispatch(notLoad()))
    } else {
      dispatch(notLoad())
    }
  },[userID, update])


  return isAppLoading? <LoaderAnimation/> : 
  (
    <>  
      <div className=' fixed w-full top-0 z-10 '>
        <Header/>
      </div>
      <div className='flex flex-col min-h-screen w-full bg-gradient-to-r from-violet-950 via-black to-violet-950 '>
        <div className='flex-grow py-24  '>
          {isLoading? <LoaderAnimation/> : <Outlet/>  }
        </div>
        <div className='w-full text-white mx-auto'>
          <p>AppRender - Sessioncheck {appRender} <br/> GetPostsRender {rerenders}</p>
          <Footer/>
        </div>  
      </div>
    </>
  ) 
}

export default App
