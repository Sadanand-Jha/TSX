'use client'
import { useAuthStore } from "@/store/auth"
import { useRouter } from "next/navigation"
import { devNull } from "os"
import { useEffect } from "react"
import React from "react"

function Layout ({children}: {children: React.ReactNode}){
    const {session} = useAuthStore()
    const router = useRouter()
    useEffect(() => {
        if(session){
            router.push('/')
        }
    }, [router, session])

    if(session){
        return devNull
    }

    return (
        <>
            <div className="">{children}</div>
        </>
    )
}

export default Layout