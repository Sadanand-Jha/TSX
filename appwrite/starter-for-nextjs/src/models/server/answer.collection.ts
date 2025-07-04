import { Permission } from "node-appwrite";
import { answerCollection, db } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection(){
    await databases.createCollection(db, answerCollection, answerCollection, [
        Permission.create("users"),
        Permission.read("users"),
        Permission.delete("users"),
        Permission.update("users"),
        Permission.read("any")
    ])
    console.log("answer collection is created!")

    await Promise.all([
        databases.createStringAttribute(db, answerCollection, "content", 10000, true),
        databases.createStringAttribute(db, answerCollection, "questionId", 100, true),
        databases.createStringAttribute(db, answerCollection, "authorId", 100, true)
    ])

    console.log("Answer attribute created!")
}