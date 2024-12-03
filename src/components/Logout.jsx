import { useDispatch, useSelector } from "react-redux"
import { authserv } from "../appwrite/authServ"
import { logout } from "../app/authSlice"
import { useNavigate } from "react-router-dom"
import { Button, LoaderAnimation } from "./index.js"
import { useState } from "react"

export default function Logout () {
    const authStatus = useSelector((state)=>state.auth.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading,setLoading] = useState(false)

    const logoutHandler = () => {
        setLoading(true)
        authserv.logout().then(() => {
            dispatch(logout())
            setLoading(false)
            console.log("Logged out" )
            navigate("/")
    })
    }
    return !isLoading? ( 
        authStatus && (
        <>
         <Button className='bg-red-500 text-white w-fit'
         onClick={logoutHandler}>Log Out</Button>
        </>
    ) 
) : (<LoaderAnimation/>)
}