'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { UserContext } from '../_Contexts/UserContext';
import { CartContext } from '../_Contexts/CartContext';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';


export default function useCart() {
    const Session = useSession()
    const { headers } = useContext(UserContext)
    const { setMyCart, setisLoadingCartIcon } = useContext(CartContext)
    const Path = usePathname()


    async function GetMyCart() {

        if (Session.status === 'authenticated') {
            return axios.get("http://localhost:3001/Cart", { headers }).then((obj) => {
                setMyCart(obj?.data?.Cart)
                setisLoadingCartIcon(false)
                return obj
            }).catch((err) => {
                console.log(err);
                if (err?.response?.status === 401) {
                    localStorage.setItem("AuthLog", "The session has ended")
                    if (Path !== "/Login") {
                        signOut({ callbackUrl: "/Login" })
                    }
                } else if (err?.response?.status === 400) {

                    // if (Session.status === 'unauthenticated') {
                    //     if (Path !== "/Login") {
                    //         if (Path === "/Cart") {
                    //             localStorage.setItem("AuthLog", "You must log in first !")
                    //             signOut({ callbackUrl: "/Login" })
                    //         }
                    //     }
                    // }
                }
                throw err
            })


        } else {
            return { message: "Login Frist" }
        }
    }
    return useQuery({ queryKey: ['Cart'], queryFn: GetMyCart })
}


// if (Session.status === 'authenticated' && headers !== null) {
//     return axios.get("http://localhost:3001/Cart", { headers }).then((obj) => {
//         setMyCart(obj?.data?.Cart)
//         setisLoadingCartIcon(false)
//         return obj
//     }).catch((err) => {
//         console.log(err);
//         if (err.status === 401) {
//             localStorage.setItem("AuthLog", "The session has ended")
//             signOut({ callbackUrl: "/Login" })
//         }

//         throw err
//     })
// } else {
//     return null
// }