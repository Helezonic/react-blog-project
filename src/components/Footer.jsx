import { useState } from "react"

export default function Footer () {
const [className, setClassName] = useState(true)

  return (
    <>
      <div className={`${className && "fixed"} bottom-0 w-full md:flex flex-col p-2 items-center drop-shadow-[0px_-5px_0px_rgba(0,0,0,0.6)]
       bg-indigo-300 
       dark:bg-gradient-to-br from-indigo-600 via-indigo-900 to-indigo-700 
      text-indigo-900 
      dark:text-white`}>
        <div className="md:w-[540px] w-[360px] mx-auto ">
          <div className="flex items-center justify-center">
            <img src="/blog.png" className="md:w-[100px] w-[50px]"/>
            <div className="flex items-baseline">
              <h1 className="md:text-[40px] text-[25px] h-fit font-extralight ">MINI BLOG</h1>
              <h1 className="ps-3"> By <a href="https://github.com/Helezonic" target="_blank" className="hover:bg-black transition-all hover:p-2 rounded-md hover:italic hover:text-indigo-300 hover:font-semibold"><u>Helezon</u> </a></h1>
            </div>
            
          </div>
          <h1 className="w-full dark:bg-indigo-950 bg-indigo-200 text-xs text-center p-2 mx-auto">Made with React, 2024</h1>          
        </div>
        <div className="md:absolute relative mt-2 py-1 left-2 rounded-xl dark:bg-blue-950 p-3 bg-blue-50">
          <label htmlFor="fixed" className="">Toggle Fixed Footer</label>
          <input id="fixed" type="checkbox" checked={className} onChange={() => {setClassName(prev=>!prev)}} className="ms-2"/>
        </div>
        <div className="md:absolute relative mt-2 py-1 right-2 text-left rounded-xl dark:bg-blue-950 p-3 bg-blue-50">
          <h3>Sample Login Dataset</h3>
          <ul>
            <li>Email : shuaibaa@gmail.com</li>
            
            <li>Password : abcdefgh</li>
            <li></li>
          </ul>
        </div>
        <a href="https://www.coolseotools.com/website-visitor-counter" target="_blank" title="Web Counter">
        <img src="https://www.coolseotools.com/website-visitor-counter/count/&style=style1&show=p&num=5&uid=bib"  title="Web Counter" alt="AtoZSEOTools Web Counter" />
        </a>
      </div>
    </>
  )
}
