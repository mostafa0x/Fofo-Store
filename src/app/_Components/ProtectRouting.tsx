"use client";
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { UserContext } from '../_Contexts/UserContext';






export default function ProtectRouting({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let { UserToken, setUserToken, setisLoading, setheaders } = useContext(UserContext)
    const Path = usePathname()
    const Router = useRouter()


    // useEffect(() => {
    //     console.log(Glerrors);

    //     if (session.status !== "loading") {
    //         if (Glerrors !== 401) {
    //             if (session.status === "unauthenticated") {
    //                 localStorage.removeItem("UserToken")
    //                 setUserToken(null)
    //                 if (Path !== "/Login") {
    //                     toast.error("You must login first !")
    //                     Router.replace("/Login")
    //                     setisLoading(false)
    //                 } else {
    //                     setisLoading(false)
    //                 }

    //             } else if (session.status === "authenticated") {
    //                 if (typeof session.data.token === 'string') {
    //                     localStorage.setItem("UserToken", session?.data?.token)
    //                     setheaders({ Authorization: session?.data?.token });
    //                     setUserToken(session?.data?.token)
    //                     if (Path !== "/Login") {
    //                         setisLoading(false)

    //                     } else {
    //                         Router.replace("/")
    //                         setisLoading(false)
    //                         toast.success("You have been logged in successfully")

    //                     }
    //                 } else {
    //                     signOut()
    //                 }

    //             }
    //         } else {
    //             if (Path !== "/Login") {
    //                 toast.error("You must login first !")
    //                 signOut({ callbackUrl: "/Login" })
    //             }
    //         }
    //     }

    // }, [session])

    return children
}
