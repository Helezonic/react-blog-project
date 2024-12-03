import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import postServ from "../appwrite/postServ";
import { Container, LoaderAnimation, PostForm } from "../components/index.js";
import { useDispatch, useSelector } from "react-redux";
import { load, notLoad } from "../app/documentSlice.js";


export default function Editpost () {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    /* const [isLoading,setLoading] = useState(false) */
    const isLoading = useSelector((state) => state.document.loading)
    const dispatch = useDispatch()



    useEffect(()=> {
        dispatch(load())
        postServ.getPost(slug).then((post) => {
            if(post){
                setPost(post)
            }
        })}, [])

    useEffect(()=>{
        dispatch(notLoad())
    },[post])




    return !isLoading? (
        post && (
        <>
            <Container title="EDIT POST" className="sm:w-[540px] mx-4 sm:mx-auto">
                <PostForm post={post}/>
            </Container>
        </>
    )
    ) : (
        <LoaderAnimation/>
    )
}