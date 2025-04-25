import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux";
import {Button, Logout} from "./index";
import { useState, useEffect } from "react";
import { Switch } from '@headlessui/react';

  
export default function Header () {
  
  const userData= useSelector((state)=>state.auth.userData)
  const authStatus = useSelector((state)=>state.auth.status)
  const [darkMode, setDarkMode] = useState(false)
  const [user,setUser] = useState("")
  const [enabled, setEnabled] = useState(false)

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
              <a className=" cursor-pointer " href="https://github.com/Helezonic/react-blog-project" target="_blank">
                <img src="/github.png" width="35px" className="md:scale-100 md:hover:scale-90 rounded-full dark:invert" />
              </a>
              <button className={`mx-2 relative flex transition duration-200 justify-around h-7 w-14 cursor-pointer rounded-full  p-1 ease-in-out focus:not-data-focus:outline-none ${darkMode? "bg-white" : "bg-black" }`}      
              onClick={toggleDark}>
                <svg class="fill-yellow-500 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
                  <path
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      fill-rule="evenodd" clip-rule="evenodd"></path>
                </svg>
                <span
                  aria-hidden="true"
                  className={`group size-5 translate-x-0 rounded-full shadow-lg ring-0 transition duration-200 ease-in-out ${darkMode? " bg-black" : "bg-white"}`}
                />
                <svg className="fill-violet-700 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
                
                </button>
              <Logout/>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}