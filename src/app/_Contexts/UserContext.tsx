"use client";
import React, { createContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import UserContextType from '../_Interfaces/Contexts/UserContextType';


export const UserContext = createContext<UserContextType>({
    UserToken: null,
    setUserToken: () => { },
    isUserLoading: true,
    setisUserLoading: () => { },
    headers: { Authorization: null },
    setheaders: () => { }
});

export default function UserContextProvider({ children }: any) {
    const [UserToken, setUserToken] = useState<string | null>(null)
    const [isUserLoading, setisUserLoading] = useState(true)
    const [headers, setheaders] = useState<{ Authorization: string | null }>({
        Authorization: null
    });
    const Path = usePathname();
    const Router = useRouter()
    const { data: session, status } = useSession()



    useEffect(() => {
        if (localStorage.getItem("AuthLog")) {

            toast.error(localStorage.getItem("AuthLog"))
            localStorage.removeItem("AuthLog")
            localStorage.removeItem("UserToken")
            setUserToken(null)
        }
    }, [])

    useEffect(() => {
        if (status !== 'loading') {
            setisUserLoading(false)
            if (!session) {
                if (Path === "/Login" && localStorage.getItem("UserToken")) {
                    toast.success("You have been logged Out successfully")
                }
                localStorage.removeItem("UserToken")
                setUserToken(null)

                if (Path === "/Cart") {
                    toast.error("You must log in first !")
                    Router.replace("/Login")

                }
            } else {
                if (session?.token) {
                    localStorage.setItem("UserToken", session.token)
                    setUserToken(session?.token)
                }
                if (Path === "/Login") {
                    toast.success("You have been logged in successfully")
                    Router.replace("/")
                }
            }
        }
    }, [session])

    useEffect(() => {
        setheaders({ Authorization: UserToken })
    }, [UserToken])


    return <UserContext.Provider value={{ UserToken, setUserToken, isUserLoading, setisUserLoading, headers, setheaders }}>{
        children
    }</UserContext.Provider>


}
