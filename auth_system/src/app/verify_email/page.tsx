'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useEmailStore } from '@/store/email_verification';
import { useRouter } from 'next/navigation';
import { EmailVerify } from '@/models/emailVerifyModel';
import axios from 'axios';


function page() {
    const [btnText, setBtnText] = useState("Verify Your Email")
    const emailId = useEmailStore((state) => state.email)
    const route = useRouter();
    const [btnDisabled, setBtnDisabled] = useState(false);
    const emailStatus = useEmailStore((state) => state.emailStatus)
    const setEmailStatus = useEmailStore((state) => state.setEmailStatus)

    useEffect(() => {
      if(emailId === ""){
          route.push("/register")
      }
    }, [emailId])

    

    async function btnFn() {
        try {
          setBtnDisabled(true)
          // console.log("the button is clicked! and the emailid is ", emailId);
          const response = await axios.post('/api/verifyemail', {emailId})
          console.log(response);
          setBtnText("Email Sent!. Check your Email")
          setEmailStatus();
          setTimeout(() => {
            route.push("/register")
          }, 5000);
          console.log("Message Sent!")
        } catch (error: any) {
          console.log(error.message)
        }
    }
  return (
    <div>
        <div className="box h-lvh flex flex-col justify-end items-center" style={{backgroundColor: "#4F6EE5"}}>
            <div className='bg-white h-7/8 w-3/4 rounded-t-4xl shadow-black'>
                <div className="image flex justify-center pt-5">
                    <Image src='/verification_image.png' alt="image" width={300} height={300}></Image>
                </div>
                <div className='flex justify-center font-bold text-2xl'>Verify your Email Address</div>

                <div className='box text-center pt-10 font-mono'>
                    <div className=''>You have entered <span className='font-bold text-center text-xl font-sans' >{emailId}</span> as the Email address for your account.</div>
                    <div className='pt-3 font-mono'>Please verify your Email Address by clicking the button below.</div>
                    <button onClick={btnFn} style={{}
                    } disabled = {btnDisabled} className={` cursor-pointer mt-16 p-4 rounded-xl font-bold ${emailStatus ? 'bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition-all duration-300 ease-in-out text-sm sm:text-base': 'bg-[#4F6EE5] text-white'} font-mono`}>
                        {btnText}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page