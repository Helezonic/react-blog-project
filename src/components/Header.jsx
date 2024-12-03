import { NavLink } from "react-router-dom"
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
      <div className="relative bg-gradient-to-bl from-indigo-600 via-indigo-900 to-indigo-700 md:flex-row flex-col flex p-2 items-center  ">
        {user && <div className=" md:absolute left-3 text-yellow-100 font-mono font-bold bg-indigo-950 md:text-lg text:xs md:w-fit w-full text-center md:mb-0 mb-2 ">
          Welcome {user} !
        </div>}
        <div className="flex md:justify-center justify-between w-full">
          <nav className=" flex justify-evenly">
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
          <div className="md:absolute right-3 top-2">
            <Logout/>
          </div>
        </div>
      </div>

    </>
  )
}