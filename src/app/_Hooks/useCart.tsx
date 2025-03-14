'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { UserContext } from '../_Contexts/UserContext';
import { CartContext } from '../_Contexts/CartContext';
import { MainContext } from '../_Contexts/MainContext';
import { Hi } from "../_Contexts/MainContext"


export default function useCart() {
    const { headers } = useContext(UserContext)
    const { setMyCart, setisLoadingCartIcon } = useContext(CartContext)

    async function GetMyCart() {
        return axios.get("http://localhost:3001/Cart", { headers }).then((obj) => {
            setMyCart(obj?.data?.Cart)
            setisLoadingCartIcon(false)
            return obj
        }).catch((err) => {
            console.log(err);
            throw err
        })
    }
    return useQuery({ queryKey: ['Cart'], queryFn: GetMyCart })
}
