'use client'
import Image from "next/image"
import Link from "next/link"
import './page.css'
import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"
// import { request } from "http"

export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false);

    const [displayMsg, setDisplayMsg] = useState("");


    const onLogin = async () => {
        try {
            setLoading(true);
            // console.log("this worked!")

            await axios.post('../api/login', user)

            router.push('/profile');
        } catch (error: any) {
            setDisplayMsg(error.response.data.error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        setDisplayMsg("");
    }, [user])

    useEffect(() => {
        if(user.username.length > 0 && user.password.length > 0) setButtonDisabled(false);
        else setButtonDisabled(true);
    }, [user]);


    return (
        <div className="h-lvh flex p-6" style={{backgroundColor: '#E0EFFF'}}>
            <div className="right w-3/5 h-full  flex justify-center items-center" style={{backgroundColor: '#E0EFFF'}}>
                <div className="image">
                    <Image fetchPriority="high" src='/login_image.jpg' alt="image" width={500} height={500}></Image>
                </div>
            </div>
            <div className="left w-2/5  p-5">
            
                <div className="content flex flex-col justify-center h-full">
                    <div className="heading font-bold text-5xl font-arial text-center" >
                        Login
                    </div>
                    <div>{loading? 'Processing':''}</div>
                    <div>{displayMsg}</div>

                    <div className="h2 text-2xl text-gray-500 mt-5">
                        {/* Access of thousands of design resources and templates */}
                    </div>
                    <div className="form flex justify-center">
                        <div className="w-full">
                            <div className="flex justify-center">
                            <input type="text" name="username" 
                            className="border-2 w-2/3 rounded-xl p-2  mt-5 px-4" 
                            placeholder="Username"
                            value={user.username}
                            onChange={(e) => setUser({...user, username: e.target.value})}
                            />
                            </div>
                            <div className="flex justify-center">
                                <input type="password" name="password" 
                                value={user.password}
                                onChange={(e) => setUser({...user, password: e.target.value})}
                                className="border-2 w-2/3 rounded-xl p-2  mt-5 px-4" placeholder="Password"/>
                            </div>
                            <div className="flex justify-center mt-4  p-2 ">
                                <Link href="/forgetpassword" className="w-2/7 text-blue-800 hover:bg-blue-500 hover:text-white text-center p-2 rounded-2xl">
                                    ForgetPassword
                                </Link>
                            </div>
                            
                            <div className="flex justify-center">
                                <button type="submit" style={{cursor: 'pointer', backgroundColor: '#6789A9', color: 'white' , fontWeight: 'bold', paddingBottom: '10px', paddingTop: '10px'}} className="mt-5 rounded-xl w-2/7 login_hover"
                                onClick={onLogin}>{buttonDisabled? "No Login":"Login"}</button>
                            </div>
                        </div>
                    </div>
                   
                    <div className="login mt-10 w-full">
                        <div className="login_text text-gray-500 mt-4 text-center">
                            Don't have an account?
                        </div>
                        <div className="flex justify-center w-full ">
                            <Link href={"/signup"} className="w-2/3">
                                <div className="text-center p-2 rounded-2xl w-full font-bold" style={{backgroundColor: '#96BBE1', color: 'white'}}>
                                    Sign up
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>            
        </div>  
    )
}