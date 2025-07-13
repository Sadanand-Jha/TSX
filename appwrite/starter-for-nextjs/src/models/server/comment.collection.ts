import { databases } from "./config";
import { commentCollection, db } from "../name";
import { Permission } from "node-appwrite";

export default async function createCommentCollection(){
    try {
        await databases.getCollection(db, commentCollection)
        console.log("commentCollection found!")
    } catch (error) {
        await databases.createCollection(db, commentCollection, commentCollection, [
            Permission.create("users"),
            Permission.read("users"),
            Permission.update("users"),
            Permission.delete("users"),
            Permission.read("any")
        ])
        console.log("Comment collection is created!")

        await Promise.all([
            databases.createStringAttribute(db, commentCollection, "content", 10000, true),
            databases.createStringAttribute(db, commentCollection, "typeId", 100, true),
            databases.createStringAttribute(db, commentCollection, "type", 100, true),
            databases.createStringAttribute(db, commentCollection, "authorId", 10000, true)
        ])

        console.log("comment attributes are created!")
    }
}