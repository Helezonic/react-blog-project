import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container, LoaderAnimation, Postcard } from "../components/index.js"
import MainText from "../components/MainText"
import { load, notLoad } from "../app/documentSlice"



export default function Allpost () {
    
    const posts = useSelector((state) => state.document.documents)
    const [active,setActive] = useState(0)
    const [inactive,setInactive] = useState(0)
    const [inactiveCheck, setInactiveCheck] = useState(false)
    /* const [isLoading, setIsLoading] = useState(true) */
    const isLoading = useSelector((state) => state.document.loading)
    const dispatch = useDispatch()
    
    useEffect(()=> {
        dispatch(load())
        let activeCount = 0;
        let inactiveCount = 0;
        posts?.forEach(post=> {
            if(post.status == 'active'){
                activeCount++
            } else {
                inactiveCount++
            }
            setActive(activeCount);
            setInactive(inactiveCount)
        })
        dispatch(notLoad())
    },[posts])

    return !isLoading?(
            <Container title="All posts" className="xl:w-[1025px] md:w-[685px] w-[340px] h-fit">
                <div className="bg-slate-700 rounded-md w-full flex xl:gap-3 gap-2 xl:flex-row flex-col p-2 my-2 text-white text-xs font-mono font-light">
                    <div className="flex bg-slate-800 p-3 xl:w-1/2 w-full justify-between">
                        <p>Total Posts: {posts.length}</p>
                        <p>Active : {active}</p>
                        <p>Inactive : {inactive}</p>
                    </div>
                    <div className="flex bg-slate-800 p-3 xl:w-1/2 w-full justify-between">
                        <div className="flex align-center xl:px-3 md:w-1/2 w-2/5 gap-2">
                            <label htmlFor="inactive" >Show Inactive Posts</label>
                            <input id="inactive" type="checkbox" checked={inactiveCheck} onChange={()=>setInactiveCheck(prev => !prev)}/>
                        </div>
                        <p className="text-right md:w-1/2 w-2/5">Sorted by Created time</p>
                    </div>
                </div>
                <div className="flex md:gap-3 gap-2 mt-1 flex-wrap justify-between md:justify-normal">
                    { posts?.length? ( posts.map((post) => (
                        (post.status == 'active' &&
                        <Postcard {...post} />
                        ) ||
                        (inactiveCheck? 
                            (post.status == 'inactive' &&
                            <Postcard {...post} className={`
                                 before:bg-gray-900/70  before:hover:bg-gray-900/20 before:absolute before:z-10  before:h-full before:w-full  before:transition-all before:pointer-events-none before:blur-md
                                 after:pointer-events-none after:text-center after:align-middle after:bg-gray-900/70 after:z-20 after:w-full after:h-fit after:top-1/4 after:mx-auto after:text-lg after:text-white after:font-medium after:content-["Inactive"] after:hover:top-[-30px] after:transition-all after:drop-shadow-md  after:absolute outline-gray-500`}/>
                            ) : null
                        )
                    ))) : ( <MainText> No posts available</MainText>)
                }
                
                </div>
            
            </Container>
    ) : (<LoaderAnimation/>)
}