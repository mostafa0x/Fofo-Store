"use client";
import { ProductsContext } from '@/app/_Contexts/ProductsContext';
import useProductByID from '@/app/_Hooks/useProductByID';
import useProducts from '@/app/_Hooks/useProducts';
import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';


export default function ProductsInfo() {
    let { isLoading, isError, error } = useProductByID()
    let { ProductByID } = useContext(ProductsContext)
    let { id } = useParams();






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

        ProductByID ? <div className='p-24'>{ProductByID?.title}</div> : null



    )
}
