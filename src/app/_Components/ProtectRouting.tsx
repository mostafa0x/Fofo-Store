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


    return children
}
