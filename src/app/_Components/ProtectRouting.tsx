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
    let { UserToken, setUserToken, setisLoading, setheaders } = useContext(UserContext)
    const Path = usePathname()
    const Router = useRouter()
    const session = useSession()

    useEffect(() => {

        if (session.status !== "loading") {
            if (session.status === "unauthenticated") {
                localStorage.removeItem("UserToken")
                setUserToken(null)
                if (Path !== "/Login") {
                    toast.error("Login Frist !")
                    Router.replace("/Login")
                    setisLoading(false)
                } else {
                    setisLoading(false)
                }

            } else if (session.status === "authenticated") {
                if (typeof session.data.token === 'string') {
                    localStorage.setItem("UserToken", session?.data?.token)
                    setheaders({ Authorization: session?.data?.token });
                    setUserToken(session?.data?.token)

                    if (Path !== "/Login") {
                        setisLoading(false)

                    } else {
                        Router.replace("/")

                    }
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
