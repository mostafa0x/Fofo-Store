"use client"
import { useQueryClient } from '@tanstack/react-query'
import React, { useContext, useEffect } from 'react'
import Slider from 'react-slick';
import { MainContext } from '@/app/_Contexts/MainContext'
import { CartContext } from '@/app/_Contexts/CartContext'
import { ProductsContext } from '@/app/_Contexts/ProductsContext'
import useProductByID from '@/app/_Hooks/useProductByID'

export default function ProductID() {

    const { TV, setTV } = useContext(MainContext)
    const { AddProductToCart } = useContext(CartContext)
    const { isError, error, isLoading }: any = useProductByID()
    const { ProductByID, setProductByID } = useContext(ProductsContext)
    const Query = useQueryClient()
    const settingsSlick = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
    };

    useEffect(() => {
        window.scroll(0, 0)
        return () => {
            setProductByID(null)
            setTV(-1)
            Query.resetQueries<any>("ProductByID")
        }
    }, [])

    if (isLoading) {
        return <div className="flex justify-center pt-72" role="status">
            <svg aria-hidden="true" className="w-28 h-28 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }

    if (isError) {
        return <div className="flex justify-center pt-72 text-4xl text-red-600" > <h1>{error?.response?.data?.message}</h1></div >
    }

    return (
        <div className="flex flex-col md:flex-row justify-center items-start mt-16 mx-10 pt-20">
            <div className="w-full md:w-1/2 lg:w-1/3 pr-4 mb-8 md:mb-0">
                {(ProductByID?.images?.length ?? 0) > 1 ? (
                    <Slider {...settingsSlick}>
                        {ProductByID?.images?.map((scr, index) => (
                            <img
                                key={index}
                                className="w-full rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105"
                                src={scr}
                                alt={ProductByID?.title}
                            />
                        ))}
                    </Slider>
                ) : (
                    ProductByID?.images?.[0] && (
                        <img
                            className="w-full rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105"
                            src={ProductByID?.images?.[0]}
                            alt={ProductByID?.title}
                        />
                    )
                )}
            </div>

            <div className="w-full md:w-1/2 lg:w-2/3 px-4">
                <h1 className="text-3xl font-semibold text-gray-900 hover:text-blue-600 transition-all">
                    {ProductByID?.title}
                </h1>
                <p className="text-gray-700 font-light mt-4 text-sm">
                    {ProductByID?.description}
                </p>

                <div className="flex justify-between items-center mt-6">
                    <span className="text-gray-500">Stock: {ProductByID?.stock}</span>
                    <p className="text-2xl text-green-600 font-bold">{ProductByID?.priceAfterDis} EGP</p>

                    {(ProductByID?.DisPercentage ?? 0) > 0 && (
                        <div className="flex items-center space-x-2">
                            <p className="text-sm line-through text-gray-500">
                                {ProductByID?.price} EGP
                            </p>
                            <p className="flex items-center text-red-600">
                                {ProductByID?.DisPercentage}% off
                                <i className="fas fa-percent text-xl ml-2"></i>
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    {(ProductByID?.stock ?? 0) <= 0 ? (
                        <button disabled className="w-full py-2 bg-gray-500 text-white rounded-lg shadow-md cursor-not-allowed">
                            Out of Stock
                        </button>
                    ) : (
                        <button
                            onClick={() => AddProductToCart(ProductByID?.id)}
                            className={`w-full py-2 ${TV == (ProductByID?.id ?? 0) - 10000 ? `bg-blue-700 hover:bg-blue-900 ` : `bg-green-700 hover:bg-green-900 `} text-white rounded-lg shadow-md transition-all`}>
                            {TV == (ProductByID?.id ?? 0) - 10000 ? (
                                <div className="flex justify-center items-center">
                                    <svg
                                        aria-hidden="true"
                                        className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                    <span className="ml-2">Loading...</span>
                                </div>
                            ) : "Add to Cart"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
