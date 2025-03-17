import { useDispatch, useSelector } from "react-redux"
import {Button, Input, Select, RTE, LoaderAnimation} from "./index"
import {useForm} from "react-hook-form"
import postServ from "../appwrite/postServ"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useCallback } from "react"
import { load, notLoad, update } from "../app/documentSlice"


export default function PostForm ({oldpost}) {

    const {register, handleSubmit, watch, setValue, formState :{errors}, control, getValues} = useForm({
        defaultValues: {
            title: oldpost?.title || "",
            slug: oldpost?.$id || "",
            content: oldpost?.content || "",
            status: oldpost?.status || "active"
            /* userid? */
            /* featuredimage? */
        }
    })

    const {slug} = useParams()
    const userData = useSelector((state)=>(state.auth.userData))
    const navigate = useNavigate()
    /* const [isLoading,setLoading] = useState(false) */
    const isLoading = useSelector((state) => state.document.loading)
    const dispatch = useDispatch()

    /* FORM SUBMIT */
    const submit = async (data) => {
        console.log("Form Data -", data) //Will have title, slug, status, content, image.
        dispatch(load())
        try {
            //If an old post exists
            if(oldpost){ //Will have title, content, status, featuredImage, userId, $id(slug)
                let newPost = null

                console.log("Update post")
                console.log("Old slug - ", oldpost.$id, "New Slug - ", data.slug)

                //Upload file to get image link
                const file = data.image[0]? await postServ.uploadFile(data.image[0]) : null;
    
                //Delete older file if there is a new file upload
                if(file) {
                await postServ.deleteFile(oldpost.featuredImage)
                console.log("New file uploaded, old file deleted", file)
                }
    
                
                //If no title changes, slug remains same, hence direct content update.
                if(oldpost.$id === data.slug){
                    newPost = await postServ.updatePost(oldpost.$id,{
                        ...data,
                        featuredImage: file? file.$id : oldpost.featuredImage
                    })
                } 
                //If there is a title change, slug changes and hence document Id has to be deleted for new slug
                else {
                    newPost = await postServ.createPost({
                        ...data,
                        featuredImage: file? file.$id : oldpost.featuredImage ,
                        userId: userData.userId 
                    })
                    newPost? await postServ.deletePost(oldpost.$id) : "Slug Update Creation failed"
                }

                //Navigate
                if(newPost){
                    console.log("post edited and updated", newPost)
                    navigate(`/posts/${newPost.$id}`)
                }
            }


            //If its a new post
            else {
                console.log("Creating New Post")
                const file = data.image[0]? await postServ.uploadFile(data.image[0]) : null;
                if(file) console.log("File uploaded", file)
                const newPost = await postServ.createPost({...data, featuredImage: file? file.$id : null ,userId: userData.userId })
    
                if(newPost){
                    console.log("Post created", newPost)
                    navigate(`/posts/${newPost.$id}`)
                }
                else {
                    console.log("Post failed to create")
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(notLoad())
            dispatch(update()) // Everytime Post is added, updated, All Posts page should rerender.
        }
    }

    /* SLUG TRANSFORM */
    const slugTransform = useCallback((value) => {
        if(value && typeof(value)==='string'){
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, '-')
            .replace(/\s/g, "-")
        }
        else {
            return ""
        }
    },[])

    /* FORM SUBSCRIPTION */
    useEffect(()=>{
        if(oldpost) console.log("PostData recieved for editing in Postform")
        //Reduces rerenders while 'onChange'
        //subscription, watch, setValue, value, name, register are part of React Forms
        
        const subscription = watch((value,{name})=>{
            
            if(name === "title")
                setValue("slug", slugTransform(value.title), {shouldValidate: true})
        } )
        return () => {subscription.unsubscribe()}
    },[watch, slugTransform, setValue,slug])



    return !isLoading? (
        <>
        <form className="flex flex-col md:gap-2 gap-0 align-middle border-2 border-white rounded-xl p-2" onSubmit={handleSubmit(submit)}>
            
            <div>
            <Input
                label = "title*"
                type = "text"
                placeholder = "Enter Title"
                {...register("title", {
                    required : {
                        value : true,
                        message : 'Field incomplete. Please fill.'
                    }
                })}
            />
            {errors.title && <span className="text-red-500 bg-black font-bold p-1 md:font-sm font-xs">{errors.title.message}</span>}
            </div>

            <Input
                label = "slug"
                type = "text"
                {...register("slug", {
                    required : true
                })}
                readOnly
                onInput={(e) => {
                    setValue()
                }}
            />

            <Select
                label = "status"
                options = {["active","inactive"]}
                
                {...register("status", {
                    required: true
                })}
            />

            <RTE label="content*" name="content" control={control} defaultValue={getValues("content")} />

            <div>
                <Input 
                    label = "image*"
                    type = "file"
                    accept="image/png, image/jpg, image/gif"
                    postData= {oldpost? true:false}
                    {...register("image", {
                        required : {
                            value : !oldpost,
                            message : "This field is incomplete. Please choose a file"
                        }
                    })}
                />
                {errors.image && <span className="text-red-500 bg-black font-bold p-1  md:font-sm font-xs">{errors.image.message}</span>}
            </div>

            {/* If post, appear post image. */}
            {oldpost && 
            (
                <div className="mb-5">
                    <img src={postServ.getFilePreview(oldpost.featuredImage)} alt={oldpost.title} width="60%" className="mx-auto"/>
                </div>
            )}

            

            <Button type="submit" className="bg-green-300 mt-2">
                {oldpost? "Update" : "Submit"}
            </Button>
        </form>
        </>
    ) : (
        <LoaderAnimation/>
    )
}