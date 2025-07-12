'use client'
import React, { useEffect, useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";

export default function changePassword(){
    const router = useRouter();

    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const [password1, setpassword1] = useState("")
    const [password2, setpassword2] = useState("")
    const [passwordStatus, setPasswordStatus] = useState(false);
    const [displayMsg, setDisplayMsg] = useState("");
    const [username, setusername] = useState("")
    // const [extractToken, setExtractToken] = useState("");

    let token: String = "";
    
    const callRouter = async () => {
        
        try {
            console.log("this token", token);
            const response = await axios.post('/api/changepassword', {token})
            setusername((prev) => response.data.username)
            console.log(response.data.username, 'username')
            console.log(token)
            setVerified((prev) => true)
            setSuccess(true);
            // setTimeout(() => {
            //     router.push('/forgetpassword')
            // }, 5000);
        } catch (error: any) {
            setDisplayMsg(error.response.data?.error)
            setError(true);
        }
    }

    const saveFn = async() => {
            try {
                console.log(username, password1)
                const response = await axios.post('/api/savepassword', {username, password1})
                console.log(response)
                setDisplayMsg(displayMsg + "Success!")
                setTimeout(() => {
                    router.push('/login')
                }, 5000);
            } catch (error: any) {
                console.log('meow error')
            }
        }

    useEffect(() => {
        token = window.location.search.split('=')[1];
        console.log(token)
        callRouter()
    }, [token])


    useEffect(() => {
        if(password1 && password1 == password2 && password1.length > 5){
            setPasswordStatus(true);
        }
        else setPasswordStatus(false)
    }, [password1, password2])

    useEffect(() => {
        if(passwordStatus) {
            saveFn()
        }
    }, [passwordStatus])
    

    return (
        <div>
            <div className="header">
                Verifying your request!
                {verified && (
                    <div className="bg-green-500 text-white text-3xl">Verification Successful!</div>
                )}
                {error && (
                    <div className="bg-red-700 text-white text-2xl">
                        {displayMsg}
                    </div>
                )}
                { success && (
                        <div className="text-center">
                            <div>Enter new password</div>
                            <div>
                                <input type="password" placeholder="password" className="border-2"
                                value={password1} onChange={(e) => setpassword1(e.target.value)}/>
                            </div>
                            <div>Confirm Password</div>
                            <div>
                                <input type="password" placeholder="password" className="border-2"
                                value={password2} onChange={(e) => setpassword2(e.target.value)}/>
                            </div>
                        </div>
                    )}
            </div>

            <div>
                {displayMsg}
            </div>

        </div>
    )
}