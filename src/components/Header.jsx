import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux";
import {Button, Logout} from "./index";
import { useState, useEffect } from "react";




export default function Header () {
  
  const userData= useSelector((state)=>state.auth.userData)
  const authStatus = useSelector((state)=>state.auth.status)
  const [darkMode, setDarkMode] = useState(false)
  const [user,setUser] = useState("")

  //const navigate = useNavigate()
  const navitems = [ //Only for Navigating to Pages, hence no Logout
    {
      name : "Home",
      slug : "/",
      active : true
    },
    {
      name : "All Post",
      slug : "/allpost",
      active : authStatus
    },
    {
      name : "Add Post",
      slug : "/addpost",
      active : authStatus
    },
    {
      name : "Login",
      slug : "/login",
      active : !authStatus
    },
    {
      name : "Signup",
      slug : "/signup",
      active : !authStatus
    },
    
  ]
  useEffect(()=>{
    setUser(userData?.providerUid)

  },[authStatus])

  const toggleDark = () => {
    document.querySelector("html").classList.toggle("dark")
    setDarkMode(!darkMode)
  }

  return (
    <>
      <div className="relative md:flex-row flex-col flex p-2 items-center
      bg-indigo-300 
        dark:bg-gradient-to-br from-indigo-600 via-indigo-900 to-indigo-700
        ">
        {user && <div className=" md:absolute left-3 dark:text-yellow-100 text-red-700 font-mono font-bold dark:bg-indigo-950 bg-indigo-200 md:text-lg text:xs md:w-fit w-full text-center md:mb-0 mb-2 ">
          Welcome {user} !
        </div>}
        <div className="flex md:justify-center justify-between w-full">
          <nav className=" flex justify-evenly">
            {navitems.map(page => 
              page.active?
                
                <NavLink 
                  key={page.name}
                  to={page.slug} 
                  className={({isActive}) => `rounded-xl font-bold mx-3 ${isActive? "dark:bg-indigo-950 dark:text-indigo-100 bg-indigo-100 text-indigo-900" : "bg-transparent dark:text-white text-black"}`}>
                  <Button className='w-fit active:bg-blue-800'>
                  {page.name}
                  </Button>
                </NavLink> 
                
                :
                null
                
            )}
          </nav>
          <div className="md:absolute right-3 top-2">
            <div className="flex justify-center items-center">
              <a className=" cursor-pointer hover:translate-y-0.5 " href="https://github.com/Helezonic/react-blog-project" target="_blank">
                <img src="/github-mark.png" className="md:w-[35px] w-[20px] bg-white hover:shadow-lg rounded-full fill-black hover:bg-transparent" />
              </a>
              <button className="mx-2 p-2 w-50 rounded-full dark:bg-black bg-white dark:text-white text-black dark:hover:bg-violet-300 dark:hover:text-black hover:bg-violet-700 hover:text-white font-bold italic" 
              onClick={toggleDark}>{darkMode? "Light" : "Dark"}</button>
              <Logout/>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}