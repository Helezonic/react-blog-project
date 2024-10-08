import { useNavigate, Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux";
import {Button, Logout} from "./index";
import { useState, useEffect } from "react";




export default function Header () {
  
  const userData= useSelector((state)=>state.auth.userData)
  const authStatus = useSelector((state)=>state.auth.status)
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

  return (
    <>
      <div className="bg-gradient-to-bl from-violet-600 via-indigo-900 to-violet-700 flex p-2 items-center">
        {user && <div className="absolute left-3 text-yellow-100 font-mono font-bold bg-black">
          {user}
        </div>}
        <nav className=" px-4 flex justify-evenly w-fit mx-auto">
          {navitems.map(page => 
            page.active?
              
              <NavLink 
                key={page.name}
                to={page.slug} 
                className={({isActive}) => `rounded-xl font-bold mx-3 ${isActive? "bg-indigo-950 text-indigo-100" : "bg-transparent text-white"}`}>
                <Button className='w-fit active:bg-blue-800'>
                {page.name}
                </Button>
              </NavLink> 
              
              :
              null
              
          )}
        </nav>
        <div className="absolute right-3">
        <Logout/>
        </div>
        
      </div>

    </>
  )
}