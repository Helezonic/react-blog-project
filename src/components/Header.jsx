import { useNavigate, Link } from "react-router-dom"
import { useSelector } from "react-redux";
import {Button, Logout} from "./index";





export default function Header () {
  const authStatus = useSelector((state)=>state.status)
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
  return (
    <>
      <div className="border-2 bg-gray-300 flex">
        <nav className=" px-4 flex justify-evenly w-fit mx-auto">
          {navitems.map(page => 
            page.active?
              
              <Link 
              key={page.name}
              to={page.slug} 
              className="font-bold mx-3 ">
              <Button className=' w-fit'>
              {page.name}
              </Button>
              </Link> 
              
              :
              null
              
          )}
        </nav>
        <Logout/>
      </div>

    </>
  )
}