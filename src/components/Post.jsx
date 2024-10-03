import { useEffect, useState } from "react";
import postServ from "../appwrite/postServ";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {Container, Button} from "./index.js";
import parse from "html-react-parser"



export default function Post () {  
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state)=> state.userData)

    //To check whether post author is same as session author
    const isAuthor = post && userData? post.$userId === userData.$id : false
    
    useEffect(()=> {
        if (slug) {
            console.log("Slug",slug)
            postServ.getPost(slug).then((post) => {
                if(post){
                    console.log("Post", post)
                    setPost(post)
                }
            })
        } else
        navigate("/allpost")
    }, [slug])
    

    return post?(
        
            <Container>
                <h2>Post Page</h2>
                
                <div className="w-full">
                    <img src={postServ.getFilePreview(post.featuredImage)} alt={post.title}/>
                    <Link>
                        <Button>Edit</Button>
                    </Link>
                    <Link>
                        <Button>Delete</Button>
                    </Link>
                </div>
                <div>
                    <h1>{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>

            </Container>
        
    ) : null

}