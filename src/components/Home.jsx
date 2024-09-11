import { useEffect, useState } from "react"
import { authserv } from "../appwrite/authServ"
import { useDispatch, useSelector } from "react-redux"
import { login,logout } from "../app/authSlice"


export default function Home() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  const authStatus = useSelector((state)=>state.status)
  const [user,setUser] = useState("")

  const loadingState = () => {
    console.log("Home session check")
    authserv.getUser()
    .then((userData) => {
      if(userData) {
        
        dispatch(login(userData))
        setUser(userData.providerUid)
        console.log("Session running", authStatus)
      }
      else {dispatch(logout)}
    })
    .finally(() => setLoading(false))
  }

  useEffect(()=>{loadingState()}, [])

  
  return (!loading && authStatus)? (
    <>
      <div className="font-semibold w-fit mx-auto text-xl">
      Welcome {user}
      </div>
    </>
  ) 
  : (
  <>
    <div className="font-semibold w-fit mx-auto text-xl">
      Login to view
    </div>
  </>
  )
}