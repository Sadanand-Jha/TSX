'use client'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"

export default function SignUpPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
        username: ''
    })
    const [displayMsg, setDisplayMsg] = useState("");

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [loading, setLoading] = useState(false)

    const onSignin = async() => {
        try {
            setLoading(true)
            // console.log('meow')
            await axios.post("../api/signup", user);
            
            router.push('/login');
        } catch (error: any) {
            // console.log("error occured!",error?.message)
            console.log('printing', error.response.data.error)
            setDisplayMsg(error.response.data.error);

        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }
        else setButtonDisabled(true);
    }, [user])

    useEffect(() => {
        setDisplayMsg("");
    }, [user])

    return (
        <div className="h-lvh flex p-6">
            <div className="left w-2/5  p-5">
                <div className="content flex flex-col justify-center h-full">
                    <div className="heading font-bold text-5xl font-arial" >
                        Design with us to unlock your creativity
                    </div>
                    <div>
                        {loading? "Processing..." : ""}
                    </div>
                    <div>
                        {displayMsg}
                    </div>
                    <div className="h2 text-2xl text-gray-500 mt-5">
                        Access of thousands of design resources and templates
                    </div>
                    <div className="form ">
                        <div className="w-full">
                            <div className="flex ">
                                <input type="text" name="email" id="s_email" 
                                className="border-2 w-2/3 rounded-xl p-2  mt-5 px-4" 
                                placeholder="Email"
                                value={user.email}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                                />
                            </div>
                            <div className="flex ">
                                <input type="text" name="email" id="s_username" 
                                className="border-2 w-2/3 rounded-xl p-2  mt-5 px-4" 
                                placeholder="Username"
                                value={user.username}
                                onChange={(e) => setUser({...user, username: e.target.value})}
                                />
                            </div>
                            <div className="flex">
                                <input type="password" name="password" id="s_password"
                                value={user.password}
                                onChange={(e) => setUser({...user, password: e.target.value})}
                                className="border-2 w-2/3 rounded-xl p-2  mt-5 px-4" placeholder="Password"/>
                            </div>
                            <div className="flex">
                                <button type="submit" style={{cursor: 'pointer', backgroundColor: '#5E63FD', color: 'white' , fontWeight: 'bold', paddingBottom: '10px', paddingTop: '10px'}} className="mt-5 rounded-xl w-2/3 login_hover"
                                onClick={onSignin}>{buttonDisabled? "No SignIn": "SignIn"}</button>
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-500 mt-4">
                        By signing up, you agree to the <span className="underline font-semibold text-black">Terms of use</span> and <span className="underline font-semibold text-black">Privacy Policy</span>
                    </div>
                    <div className="login mt-10 w-2/3">
                        <div className="login_text text-gray-500 text-center mt-4">
                            Already have an account?
                        </div>
                        <div>
                            <Link href={"/login"}>
                                <div className="border-2 font-bold text-center p-2 rounded-2xl" style={{backgroundColor: "#ACB9FD", color: "white"}}>
                                    Login
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right w-3/5 h-full bg-white flex justify-center items-center">
                <div className="image">
                    <Image fetchPriority="high" src='/login_person.png' alt="image" width={500} height={500}></Image>
                </div>
            </div>
            
        </div>  
    )
}