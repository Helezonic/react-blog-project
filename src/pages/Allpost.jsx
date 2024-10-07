import { useEffect, useState } from "react"
import postServ from "../appwrite/postServ"
import { useSelector } from "react-redux"
import { Container, LoaderAnimation, Postcard } from "../components"



export default function Allpost () {
    const [posts,setPosts] = useState([])
    const userId = useSelector((state) => state.auth.userId)
    const [isLoading,setLoading] = useState(false)

    useEffect(()=>{
        postServ.getAllPosts([]).then((postsData)=> {
            if(postsData) {
                setPosts(postsData.documents)
                console.log(postsData)
            }
        }).finally(()=>{setLoading(true)})
    },[userId])

    return isLoading?(
            <Container title="All posts" className="w-[1080px] h-fit">
                <div className="flex gap-2 flex-wrap">
                    { posts.length && posts.map((post) => (
                        <div key={post.$id} className="flex-grow min-w-[150px] relative h-[200px] rounded-xl border-y-0 m-1 bg-violet-400 drop-shadow-none overflow-hidden hover:brightness-125 hover:border-y-2 hover:-translate-y-1 hover:drop-shadow-[0px_5px_2px_rgba(0,0,0,0.7)] hover:border-yellow-200 duration-100 outline">
                            <Postcard {...post} />
                        </div>
                    ))}
                    { !posts.length && <div>No posts available</div>}
                </div>
            
            </Container>
    ) : (<LoaderAnimation/>)
}