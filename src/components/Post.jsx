import { useEffect, useState } from "react";
import postServ from "../appwrite/postServ";
import { useNavigate, useParams, Link } from "react-router-dom";
import {Container, Button, LoaderAnimation, AnimatedPage} from "./index.js";
import parse from "html-react-parser"
import Errorpage from "../pages/Errorpage.jsx";
import { update } from "../app/documentSlice.js";
import { useDispatch } from "react-redux";


export default function Post () {  
    const [post, setPost] = useState("")
    const {slug} = useParams()
    const navigate = useNavigate()
    const [imageSource, setImageSource] = useState()
    const [isLoading, setLoading] = useState(true)
    const dispatch = useDispatch()
    
    useEffect(()=> {
        setLoading(true)
        console.log("VIEW POST, Slug -",slug)
        postServ.getPost(slug).then((postData) => {
            if(postData){
                console.log("Post fetched details-", postData)
                setPost(postData)
                setImageSource(postServ.getFilePreview(postData.featuredImage))
            } else {
                throw new Error ("Falsy Data")
            }
        }).finally(()=>{
            setLoading(false)
        })
    }, [slug])
    
    const deletePost = () => {
        setLoading(true)
        postServ.deletePost(slug).then((status)=>{
            if (status){
                postServ.deleteFile(post.featuredImage)
            }
        }).finally(()=>{
            navigate('/allpost')
            setLoading(false)
            dispatch(update())
        })
    }
     
    return !isLoading? (
        post ? (
            <Container title="VIEW POST" className="xl:w-[1200px] md:w-[700px] w-5/6 ">
                    <div className="w-full md:flex gap-2 ">
                        <div className="md:w-3/5 w-3/4 my-2 md:my-0 mx-auto">
                            <img src={imageSource} alt={post.title} className="rounded-xl mx-auto xl:w-3/4"/>
                        </div>
                        
                        <div className="md:w-2/5 flex flex-col justify-between gap-2">
                            <div className="w-full flex flex-col rounded-xl bg-indigo-500 p-2 flex-grow ">
                            <AnimatedPage>
                                <div className="w-fit bg-white px-2 rounded-xl font-mono md:text-3xl sm:text-2xl text-xl uppercase sm:mb-2">{post.title}</div>
                            
                                <div className="browser-css w-full rounded-xl p-2 text-white">
                                    {parse(post.content)}
                                </div>
                                
                            </AnimatedPage>
                            </div>
                            <div className="w-full flex gap-2">
                                    <Link to={`/editpost/${post.$id}`} className="basis-1/2 " >
                                        <Button className="bg-gray-600 text-white hover:bg-gray-600 hover:text-black w-full">Edit</Button>
                                    </Link>
                                    <Link className="basis-1/2">
                                        <Button className="bg-red-500 text-white hover:bg-red-400 hover:text-black w-full" onClick={deletePost}>Delete</Button>
                                    </Link>
                            </div>
                              
                        </div>
                          
                    </div>
            </Container>
        )   :   ( <Errorpage/> )
    )   :   ( <LoaderAnimation/> )
}