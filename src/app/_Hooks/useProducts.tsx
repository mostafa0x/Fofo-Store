"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { ProductsContext } from '../_Contexts/ProductsContext';
import { UserContext } from '../_Contexts/UserContext';
import { MainContext } from '../_Contexts/MainContext';
import { signOut } from 'next-auth/react';
import TypeProducts from '../_Interfaces/TypeProducts';
type Data = { data: { Products: TypeProducts[] } }

export default function useProducts() {
    const { setProducts } = useContext(ProductsContext);
    const { headers } = useContext(UserContext);


    async function GetProducts() {
        try {
            const Data: Data = await axios.get("http://localhost:3001/Products", { headers })

            setProducts(Data?.data?.Products);
            return Data
        } catch (err: any) {
            console.log(err);
            if (err.status === 401) {
                localStorage.setItem("AuthLog", "The session has ended")
                signOut({ callbackUrl: "/Login" })
            }
            throw err;
        }


    };


    return useQuery({ queryKey: ["Products"], queryFn: GetProducts });
}
