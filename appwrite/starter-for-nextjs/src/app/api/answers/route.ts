import { databases } from "@/lib/appwrite";
import { db, answerCollection } from "@/models/name";
import { users } from "@/models/server/config";
import { userPrefs } from "@/store/auth";
import { ID } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        const {authorId, answer, questionId} = await request.json();
        const response = await databases.createDocument(db, answerCollection, ID.unique(), {
            content: answer,
            authorId,
            questionId
        });

        //increment author reputation
        const prefs = await users.getPrefs<userPrefs>(authorId)
        await users.updatePrefs(authorId, {
            reputation: Number(prefs.reputation) + 1
        })   
        return NextResponse.json(response,{
            status: 200,
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 400,
            message: "Error in posting answer",
            error: error?.message
        })
    }
}

export async function GET(request: NextRequest){
    try {
        const {answerId} = await request.json()
        const answer = await databases.getDocument(db, answerCollection, answerId)
        console.log("the answer that is deleted is ", answer);
        const response = await databases.deleteDocument(db, answerCollection, answerId);

        // decrease the reputation
        const prefs = await users.getPrefs<userPrefs>(answer.authorId)
        await users.updatePrefs(answer.authorId, {
            reputation: Number(prefs.reputation) - 1
        })

        return NextResponse.json(response, {
            status: 200
        })

    } catch (error) {
        return NextResponse.json(error, {
            status: 400
        })
    }
}