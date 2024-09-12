import { useEffect, useState } from "react"
import { useSelector } from "react-redux"



export default function Home() {
  const authStatus = useSelector((state)=>state.status)
  const userData= useSelector((state)=>state.userData)
  const [user,setUser] = useState("user")

  useEffect(()=>{
    userData && setUser(userData?.providerUid)
    console.log("authstatus : ", authStatus)
  },[authStatus])
  
  return authStatus? (
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