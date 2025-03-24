"use client"
import { MainContext } from '@/app/_Contexts/MainContext';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '@/app/_Contexts/ProductsContext';
import TypeProducts from '@/app/_Interfaces/TypeProducts';
import useProducts from '@/app/_Hooks/useProducts';
import { CartContext } from '@/app/_Contexts/CartContext';

type Parms = {
    name: string,
    CategoryName: string
}

export default function Search() {
    const { TV, setTV } = useContext(MainContext);
    const { AddProductToCart } = useContext(CartContext)
    const { ProdutcsByCategory, PageCategoryLoading, PageProduct, setProdutcsByCategory, setPageCategoryLoading } = useContext(ProductsContext)
    const { name } = useParams<Parms>();
    const { } = useProducts()
    const Router = useRouter()

    useEffect(() => {
        window.scroll(0, 0)




        return () => {
            setProdutcsByCategory(null)
            setPageCategoryLoading(true)
            setTV(-1)
        }
    }, [])

    if (PageCategoryLoading) {
        return <div className="flex justify-center mt-52 " role="status">
            <svg aria-hidden="true" className="w-28 h-28 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }

    if (PageProduct) {
        return <div className="flex justify-center mt-52 " role="status">
            <svg aria-hidden="true" className="w-28 h-28 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }


    return (
        <div className="p-6 md:p-12 lg:p-24">
            <h1 className="text-2xl font-bold text-blue-600">{`Search: ${decodeURIComponent(name)}`}</h1>
            <div className="pt-8">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {(ProdutcsByCategory?.length ?? 0) > 0 ? ProdutcsByCategory?.map((item: TypeProducts, index: number) => {
                        return (
                            <li key={index} className="bg-gray-200 hover:bg-gray-300 rounded-2xl p-5 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex flex-col">
                                <div onClick={() => { Router.push(`/Product/${item.id}`) }} className="cursor-pointer">
                                    <div className="flex flex-col items-center">
                                        <img className="w-32 h-32 rounded-box shadow-lg hover:shadow-xl transition-all duration-300" src={item?.images?.[0]} alt={item.title?.split(" ").splice(0, 2).join(" ")} />
                                        <h1 className="text-center font-semibold text-xl text-gray-800 mt-4">{item.title?.split(" ").splice(0, 2).join(" ")}</h1>
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <i className="fas fa-tag"></i>
                                            <span className="text-sm">{item?.category?.name}</span>
                                        </div>
                                        <p className="text-xs text-gray-700 mt-1">{item.description}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-end flex-grow ">


                                    <div className="mt-4">
                                        <div className=" text-sm text-gray-500 mb-4">
                                            {(item.stock ?? 0) <= 0 ? (
                                                null
                                            ) : (
                                                <>
                                                    {((item.DisPercentage ?? 0) > 0) && (
                                                        <div className="flex items-center gap-2">
                                                            <i className="fas fa-percent text-green-500"></i>
                                                            <span className="text-green-500 text-sm">{item.DisPercentage}% OFF</span>
                                                            <p className="line-through text-gray-500 text-sm">{item.price} EGP</p>
                                                        </div>
                                                    )}
                                                    <p className="text-xl font-semibold text-blue-600">
                                                        <i className="fas fa-money-bill-alt mr-2 text-green-700"></i> {item.priceAfterDis} EGP
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                        {(item.stock ?? 0) > 0 ? (
                                            <button
                                                onClick={() => AddProductToCart(item.id)}
                                                className={`w-full py-2 ${TV === (item.id ?? 0) - 10000 ? `bg-blue-700 hover:bg-blue-700` : `bg-green-700 hover:bg-green-600`} text-white rounded-lg shadow-md transition-colors`}>
                                                {TV === (item.id ?? 0) - 10000 ? (
                                                    <div className="flex justify-between items-center" role="status">
                                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                        </svg>
                                                        <span className="">Loading...</span>
                                                    </div>
                                                ) : (
                                                    'Add to Cart'
                                                )}
                                            </button>
                                        ) : (
                                            <span className="text-red-500 text-xs"><i className="fas fa-times-circle"></i> Out of Stock</span>
                                        )}
                                    </div>
                                </div>
                            </li>
                        );
                    })
                        : <li className="text-center py-4 text-gray-500 col-span-full">There are no search results</li>}
                </ul>
            </div>
        </div>
    );
}
