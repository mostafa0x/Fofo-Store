"use client"
import { MainContext } from '@/app/_Contexts/MainContext';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '@/app/_Contexts/ProductsContext';
import TypeProducts from '@/app/_Interfaces/TypeProducts';
import useProducts from '@/app/_Hooks/useProducts';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import useCart from '@/app/_Hooks/useCart';

type Parms = {
    name: string
}

export default function Search() {
    let { ItemFillters, setItemFillters, SearchTXT, setSearchTXT } = useContext(MainContext);
    let { Products } = useContext(ProductsContext)
    let Parms: Parms = useParams();
    const { isLoading, isError, error } = useProducts()
    const { } = useCart();


    useEffect(() => {

        if (Products && Parms?.name) {
            const decodedName = decodeURIComponent(Parms?.name);
            const FT = Products.filter((product: TypeProducts) => product?.title?.toLowerCase().includes(Parms?.name?.toLowerCase()));
            setItemFillters(FT);
            setSearchTXT(decodedName)
        }


    }, [Products]);

    if (SearchTXT == null) {
        return <div className=' flex justify-center items-center min-h-screen p-24'>
            <span className="loading loading-spinner loading-lg transform scale-150"></span>

        </div>
    }

    return (
        <div className=' p-24'>
            <h1 className=' text-2xl font-bold'>Search : {SearchTXT}</h1>
            <div className='pt-8'>
                <ul className="list bg-base-100 rounded-box shadow-md">
                    {ItemFillters?.length > 0 ? ItemFillters?.map((item: TypeProducts, index: number) => {
                        return (
                            <li key={index} className="list-row mb-5 bg-gray-400 rounded-2xl p-5">
                                <div className="flex items-center  space-x-4">
                                    <img className="w-32 h-32 rounded-box" src={item?.images?.[0]} alt={item.title?.split(" ").splice(0, 2).join(" ")} />
                                    <h1 className="text-center font-semibold text-2xl">{item.title?.split(" ").splice(0, 2).join(" ")}</h1>
                                </div>
                                <div className="flex flex-col mt-2">
                                    <div className="text-xs uppercase font-semibold opacity-60">{item?.category?.name}</div>
                                    <p className="text-xs">{item.description}</p>
                                </div>
                                <div className="flex justify-end mt-2">
                                    <button className="px-10 btn btn-square btn-ghost bg-green-600">
                                        {item.price + "$"}
                                    </button>
                                </div>
                            </li>
                        );
                    })
                        : <li>There are no search results</li>}
                </ul>

            </div>
        </div >
    );
}


