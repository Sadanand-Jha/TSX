// import { useParams } from "next/navigation";
'use client'
import { useRouter } from "next/navigation"
import axios from 'axios'
import { useState } from "react";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import('@/components/nossr'), { ssr: false })

export default function ProfilePage() {
    const router =  useRouter();
    const [data, setdata] = useState("");
    const logout = async () => {
        await axios.get('/api/logout')
        console.log("helloworld")
        router.push('/login')
    }

    const get_data = async() => {
        const response = await axios.get('/api/me')
        console.log('response',response);
        setdata(response.data.user.username);
    }    

    return (
        <div className="flex justify-center">
            <NoSSR />
            username: {data}
            <div>
                <button
                onClick={logout}
                className="bg-blue-600 text-white" style={{cursor: 'pointer'}}>Logout</button>
            </div>
            <hr />
            <div className="getdata">
                <button
                onClick={get_data}
                className="bg-orange-600 text-white" style={{cursor: 'pointer'}}>
                    Getdata
                </button>
            </div>
        </div>
    )
    
}