"use client";
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../_Contexts/UserContext';
import toast from 'react-hot-toast';
import { signOut, useSession } from "next-auth/react";





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

        if (session.status !== "loading") {
            console.log(session.status)
            if (session.status === "unauthenticated") {
                localStorage.removeItem("UserToken")
                setUserToken(null)
                toast.error("Login Frist !")
                Router.replace("/Login")
            } else if (session.status === "authenticated") {
                console.log("yyy");
                console.log(session.data.user);
                console.log(session.data.token);
                if (typeof session.data.token === 'string') {
                    localStorage.setItem("UserToken", session?.data?.token || "")
                    setUserToken(session?.data?.token)
                    setisLoading(false)
                } else {
                    signOut()
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
