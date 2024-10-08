import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import MainText from "./MainText"



export default function Home() {
  const authStatus = useSelector((state)=>state.auth.status)
  const userData= useSelector((state)=>state.auth.userData)
  const [user,setUser] = useState("user")

  useEffect(()=>{
    userData && setUser(userData?.providerUid)
    
    console.log("authstatus : ", authStatus)
    if(userData) console.log("Session user details- ",userData)
  },[authStatus])
  
  return authStatus? (
    <MainText>Welcome {user}</MainText>
  ) 
  : (
    <MainText>Login to View</MainText>
  )
}