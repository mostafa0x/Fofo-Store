'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { UserContext } from '../_Contexts/UserContext';
import { CartContext } from '../_Contexts/CartContext';
import { AllFunContext } from '../_Contexts/AllFunContext';


export default function useCart() {
    const { headers } = useContext(UserContext)
    const { setMyCart, setisLoadingCartIcon } = useContext(CartContext)
    const { setMiddleware } = useContext(AllFunContext)

    async function GetMyCart() {
        return axios.get("http://localhost:3001/Cart", { headers }).then((obj) => {
            setMyCart(obj?.data?.Cart)
            setisLoadingCartIcon(false)
            setMiddleware("Auth+" + obj.status)
            return obj
        }).catch((err) => {
            console.log(err);
            setMiddleware("Auth+" + err.status)
            throw err
        })
    }
    return useQuery({ queryKey: ['Cart'], queryFn: GetMyCart })
}
