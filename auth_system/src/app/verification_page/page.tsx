'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useEmailStore } from '@/store/email_verification'
import { useRouter } from 'next/navigation'

function page() {
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)
  const [processing, setProcessing] = useState(true)

  const email = useEmailStore((state) => state.email)
  const route = useRouter();

  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(window.location.search.split("=")[1])

  }, [])
  
  
  
  useEffect(() => {
    verifyToken();
  }, [token])
  
  async function verifyToken(){
    try {
      console.log("the token is in the window.location.search is ",token)
      console.log("the email in verification is", email);
      await axios.post("/api/verifyToken", {email, token})
      setError(false)
      setVerified(true)
      setTimeout(() => {
        route.push("create_user")
      }, 2000);
    } catch (error) {
      console.log("error occured!", error)
      setError(true)
    }
    setProcessing(false)
  }
  
  return (
    <>
    this is the verification page
    {processing && (
      <div className='text-2xl bg-black text-white font-bold'>Processing!......</div>
    )}
    { error && (
      <div className='bg-red-800 text-white'>Verification Failed</div>
    )}
    { verified && (
      <div className='bg-green-600 text-white text-2xl'>Verification Successfully completed!</div>
    )}
    </>
  )
}

export default page