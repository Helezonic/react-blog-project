import { useNavigate, Link } from "react-router-dom"
import { useSelector } from "react-redux";
import {Button, Logout} from "./index";





export default function Header () {
  const authStatus = useSelector((state)=>state.auth.status)
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
      <div className="bg-violet-800 flex p-2">
        <nav className=" px-4 flex justify-evenly w-fit mx-auto">
          {navitems.map(page => 
            page.active?
              
              <Link 
              key={page.name}
              to={page.slug} 
              className="font-bold mx-3 ">
              <Button className='text-white w-fit active:bg-blue-800'>
              {page.name}
              </Button>
              </Link> 
              
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