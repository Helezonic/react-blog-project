import { useEffect, useState } from "react";
import postServ from "../appwrite/postServ";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {Container, Button} from "./index.js";
import parse from "html-react-parser"
import {LoaderAnimation, AnimatedPage } from "./index.js";


export default function Post () {  
    const [post, setPost] = useState("")
    const {slug} = useParams()
    const navigate = useNavigate()
    const [imageSource, setImageSource] = useState()
    const [isLoading, setLoading] = useState(false)
    const userData = useSelector((state)=> state.auth.userData)

    //To check whether post author is same as session author
    const isAuthor = post && userData? post.$userId === userData.$id : false
    
    useEffect(()=> {
        if (slug) {
            setLoading(true)
            console.log("Slug -",slug)
            postServ.getPost(slug).then((postData) => {
                if(postData){
                    console.log("Post fetched details-", postData)
                    setPost(postData)
                    setImageSource(postServ.getFilePreview(postData.featuredImage))
                } else console.log ("Wrong slug")
            }).finally(()=>{setLoading(false)})
            
        } else navigate("/allpost")
    }, [slug])
    
     
    return !isLoading? (
        post? (
            <Container title="VIEW POST" className="w-[1080px] ">
                    <div className="w-full flex gap-2">
                        <div className="w-3/5">
                            <img src={imageSource} alt={post.title} className="rounded-xl "/>
                        </div>
                        
                        <div className="w-2/5 flex flex-col justify-between gap-2">
                            <div className="w-full flex flex-col rounded-xl bg-violet-500 p-2 flex-grow ">
                            <AnimatedPage>
                                <div className="w-fit bg-violet-400 px-2 rounded-xl font-mono text-4xl uppercase mb-2">{post.title}</div>
                            
                                <div className="browser-css w-full bg-violet-600 rounded-xl p-2 basis-1">
                                    {parse(post.content)}
                                </div>
                                
                            </AnimatedPage>
                            </div>
                            <div className="w-full flex gap-2">
                                    <Link to={`/editpost/${post.$id}`} className="basis-1/2 " >
                                        <Button className="bg-gray-600 text-white hover:bg-gray-400 hover:text-black w-full">Edit</Button>
                                    </Link>
                                    <Link className="basis-1/2">
                                        <Button className="bg-red-500 text-white hover:bg-red-400 hover:text-black w-full">Delete</Button>
                                    </Link>
                            </div>
                        </div>
                          
                    </div>
            </Container>
        )   :   ( <h1>Such post doesn't exist</h1> )
    )   :   ( <LoaderAnimation/> )
}