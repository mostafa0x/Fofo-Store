"use client";
import React, { createContext, useEffect, useState } from 'react'
import { TypesContexts } from "../_Interfaces/TypesContext"
import { signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Router } from 'next/router';

export const UserContext = createContext<TypesContexts>({
    UserToken: null,
    setUserToken: () => { },
    isUserLoading: true,
    setisUserLoading: () => { },
    headers: { Authorization: localStorage.getItem("UserToken") },
    setheaders: () => { }
});

export default function UserContextProvider({ children }: any) {
    const [UserToken, setUserToken] = useState<string | null>(null)
    const [isUserLoading, setisUserLoading] = useState(true)
    const [headers, setheaders] = useState({
        Authorization: localStorage.getItem("UserToken"),
    });
    const Path = usePathname();
    const Router = useRouter()

    useEffect(() => {
        if (!localStorage.getItem("UserToken")) {
            // if (Path !== "/Login") {
            //     signOut({ callbackUrl: "/Login" })
            // }
            setisUserLoading(false)

        } else if (localStorage.getItem("UserToken")) {
            if (Path === "/Login") {
                toast.success("Login Ok")
                Router.replace("/")
            }
            setUserToken(localStorage.getItem("UserToken"))
        }
    }, [])

    return <UserContext.Provider value={{ UserToken, setUserToken, isUserLoading, setisUserLoading, headers, setheaders }}>{
        children
    }</UserContext.Provider>


}
