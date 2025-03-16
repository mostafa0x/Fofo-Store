"use client";
import React, { createContext, useEffect, useState } from 'react'
import { TypesContexts } from "../_Interfaces/TypesContext"
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';



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
    const { data: session, status } = useSession()

    useEffect(() => {
        if (status !== 'loading') {
            setisUserLoading(false)
            if (!session) {
                toast.error("Login Frist !")
                localStorage.removeItem("UserToken")
                setUserToken(null)

                if (Path !== "/Login") {
                    Router.replace("/Login")
                }


            } else {
                if (session?.token) {
                    localStorage.setItem("UserToken", session.token)
                    setUserToken(session?.token)
                }

            }

        }


    }, [session])

    useEffect(() => {
        if (UserToken) {
            setheaders({ Authorization: UserToken })
        }
    }, [UserToken])


    return <UserContext.Provider value={{ UserToken, setUserToken, isUserLoading, setisUserLoading, headers, setheaders }}>{
        children
    }</UserContext.Provider>


}
