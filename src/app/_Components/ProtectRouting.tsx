"use client";
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../_Contexts/UserContext';
import toast from 'react-hot-toast';
import { useSession } from "next-auth/react";




export default function ProtectRouting({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let { UserToken, setUserToken, setisLoading } = useContext(UserContext)
    const Path = usePathname()
    const Router = useRouter()
    const session = useSession()

    useEffect(() => {
        if (session) {
            if (session.status !== "loading") {
                if (session?.data?.token === undefined || session?.data?.token === null) {
                    localStorage.removeItem("UserToken")
                    setUserToken(null)
                    toast.error("Login Frist !")
                    Router.replace("/Login")
                } else {
                    localStorage.setItem("UserToken", session?.data?.token || "")
                    setUserToken(session?.data?.token)
                    setisLoading(false)
                }

            }
        }



    }, [session])

    return (
        <div>
            {children}
        </div>

    )
}
