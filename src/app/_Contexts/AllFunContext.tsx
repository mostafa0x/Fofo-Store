'use client'
import React, { Children, createContext, use, useContext, useEffect, useMemo, useState } from 'react'
import { TypesContexts } from "../_Interfaces/TypesContext"
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { usePathname, useRouter } from 'next/navigation'


export const AllFunContext = createContext<TypesContexts>({
    Middleware: null, setMiddleware: () => { }, On: 0, setOn: () => { }
})


export default function AllFunContextProvider({ children }: any) {
    const [Middleware, setMiddleware] = useState("")
    const [On, setOn] = useState(0)
    const Session = useSession()
    const Router = useRouter()
    const Path = usePathname()


    useEffect(() => {
        const MiddlewareParams0 = Middleware?.split("+").splice(0)[0]
        const MiddlewareParams1 = parseInt(Middleware?.split("+").splice(1)[0])



        if (MiddlewareParams0 == "Auth") {
            if (On === 0) {
                console.log(MiddlewareParams1);
                console.log(Session.status);

                if (Session.status !== 'loading') {
                    setOn(1)
                    if (MiddlewareParams1 === 400 || MiddlewareParams1 === 401) {
                        setMiddleware("")
                        if (Path !== "/Login") {
                            toast.error("Must be Login !")
                            Router.replace("/Login")
                        }

                        setOn(0)
                    }
                    if (MiddlewareParams1 === 400 || MiddlewareParams1 === 401) {
                        setMiddleware("")
                        if (Path !== "/Login") {
                            toast.error("Must be Login !")
                            Router.replace("/Login")
                        }

                        setOn(0)
                    }
                }
            }
        }


    }, [Session, Middleware])


    return <AllFunContext.Provider value={{ Middleware, setMiddleware }}>{children}</AllFunContext.Provider>
}
