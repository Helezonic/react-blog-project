import { useState } from "react"

export default function Footer () {
const [className, setClassName] = useState(true)

  return (
    <>
      <div className={`${className && "fixed"} bottom-0  w-full bg-opacity-50 bg-gradient-to-br from-indigo-600 via-indigo-900 to-indigo-700 md:flex flex-col p-2 items-center drop-shadow-[0px_-5px_0px_rgba(0,0,0,0.6)]`}>
        <div className="md:w-[540px] w-[360px] mx-auto ">
          <div className="flex items-center justify-center">
            <img src="/blog.png" className="md:w-[100px] w-[50px]"/>
            <div className="flex items-baseline">
              <h1 className="md:text-[40px] text-[25px] h-fit font-extralight">MINI BLOG</h1>
              <h1 className="ps-3"> By <a href="https://github.com/Helezonic" target="_blank" className="hover:bg-black transition-all 100 hover:p-2 rounded-md hover:italic hover:text-indigo-300 hover:font-semibold"><u>Helezon</u> </a></h1>
            </div>
            
          </div>
          <h1 className="w-full bg-indigo-950 text-xs text-center p-2 mx-auto">Made with React, 2024</h1>          
        </div>
        <div className="md:absolute relative mt-2 py-1 left-2">
          <label htmlFor="fixed" className="">Toggle Fixed Footer</label>
          <input id="fixed" type="checkbox" checked={className} onChange={() => {setClassName(prev=>!prev)}} className="ms-2"/>
        </div>
      </div>
    </>
  )
}