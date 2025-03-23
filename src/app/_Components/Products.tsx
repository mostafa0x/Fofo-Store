"use clietn"
import React, { useContext, useEffect } from 'react'
import useProducts from '../_Hooks/useProducts'
import HooksTypes from '../_Interfaces/HooksType'
import { ProductsContext } from '../_Contexts/ProductsContext'
import TypeProducts from '../_Interfaces/TypeProducts'
import { useRouter } from 'next/navigation'
import { MainContext } from '../_Contexts/MainContext'
import { CartContext } from '../_Contexts/CartContext'


export default function Products() {
    const { isError, error, isLoading }: HooksTypes = useProducts()
    const { Products, PageProduct, setPageProduct } = useContext(ProductsContext)
    const Router = useRouter();
    const { TV } = useContext(MainContext)
    const { AddProductToCart } = useContext(CartContext)

    useEffect(() => {

        return () => {
            setPageProduct(true)

        }
    }, [])


    if (isLoading) {
        return <div className="flex justify-center " role="status">
            <svg aria-hidden="true" className="w-28 h-28 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }

    if (isError) {
        return <div className='"flex justify-center pt-72"'><h1>{error?.response?.data?.message}</h1></div>
    }

    if (PageProduct) {
        return <div className="flex justify-center " role="status">
            <svg aria-hidden="true" className="w-28 h-28 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> {/* تقليص الفجوة بين العناصر */}
            {!Products ? (
                <div className="col-span-full text-center">
                    <h1 className="text-3xl font-semibold text-red-500">Error!</h1>
                </div>
            ) : (
                <>
                    {Products?.map((product: TypeProducts, index: number) => (
                        <div
                            key={index}
                            className="w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
                        >
                            <div
                                onClick={() => Router.push(`/Product/${product.id}`)}
                                className="cursor-pointer"
                            >
                                <img
                                    src={product?.images?.[0]}
                                    className="w-full h-40 object-cover rounded-t-lg transform hover:scale-105 transition-all duration-300"
                                    alt={product.title}
                                />
                            </div>

                            <div className="px-4 py-3"> {/* تقليص الحشو */}
                                <h5 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                    {product.title?.split(" ").splice(0, 2).join(" ")}
                                </h5>
                            </div>

                            <div className="px-4 pb-3 flex flex-col justify-between flex-grow">
                                {(product?.DisPercentage ?? 0) <= 0 ? (
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-semibold text-green-700">
                                            <i className="fas fa-money-bill-alt mr-2"></i>
                                            {product?.price} EGP
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            <i className="fas fa-tag"></i> No Discount
                                        </span>
                                    </div>
                                ) : (
                                    <div className="text-xl font-medium text-gray-900 dark:text-white">
                                        <i className="fas fa-money-bill-alt mr-2 text-green-700"></i>   {product?.priceAfterDis ?? 0} EGP
                                        {(product?.DisPercentage ?? 0) > 0 && (
                                            <div className="flex items-center mt-1 text-red-500">
                                                <i className="fas fa-tags mr-1"></i>
                                                <span>{product.DisPercentage}% OFF</span>
                                                <span className="ml-2 line-through text-base text-gray-500">
                                                    {product.price} EGP
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="px-4 py-3">
                                {(product.stock ?? 0) <= 0 ? (
                                    <span className="text-sm text-red-500 font-semibold">Out of Stock</span>
                                ) : (
                                    <button
                                        onClick={() => AddProductToCart(product.id)}
                                        className={`btn w-full ${TV === (product.id ?? 0) - 10000
                                            ? `bg-blue-700 hover:bg-blue-700`
                                            : `bg-green-700 hover:bg-green-800`
                                            } text-white py-2 px-4 rounded-full text-center flex justify-center items-center transition-all duration-300`}
                                    >
                                        {TV === (product.id ?? 0) - 10000 ? (
                                            <div className="flex items-center">
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
                                        ) : (
                                            <>
                                                <i className="fas fa-cart-plus mr-2"></i>
                                                Add to cart
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}
