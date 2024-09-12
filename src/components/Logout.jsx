import { useDispatch, useSelector } from "react-redux"
import { authserv } from "../appwrite/authServ"
import { logout } from "../app/authSlice"
import { useNavigate } from "react-router-dom"



export default function Logout () {
    const authStatus = useSelector((state)=>state.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const logoutHandler = () => {
        authserv.logout().then(() => {
            dispatch(logout())
            console.log("Logged out" )
            navigate("/")
    })
    }
    return authStatus? (
        <>
         <button className='px-3 p-2 m-3 font-semibold w-1/4 mx-auto duration-200 hover:bg-blue-100 rounded-xl'
         onClick={logoutHandler}>Log Out</button>
        </>
    ) : null
}