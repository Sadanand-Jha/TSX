import { db } from "../name"
import createQuestionCollection from "./question.collection"

import { databases } from "./config"

export default async function getOrCreateDB(){
    try {
        await databases.get(db)
        console.log("database connected")


    } catch (error :any) {
        try {
            await databases.create(db, db)
            console.log("database created")
            await Promise.all([
                createQuestionCollection()
            ])
            console.log("Collection created")
            console.log("Database connected!")
        } catch (error) {
            console.log("error in creating databases")
        }
    }
    return databases
}