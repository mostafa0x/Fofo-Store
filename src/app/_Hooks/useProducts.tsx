"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { ProductsContext } from '../_Contexts/ProductsContext';
import { UserContext } from '../_Contexts/UserContext';
import { MainContext } from '../_Contexts/MainContext';
import { signOut } from 'next-auth/react';

export default function useProducts() {
    const { setProducts } = useContext(ProductsContext);
    const { headers } = useContext(UserContext);


    function GetProducts() {
        return axios.get("http://localhost:3001/Products", { headers })
            .then((obj) => {
                setProducts(obj?.data?.Products);
                return obj;
            })
            .catch((err) => {
                console.log(err);
                if (err.status === 401) {
                    localStorage.setItem("AuthLog", "The session has ended")
                    signOut({ callbackUrl: "/Login" })
                }
                throw err;
            });
    };


    return useQuery({ queryKey: ["Products"], queryFn: GetProducts });
}
