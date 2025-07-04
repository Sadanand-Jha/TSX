'use client'
import axios from "axios"
import React, { useState , useEffect} from "react"
import Link from "next/link";


export default function verifyEmail(){
    const [token, setToken] = useState("");
    const [error, setError] = useState(false)
    const [verified, setVerified] = useState(false);

    const verifyToken = async function (){
        try {
            await axios.post('/api/verifyemail', {token})
            setVerified(true);

        } catch (error: any) {
            console.log(error.response.data)
            setError(true);
        }
    }

    useEffect(() => {
        setToken(() => window.location.search.split('=')[1]);
        console.log(token)
    }, [])

    useEffect(() => {
       if(token && token.length > 0){
        verifyToken();
       }
    }, [token])

    return (
        <div>
            <h1 className="bg-orange-400 font-white font-bold ">Email Verification Page</h1>
            {
                verified && (
                    <div>
                        <div>Verification Completed Successfully!</div>
                        <Link href="/login">Login</Link>
                    </div>
                )
            }
            {
                error && (
                    <div>
                        <div>Verification Failed!</div>
                    </div>
                )
            }
        </div>
    )
}