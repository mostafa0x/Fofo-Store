"use client"
import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../_Contexts/UserContext';
import { useRouter } from 'next/navigation';
import { TypesContexts } from "../_Interfaces/TypesContext"
import toast from 'react-hot-toast';
import axios from "axios"
import { signIn, useSession } from "next-auth/react";
import { MainContext } from '../_Contexts/MainContext';



export default function Login() {

    let Router = useRouter();
    const Session = useSession();
    const { setUserToken, setisUserLoading, headers } = useContext(UserContext)
    const { TV, setTV } = useContext(MainContext)
    const Btn_Login = useRef<HTMLButtonElement>(null);

    function Log_in() {
        if (TV === 1) {
            if (Btn_Login.current) {
                Btn_Login.current.innerHTML = `
<div role="status">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
`
            }
            toast.dismiss()
            toast.loading("Waiting...")
            setTV(0)
            signIn("google")
        }
    }

    useEffect(() => {
        if (Session.status !== 'loading') {
            if (Session.status === 'authenticated') {
                if (!localStorage.getItem("UserToken")) {
                    toast.success("Login-OK");
                }
                Session?.data?.token && localStorage.setItem("UserToken", Session?.data?.token)
                setUserToken(Session?.data?.token)
                setisUserLoading(false)
                Router.replace("/")
            }
        }

    }, [Session])

    // async function GetMyCart() {
    //     axios.get("http://localhost:3001/Cart", { headers }).then((x) => {
    //         console.log(x);
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }


    useEffect(() => {
        if (Session?.status === "authenticated") {
            // Router.replace("/")
            // GetMyCart()
        } else if (Session?.status === "unauthenticated") {
            // setisLoading(false)

        }
    }, [Session])


    if (Session) {
        if (Session.status === "loading") {
            return <div className='flex justify-center items-center text-center pt-32' role="status">
                <svg aria-hidden="true" className="w-48 h-48 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        }

        if (Session.status === "unauthenticated") {
            return (
                <>
                    <h1 className='p-20 font-semibold text-4xl'>My Accounts</h1>
                    <div className="flex items-center justify-center">
                        <div className="min-h-1/4 bg-yellow-600 rounded-2xl flex flex-col justify-between">
                            <div className=" sm:mx-24 md:mx-34 lg:mx-56 mx-auto flex items-center space-y-2 py-16 font-semibold text-gray-500 flex-col gap-2">
                                <i className="fa-brands fa-google fa-bounce text-4xl text-white"></i>
                                <h1 className="text-white text-xl">Login By Google</h1>


                                <button ref={Btn_Login} onClick={() => Log_in()} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                        <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                                    </svg>
                                    Sign in with Google
                                </button>

                            </div>
                        </div>
                    </div >
                </>
            );

        }




    }


}

