import React, { useEffect, useState } from 'react'
import parse from "html-react-parser"
import { Link } from 'react-router-dom'
import postServ from '../appwrite/postServ'


function Postcard({...posts}) {
  return (
    <Link to={`/posts/${posts.$id}`}  >
        <img src={postServ.getFilePreview(posts.featuredImage)} className='max-w-[150px]'></img>
        <div className='absolute w-full bottom-0 left-0 h-1/2 translate-y-10 hover:-translate-y-0 duration-50 group'>
            <p className='uppercase font-medium text-center text-base bg-white overflow-ellipsis overflow-hidden whitespace-nowrap px-2 group-hover:whitespace-normal hover:overflow-visible duration-50'>{posts.title}</p>
            <p className='browser-css text-xs text-left bg-slate-800 text-yellow-200 overflow-ellipsis p-2 overflow-hidden h-full '>{parse(posts.content)}</p>
        </div>
    </Link>
  )
}

export default Postcard