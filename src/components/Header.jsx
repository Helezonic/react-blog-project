import { useNavigate, Link } from "react-router-dom"
import Container from "./Container"
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import {Button} from "./index";




export default function Header () {
  const authStatus = useSelector((state)=>state.status)
  //const navigate = useNavigate()
  const navitems = [
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
  return (
    <>
      <div className="border-2 bg-gray-300 ">
        <nav className="my-2 px-4 flex justify-evenly w-fit mx-auto">
          {navitems.map(page => 
            page.active?
              
              <Link 
              key={page.name}
              to={page.slug} 
              className="font-bold mx-3 ">
              <Button className='bg-cyan-300 w-fit'>
              {page.name}
              </Button>
              </Link> 
              
              :
              null
              
          )}
        </nav>
      </div>

    </>
  )
}