import { voteCollection, db } from "../name";
import { Permission } from "node-appwrite";
import { databases } from "./config";

export default async function createVoteCollection(){
    try {
        await databases.getCollection(db,voteCollection);
        console.log("vote collection found!")
    } catch (error) {
        await databases.createCollection(db, voteCollection, voteCollection, [
            Permission.create("users"),
            Permission.update("users"),
            Permission.read("users"),
            Permission.delete("users"),
            Permission.read("any")
        ])
        console.log("vote collection created!")

        await Promise.all([
            databases.createEnumAttribute(db, voteCollection, "type", ["question", "answer"], true),
            databases.createStringAttribute(db, voteCollection, "typeId", 50, true),
            databases.createEnumAttribute(db, voteCollection, "voteStatus", ["upvote", "downvote"], true),
            databases.createStringAttribute(db, voteCollection, "voteById", 100, true)
        ])

        console.log("vote promise updated!")
    }
}