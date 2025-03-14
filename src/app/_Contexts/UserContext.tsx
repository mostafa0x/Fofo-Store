"use client";
import React, { createContext, useEffect, useState } from 'react'
import { TypesContexts } from "../_Interfaces/TypesContext"

export const UserContext = createContext<TypesContexts>({
    UserToken: null,
    setUserToken: () => { },
    isLoading: true,
    setisLoading: () => { },
    headers: { Authorization: "" },
    setheaders: () => { }
});

export default function UserContextProvider({ children }: any) {
    const [UserToken, setUserToken] = useState<string | null>(null)
    const [isLoading, setisLoading] = useState(true)
    const [headers, setheaders] = useState({
        Authorization: UserToken,
    });


    return <UserContext.Provider value={{ UserToken, setUserToken, isLoading, setisLoading, headers, setheaders }}>{
        children
    }</UserContext.Provider>


}
