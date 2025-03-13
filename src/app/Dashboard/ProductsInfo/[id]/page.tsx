"use client";
import { ProductsContext } from '@/app/_Contexts/ProductsContext';
import useProducts from '@/app/_Hooks/useProducts';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';


export default function ProductsInfo() {
    let { data, isLoading, isError, error } = useProducts()
    let { Products, setProducts } = useContext(ProductsContext)
    let { id } = useParams();
    const [ProductByID, setProductByID] = useState([])


    useEffect(() => {
        console.log(id);
        setProducts(data?.data)

    }, [data])

    useEffect(() => {
        console.log(Products);

        if ([Products?.length > 0]) {
            let PtByID = Products?.filter((item) => item.id == id)
            setProductByID(PtByID)


        }

    }, [Products])

    if (isLoading) {

        return <div className=' flex justify-center items-center min-h-screen p-24'>
            <span className="loading loading-spinner loading-lg transform scale-150"></span>
        </div>
    }

    if (isError) {

        return <div className=' flex justify-center items-center min-h-screen p-24'>
            <span className=" text-3xl text-red-600 ">{error?.message}</span>
        </div>
    }



    return (

        ProductByID ? <div className='p-24'>{ProductByID[0].name}</div> : null



    )
}
