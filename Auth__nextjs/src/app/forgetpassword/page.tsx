'use client'
import React , {useEffect, useState} from "react";
import axios from "axios";
// import User from "@/models/userModels";
// import { useRouter } from "next/navigation";


export default function forgetPassword(){
    // const router = useRouter()

    const [username, setUsername] = useState("");
    const [displayMsg, setDisplayMsg] = useState("");
    const [success, setSuccess] = useState(false);


    const btnFn = async () => {
        try {
            if(!username) return;
            console.log(username);
            await axios.post('/api/forgetpassword', {username})
            setSuccess((prev) => true);
            console.log(success)
        } catch (error: any) {
            setDisplayMsg(error.response.data.error)
        }
    }
  


    useEffect(() => {
        setDisplayMsg("");
    }, [username])

    return (
        <div className="flex justify-center items-center h-lvh bg-black">
            <div className="username">
                
                <div className="text-center">
                    <label htmlFor="username" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Enter your Username</label>
                    <input type="text" id="username" placeholder="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    />

                    
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-4 hover:cursor-pointer"
                    onClick={btnFn }>
                        Submit
                    </button>
                    <div className="status text-white">
                        {displayMsg}
                    </div>
                </div>
            </div>
        </div>
    )
}