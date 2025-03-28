import { useDispatch, useSelector } from "react-redux"
import { authserv } from "../appwrite/authServ"
import { logout } from "../app/authSlice"
import { useNavigate } from "react-router-dom"
import { Button, LoaderAnimation } from "./index.js"
import { load, notLoad } from "../app/documentSlice"

export default function Logout () {
    const authStatus = useSelector((state)=>state.auth.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(load())
        authserv.logout().then(() => {
            dispatch(logout())
            dispatch(notLoad())
            console.log("Logged out" )
            navigate("/")
    })
    }
    return authStatus && (
        <>
         <Button className='bg-red-500 text-white w-fit'
         onClick={logoutHandler}>Log Out</Button>
        </>
    ) 
}