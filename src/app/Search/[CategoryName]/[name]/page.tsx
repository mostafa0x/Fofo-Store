"use client"
import { MainContext } from '@/app/_Contexts/MainContext';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '@/app/_Contexts/ProductsContext';
import TypeProducts from '@/app/_Interfaces/TypeProducts';
import useProducts from '@/app/_Hooks/useProducts';
import useCart from '@/app/_Hooks/useCart';
import { UserContext } from '@/app/_Contexts/UserContext';
import { CartContext } from '@/app/_Contexts/CartContext';
import { useSession } from 'next-auth/react';
import useCategories from '@/app/_Hooks/useCategories';
import { CategoriesContext } from '@/app/_Contexts/CategoriesContext';

type Parms = {
    name: string,
    CategoryName: string
}

export default function Search() {
    const { TV, setTV } = useContext(MainContext);
    const { headers } = useContext(UserContext)
    const { setMyCart, AddProductToCart } = useContext(CartContext)
    const { ProdutcsByCategory, PageCategoryLoading, setProdutcsByCategory, setPageCategoryLoading } = useContext(ProductsContext)
    let { name, CategoryName } = useParams<Parms>();
    const { isLoading, isError, error } = useProducts()
    const session = useSession()
    const HookCart = useCart()
    const HookCategory = useCategories()
    const Router = useRouter()

    useEffect(() => {

        // will destroy
        return () => {
            setProdutcsByCategory(null)
            setPageCategoryLoading(true)
        }
    }, [])


    useEffect(() => {
        HookCart?.refetch()
    }, [headers])


    if (PageCategoryLoading) {
        return <div className="flex justify-center mt-10 " role="status">
            <svg aria-hidden="true" className="w-28 h-28 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }

    return (
        <div className=' p-24'>
            <h1 className=' text-2xl font-bold'>Search : {decodeURIComponent(name)}</h1>
            <div className='pt-8'>
                <ul className="list bg-base-100 rounded-box shadow-md">
                    {(ProdutcsByCategory?.length ?? 0) > 0 ? ProdutcsByCategory?.map((item: TypeProducts, index: number) => {
                        return (
                            <li key={index} className="list-row mb-5 bg-gray-400 rounded-2xl p-5 ">
                                <div onClick={() => { Router.push(`/Product/${item.id}`) }} className=' cursor-pointer' >
                                    <div className="flex items-center  space-x-4">
                                        <img className="w-32 h-32 rounded-box" src={item?.images?.[0]} alt={item.title?.split(" ").splice(0, 2).join(" ")} />
                                        <h1 className="text-center font-semibold text-2xl">{item.title?.split(" ").splice(0, 2).join(" ")}</h1>
                                    </div>
                                    <div className="flex flex-col mt-2">
                                        <div className="text-xs uppercase font-semibold opacity-60">{item?.category?.name}</div>
                                        <p className="text-xs">{item.description}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-2">
                                    <button onClick={() => AddProductToCart(item.id)} className="px-10 btn btn-square btn-ghost bg-green-600">

                                        {TV === item.id ? <div className='flex justify-between items-center' role="status" >  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                            <span className="">Loading...</span></div>
                                            : item.price + "$"}
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


