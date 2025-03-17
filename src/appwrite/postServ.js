import { Account, Client, Databases, ID, Storage, Query } from "appwrite";
import { conf } from "../conf/conf";

class PostService {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwrite_url).setProject(conf.appwrite_project)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, status, featuredImage, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwrite_database,
                conf.appwrite_collection,
                slug, //As unique ID
                {title, status, content, featuredImage, userId})
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwrite_database,
                conf.appwrite_collection,
                slug,
                {title, content, featuredImage, status})
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwrite_database,
                conf.appwrite_collection,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwrite_database,
                conf.appwrite_collection,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", slug)
            throw error;
        }
    }

    async getAllPosts(userId) {
        try {
            return await this.databases.listDocuments(
                conf.appwrite_database,
                conf.appwrite_collection,
                [
                    Query.equal("userId", userId)
                ]

            )
        } catch (error) {
            console.log("Appwrite service :: List Documents :: error", error)
        }
    }

    //FILE
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwrite_bucket,
                ID.unique(),
                file            
            )
        } catch (error) {
            console.log("Appwrite service :: Upload fail")
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                conf.appwrite_bucket,
                fileID
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: Delete fail")
            return false
        }
    }

    getFilePreview(fileID){
        try {
                return this.bucket.getFilePreview(
                conf.appwrite_bucket,
                fileID,
                0, 500
            )
        } catch (error) {
            console.log("Appwrite service :: Get File Preview fail")
        }
    }
}

const postServ = new PostService()
export default postServ