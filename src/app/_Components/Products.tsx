"use clietn"
import React, { useContext } from 'react'
import useProducts from '../_Hooks/useProducts'
import HooksTypes from '../_Interfaces/HooksType'
import { ProductsContext } from '../_Contexts/ProductsContext'
import TypeProducts from '../_Interfaces/TypeProducts'

export default function Products() {
    const { data, isError, error, isLoading, refetch }: HooksTypes = useProducts()
    const { Products } = useContext(ProductsContext)

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


        return <div className='"flex justify-center pt-72"'><h1>{error?.response?.data?.message}</h1></div>
    }

    return (
        <div className='grid grid-cols-4 gap-4'>
            {Products?.length == 0 ? <div><h1>Loading...</h1></div> : null}
            {Products?.map((product: TypeProducts, index: number) => {
                return <div key={index} className="w-full max-w-xs bg-gray-200 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <img
                            className="p-4 rounded-t-lg object-cover h-48 w-full" // Adjusted to set fixed height and width for the image
                            src={product?.images?.[0]}
                            alt={product.title}
                        />
                    </a>
                    <div className="px-5 pb-5">
                        <a href="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {product.title?.split(" ").splice(0, 3).join(" ")}
                            </h5>
                        </a>
                        <div className="flex items-center justify-between bt-10">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Add to cart
                            </a>
                        </div>
                    </div>
                </div>
            })}

        </div>
    )
}
