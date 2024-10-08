import { useEffect, useState } from "react"
import postServ from "../appwrite/postServ"
import { useSelector } from "react-redux"
import { Container, LoaderAnimation, Postcard } from "../components"
import MainText from "../components/MainText"



export default function Allpost () {
    const [posts,setPosts] = useState([])
    const userId = useSelector((state) => state.auth.userData.userId)
    const [isLoading,setLoading] = useState(false)
    
    useEffect(()=>{
        
        console.log("userId-", userId)
        postServ.getAllPosts({userId}).then((postsData)=> {
            if(postsData) {
                setPosts(postsData.documents)
                console.log(postsData)
            }
        }).finally(()=>{setLoading(true)})
    },[userId])


    return isLoading?(
            <Container title="All posts" className="w-5/6 h-fit">
                <div className="flex gap-3 flex-wrap">
                    { posts?.length && posts.map((post) => (
                        <div key={post?.$id} className="flex-grow max-w-[15%] relative h-[200px] rounded-xl border-y-0 m-1 bg-violet-400 drop-shadow-none overflow-hidden hover:brightness-125 hover:border-y-2 hover:-translate-y-1 hover:drop-shadow-[0px_5px_2px_rgba(0,0,0,0.7)] hover:border-yellow-200 duration-100 outline">
                            <Postcard {...post} />
                        </div>
                    ))}
                    { (posts?.length === 0) && <MainText> No posts available</MainText>}
                </div>
            
            </Container>
    ) : (<LoaderAnimation/>)
}