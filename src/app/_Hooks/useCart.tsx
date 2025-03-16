'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { UserContext } from '../_Contexts/UserContext';
import { CartContext } from '../_Contexts/CartContext';
import { signOut, useSession } from 'next-auth/react';


export default function useCart() {
    const { headers } = useContext(UserContext)
    const { setMyCart, setisLoadingCartIcon } = useContext(CartContext)
    const Session = useSession()

    async function GetMyCart() {
        if (Session.status === 'authenticated' && headers !== null) {
            return axios.get("http://localhost:3001/Cart", { headers }).then((obj) => {
                setMyCart(obj?.data?.Cart)
                setisLoadingCartIcon(false)
                return obj
            }).catch((err) => {
                console.log(err);
                if (err.status === 401) {
                    localStorage.setItem("AuthLog", "The session has ended")
                    signOut({ callbackUrl: "/Login" })
                }

                throw err
            })
        } else {
            return { message: "login frist" }
        }

    }
    return useQuery({ queryKey: ['Cart'], queryFn: GetMyCart })
}
