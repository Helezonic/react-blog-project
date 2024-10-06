import { useSelector } from "react-redux"
import {Button, Container, Input, Select, RTE} from "./index"
import {useForm} from "react-hook-form"
import postServ from "../appwrite/postServ"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useCallback } from "react"



export default function PostForm ({post}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || ""
            /* userid? */
            /* featuredimage? */
        }
    })

    const {slug} = useParams()
    const userData = useSelector((state)=>(state.auth.userData))
    const navigate = useNavigate()

    const submit = async (data) => {
        console.log("Form Data -", data)
        //If an old post exists
        if(post){
            console.log("Edit post")
            //Upload file to get image link
            const file = data.image[0]? await postServ.uploadFile(data.image[0]) : null;

            //Delete older file if there is a new file upload
            if(file)
            await postServ.deleteFile(post.featuredImage)

            //Create a new post by uploading
            const newPost = await postServ.updatePost(post.$id,{...data,featuredImage: file? file.id : null})

            //Navigate
            if(newPost){
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
    }

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

    useEffect(()=>{
        if(post) console.log("Edit post - ", post)
        //Reduces rerenders while 'onChange'
        //subscription, watch, setValue, value, name, register are part of React Forms
        const subscription = watch((value,{name})=>{
            
            if(name === "title")
                setValue("slug", slugTransform(value.title), {shouldValidate: true})
        } )
        return () => {subscription.unsubscribe()}
    },[watch, slugTransform, setValue,slug])

    return (
        <>
        <form className="flex flex-col gap-2 align-middle border-2 border-white rounded-xl p-2" onSubmit={handleSubmit(submit)}>
            <Input
            label = "title"
            type = "text"
            placeholder = "Enter Title"
            {...register("title", {
                required : true
            })}
            />
            
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

            <RTE label="content" name="content" control={control} defaultValues={getValues("content")} />

            <Input 
            label = "image"
            type = "file"
            accept="image/png, image/jpg, image/gif"
            {...register("image", {
                required : !post
            })}
            />

            {/* If post, appear post image. */}
            {post && 
            (
                <div>
                    <img src={postServ.getFilePreview(post.featuredImage)} alt={post.title}/>
                </div>
            )}

            

            <Button type="submit" className="bg-green-300">
                Submit
            </Button>
        </form>
        </>
    )
}