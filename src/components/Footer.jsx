import { useSelector } from "react-redux"


export default function Footer () {
  const authStatus = useSelector((state)=>state.status)
  return (
    <>
      <div className=" bg-blue-800 w-screen">
        <div className="w-1/2 mx-auto my-2 border-2 border-green-300">
          <p className="text-center">FOOTER</p>
          <p className="text-center">{authStatus}</p>
        </div>
        
      </div>
    </>
  )
}