import { useEffect } from "react";
import { notloading } from "../app/loadSlice";
import { Container } from "../components";
import PostForm from "../components/Postform";
import { useDispatch } from "react-redux";

export default function Addpost () {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(notloading())
        console.log("Add post")
    },[])
    
    return (
        <>
        <Container title="ADD POST">
            <PostForm/>
        </Container>
            
        </>
    )
}