"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { ProductsContext } from '../_Contexts/ProductsContext';
import { UserContext } from '../_Contexts/UserContext';
import { MainContext } from '../_Contexts/MainContext';
import { AllFunContext } from '../_Contexts/AllFunContext';

export default function useProducts() {
    const { setProducts } = useContext(ProductsContext);
    const { headers } = useContext(UserContext);
    const { setMiddleware } = useContext(AllFunContext)


    function GetProducts() {
        return axios.get("http://localhost:3001/Products", { headers })
            .then((obj) => {
                setProducts(obj?.data?.Products);
                setMiddleware("Auth+" + obj.status)
                return obj;
            })
            .catch((err) => {
                console.log(err);
                setMiddleware("Auth+" + err.status)
                throw err;
            });
    };


    return useQuery({ queryKey: ["Products"], queryFn: GetProducts });
}
