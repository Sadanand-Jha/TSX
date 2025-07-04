import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function getDataFromToken(request: NextRequest){
    try {

        const token = request.cookies.get('token')?.value || ''
        const tokenData:any = jwt.verify(token, process.env.JWT_STRING!)
        return tokenData.id

    } catch (error: any) {

        throw new Error(error.message);
        
    }
}