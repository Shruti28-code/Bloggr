import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite"; //i have delete Account from here
import { Permission, Role, } from "appwrite";
export class Service {
    // you can give name to class as database service or storage service as well 
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const response = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId,
                },
                [
                    Permission.read(Role.any()),               // ✅ Allow anyone to read
                    Permission.write(Role.user(userId))        // ✅ Only owner can edit
                ]
            );
            return response; // ✅ This is the critical missing piece
        } catch (error) {
            console.log("Appwrite service:: createPost:: error", error);
            return null; // Also return null on error for safety
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service : updatePost:: error", error);

        }
    }
    async deletePost(slug) {
        try {
            // no need to return any thing just  delete the post
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;// return true if the post is deleted successfully you can handle it using frontend
        } catch (error) {
            console.log("appwrite service :: deletePost :: error", error);
            return false;
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

        }
        // how it will return the postwe will handle it in frontend part
        catch (error) {
            console.log("appwrite service :: getPost :: error", error);
            return false
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries

            )
        } catch (error) {
            console.log("appwrite service :: getPosts :: error", error);
            return false;
        }
    }
    //file upload service 
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error("uploadFile error:", error);
            return null;
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error ", error);
            return false;

        }
    }
    // async getFilePreview(fileId) {


    //     try {
    //         await this.bucket.getFilePreview(
    //             conf.appwriteBucketId,
    //             fileId
    //         )
    //     }
    //     catch (error) {
    //         console.log("Appwrite service :: deleteFile :: error ", error);
    //         return false;

    //     }
    // } // we hav'nt use async-await here beacuse the reponse of this method is too fast no need to use promise

    getFileView(fileId) {
        try {
            return this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            ); // ✅ return the URL string
        } catch (error) {
            console.log("Appwrite service :: getFilePreview :: error", error);
            return false;
        }
    }
}

const service = new Service();
export default service;

