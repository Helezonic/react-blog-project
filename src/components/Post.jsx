import { useEffect, useState } from "react";
import postServ from "../appwrite/postServ";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {Container, Button} from "./index.js";
import parse from "html-react-parser"
import { loading, notloading } from "../app/loadSlice.js";



export default function Post () {  
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const [imageSource, setImageSource] = useState()
    const dispatch = useDispatch()
    const userData = useSelector((state)=> state.auth.userData)

    //To check whether post author is same as session author
    const isAuthor = post && userData? post.$userId === userData.$id : false
    
    useEffect(()=> {
         /* The loadState changes reloads the Outlet and hence infinite loop of UseEffect occurs, hence trigger useEffect only in this condition */
            if (slug && post?.$id !== slug) {
                
                console.log("Slug",slug)
                dispatch(loading())
                postServ.getPost(slug).then((post) => {
                    if(post){
                        dispatch(notloading())
                        console.log("Post fetched details-", post)
                        setPost(post)
                        setImageSource(postServ.getFilePreview(post.featuredImage))
                    } else console.log ("Wrong slug")
                })
            } else
            navigate("/allpost")
    }, [slug])
    
     
    return  post?(
            <Container>
                <h2 className="my-2 w-fit mx-auto">VIEW POST</h2>
                
                <div className="w-full">
                    <img src={imageSource} alt={post.title}/>
                    <Link to={`/editpost/${post.$id}`}>
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
        ) : 
        (
            <h1>Such post doesn't exist</h1>
        )
    
}