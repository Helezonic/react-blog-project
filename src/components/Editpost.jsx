import PostForm from "./Postform";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postServ from "../appwrite/postServ";
import { useDispatch } from "react-redux";
import { loading, notloading } from "../app/loadSlice";


export default function Editpost () {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=> {
        if (slug) {
            dispatch(loading())
            postServ.getPost(slug).then((post) => {
                if(post){
                    console.log("Post fetched details-", post)
                    setPost(post)
                    dispatch(notloading())
                }
            })
        } else
        navigate("/allpost")
    }, [slug])

    return post?(
        <>
            <Container title="EDIT POST">
                <PostForm post={post}/>
            </Container>
        </>
    ) : 
    
    <h1>Such post doesn't exist</h1>
}