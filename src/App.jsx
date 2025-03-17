
import { useEffect, useState } from 'react'
import { login, logout } from './app/authSlice'
import { addPosts, clearDoc, load, notLoad } from "./app/documentSlice"
import { authserv } from './appwrite/authServ'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Footer, Header, LoaderAnimation } from './components/index.js'
import postServ from "./appwrite/postServ"


function App() {
  const isLoading = useSelector((state) => state.document.loading)
  const dispatch = useDispatch()
  const authStatus = useSelector((state)=>state.auth.status)
  const userData= useSelector((state)=>state.auth.userData)
  const userID = useSelector((state)=>state.auth.userData?.userId)
  const update = useSelector((state)=>state.document.updated)
  const [appRender,setAppRender] = useState(0)
  const [rerenders, setRerenders] = useState(0)
  const [isAppLoading,setAppLoading] = useState(false)


  
  //LOADING STATE :  To check whether session is logged in or not
  //GET CURRENT SESSION - FROM REDUX - NOT APPWRITE
  
    const sessionCheck = async () => {
      setAppLoading(true)
      setAppRender(value=>value+1)
      console.log("1. Loading session check", "App Render:", appRender)
      try {
        const userDataFetch = await authserv.getUser()
        if(userDataFetch) {
          dispatch(login(userDataFetch))
          console.log("1. APPWRITE: Session running", userDataFetch, "-AppRender:", appRender)
        } else {
          console.log("1. APPWRITE: No session running", "-AppRender:", appRender)
          dispatch(logout())
          dispatch(clearDoc())
        }
      } catch (error) {
        console.log("1. APPWRITE: No user sessions", "-AppRender:", appRender)
        dispatch(logout())
        dispatch(clearDoc())
      } finally {
        console.log("1. REDUX:Session user details- ",userData, "-AppRender:", appRender)
        console.log("1. REDUX:authstatus : ", authStatus, "-AppRender:", appRender)
        setAppLoading(false)
      }
  }

  useEffect(()=>{sessionCheck()},[])

  //GET ALL POSTS FROM APPWRITE
  useEffect(()=>{
    dispatch(load())
    console.log("2. REDUX:Session user details- ",userData, "-PostFetchRenderCount:", rerenders)
    console.log("2. REDUX:authstatus : ", authStatus, "-PostFetchRenderCount:", rerenders)
    console.log("2. REDUX:userId-", userID, "-PostFetchRenderCount:", rerenders)
    setRerenders(prev => prev+1)
    if(userID){
      
      postServ.getAllPosts(userID)
      .then((postsData)=> {
      if(postsData) {
        console.log("2. APPWRITE: ", postsData, "-PostFetchRenderCount:", rerenders)
        dispatch(addPosts(postsData.documents))
      }}
      ).finally(()=>dispatch(notLoad()))
    } else {
      dispatch(notLoad())
    }
  },[userID, update])


  return isAppLoading? (
    <div className='w-full h-screen flex justify-center items-center 
    dark:bg-gradient-to-r from-violet-950 via-black to-violet-950
    bg-blue-100'>
      <LoaderAnimation/>
    </div>
   ) : 
  (
    <>  
      <div className=' fixed w-full top-0 z-10 '>
        <Header/>
      </div>
      <div className='flex flex-col min-h-screen w-full 
      dark:bg-gradient-to-r from-violet-950 via-black to-violet-950 
      bg-indigo-100'>
        <div className='flex-grow py-24 md:mt-3 mt-10 transition-all duration-100'>
          {isLoading? <LoaderAnimation/> : <Outlet/>  }
        </div>
        <div className='w-full text-white mx-auto'>
          <p className='p-3'>AppRender - Sessioncheck {appRender} <br/> GetPostsRender {rerenders}</p>
          <Footer/>
        </div>  
      </div>
    </>
  ) 
}

export default App
