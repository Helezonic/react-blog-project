
import parse from "html-react-parser"
import { Link } from 'react-router-dom'
import postServ from '../appwrite/postServ'


function Postcard({className,...post}) {
  return (
    <div key={post?.$id} className={`w-[150px] relative h-[200px] rounded-xl border-y-0 m-1 bg-violet-400 drop-shadow-none overflow-hidden hover: hover:rounded-sm hover:border-y-2 hover:-translate-y-1 hover:drop-shadow-[0px_5px_0px_rgba(0,50,50,0.7)] hover:border-violet-200 duration-100 outline-4 outline-gray-900 outline group ${className}`}>
      <Link to={`/posts/${post.$id}`}  >
          <div className='w-full h-3/4 group'>
              <img src={postServ.getFilePreview(post.featuredImage)} className="  overflow-hidden"/>
          </div>
          
          <div className='absolute w-full bottom-0 left-0 h-1/2 hover:-translate-y-0 duration-150 group drop-shadow-lg'>
              <p className='uppercase font-medium text-center text-base bg-white overflow-ellipsis overflow-hidden whitespace-nowrap px-2 group-hover:whitespace-normal hover:overflow-visible duration-100'>{post.title}</p>
              <p className='browser-css text-xs text-left bg-slate-800 text-yellow-200 overflow-ellipsis p-2 overflow-clip h-full '>{parse(post.content)}</p>
          </div>
      </Link>
    </div>
  )
}

export default Postcard