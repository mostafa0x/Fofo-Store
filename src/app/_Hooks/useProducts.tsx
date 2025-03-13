"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useContext } from 'react'
import { ProductsContext } from '../_Contexts/ProductsContext';


export default function useProducts() {
    let { Products, setProducts } = useContext(ProductsContext);
    function GetProducts() {
        return axios.get("https://google-auth-project-xi.vercel.app/products")
    }

    let ResponeObj = useQuery({ queryKey: ["Products"], queryFn: GetProducts })

    return ResponeObj

}
