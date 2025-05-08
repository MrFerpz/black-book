"use client"
import React from "react"
import axios from "axios"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

export default function IndexRoute() {
    const router = useRouter();
    async function checkLoggedIn() {
        try {
            await axios.get("http://localhost:4000/api/authcheck");
            router.push("/home")
        } catch(err) {
            router.push("/login")
        }
    }

    useEffect(() => {
        checkLoggedIn()
    }, [])

    return (
        <div className="flex h-[100vh] justify-center align-center">
            <div/>
        </div>
    )
}