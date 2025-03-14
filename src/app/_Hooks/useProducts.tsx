"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useContext } from 'react'
import { ProductsContext } from '../_Contexts/ProductsContext';
import { UserContext } from '../_Contexts/UserContext';


export default function useProducts() {
    let { Products, setProducts } = useContext(ProductsContext);
    let { headers } = useContext(UserContext)
    async function GetProducts() {
        try {
            const obj = await axios.get("http://localhost:3001/Products", { headers })
            await setProducts(obj?.data?.Products);
            return obj

        }
        catch (err) {
            console.log(err);

        }

    }

    let ResponeObj = useQuery({ queryKey: ["Products"], queryFn: GetProducts })

    return ResponeObj

}
