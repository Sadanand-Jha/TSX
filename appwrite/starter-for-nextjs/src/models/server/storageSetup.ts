import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage(){
    try {
        await storage.getBucket(questionAttachmentBucket)
        console.log("Storage connected!")
    } catch (error) {
        try {
            await storage.createBucket(questionAttachmentBucket, questionAttachmentBucket, [
                Permission.create("users"),
                Permission.delete("users"),
                Permission.read("users"),
                Permission.update("users"),
                Permission.read("any")
            ],
            false,
            undefined, 
            undefined,
            ['jpg', 'png', 'gif', 'jpeg', 'webp','heic']
        )

        } catch (error) {
            console.log("Error in creating storage", error)
        }
    }
}