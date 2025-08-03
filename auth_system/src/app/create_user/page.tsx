'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'


function page() {

    const route = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [error, setError] = useState("")

    async function checkform(){
        if(username.length < 3){
            setError("Username is very small!")
            return;
        }
        if(password != password2){
            setError("Passwords are different!")
            return;
        }
        if(password.length < 5){
            setError("Password is too small")
            return;
        }
        setError("")
        try {
            const response = await axios.post("/api/create_user", {username, password})
            console.log(response.data.error)
            console.log("this is the response, ", response)
            console.log("user created")
            route.push("/profile")
            
        } catch (error) {
            console.log("error occured in crateuser")
            console.log(error)

        }
        
    }


  return (
    <div>
        <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='username'
        />

        <Input 
        type='password'
        value = {password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder = "password"
        />


        <Input 
        type='password'
        value = {password2}
        onChange={(e) => setPassword2(e.target.value)}
        placeholder = "password"
        />

        <Button variant="outline" className="cursor-pointer" onClick={checkform}>
        Submit
      </Button>

      {error && (
        <div className='bg-red-700 text-white'>{error}</div>
      )}
        
    </div>
  )
}

export default page