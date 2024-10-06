import { useDispatch, useSelector } from "react-redux"
import { authserv } from "../appwrite/authServ"
import { logout } from "../app/authSlice"
import { useNavigate } from "react-router-dom"
import { loading, notloading } from "../app/loadSlice"
import { Button } from "./index.js"




export default function Logout () {
    const authStatus = useSelector((state)=>state.auth.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const logoutHandler = () => {
        dispatch(loading())
        authserv.logout().then(() => {
            dispatch(logout())
            dispatch(notloading())
            console.log("Logged out" )
            navigate("/")
    })
    }
    return authStatus? (
        <>
         <Button className='bg-red-500 text-white w-fit'
         onClick={logoutHandler}>Log Out</Button>
        </>
    ) : null
}