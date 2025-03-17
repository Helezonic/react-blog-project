import {useSelector } from "react-redux"
import MainText from "../components/MainText"

export default function Home() {
  const authStatus = useSelector((state)=>state.auth.status)
  const userName = useSelector((state)=>state.auth.userData?.providerUid)
  const userID = useSelector((state)=>state.auth.userData?.userId)
  const totalDocuments = useSelector((state)=>state.document.documents?.length)

  
  return (
    (authStatus && userID)? (
    <>
      <div className="md:mt-5 mt-20 transition-all duration-100">
        <MainText>Welcome {userName}</MainText>
        <div className="w-fit mx-auto text-center dark:text-white text-black text-xl font-semibold py-5">
          <p>You have {totalDocuments} posts</p>
        </div>
      </div>
    </>
    ) : (
      <MainText>Login to View</MainText>
    )
  )
}