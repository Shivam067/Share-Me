import config from "../config/config";
import { Client, Databases, Storage, ID, Query } from "appwrite";

// here we are making service for databases and storage.

export class DatabaseService{
    client = new Client();
    database;
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID)
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, image, content, slug, status, userID}){
        try {
            return await this.database.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    userID,
                }
            );
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async updatePost(slug, {title, image, content, status}){
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    image,
                    content,
                    status,
                }
            )
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
            return true;
        } catch (error) {
            
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getAllPost(queries = [Query.equal("status", "active")]){
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries,
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getMyPost({userData}){
        const queries = [Query.equal("userID", userData.$id)]
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries,
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // storage services

    async uploadImage(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteImage(fileID){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketID,
                fileID,
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    getFilePreview(fileID){
        return this.bucket.getFilePreview(
            config.appwriteBucketID,
            fileID,
        )
    }
}

const databaseService = new DatabaseService();

export default databaseService;