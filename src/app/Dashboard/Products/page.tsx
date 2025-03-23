"use client"
import { MainContext } from '@/app/_Contexts/MainContext';
import { ProductsContext } from '@/app/_Contexts/ProductsContext';
import useProducts from '@/app/_Hooks/useProducts'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

export default function Products() {
    let { isLoading, isError, error } = useProducts();
    const [UserScrollY, setUserScrollY] = useState(0)
    const { Products } = useContext(ProductsContext)
    const { setEditMode } = useContext(MainContext)
    const Router = useRouter()

    function ChangeToEditMode(id: number | null | undefined) {
        if (id) {
            setEditMode(id)
            Router.push("/Dashboard/AddProduct")
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            setUserScrollY(window.scrollY);
        };
        setEditMode(null)

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (isLoading) {
        return <div className=' flex justify-center items-center min-h-screen p-24'>
            <span className="loading loading-spinner loading-lg transform scale-150"></span>
        </div>
    }
    if (isError) {
        return <div className=' flex justify-center items-center min-h-screen p-24'>
            <h1>{error?.message}</h1>
        </div>
    }

    return (
        <div className="mt-10 p-8 bg-gray-50">
            <div className='flex justify-between pb-4 gap-4'>
                <h1 className='font-bold text-2xl text-gray-800'>Products</h1>
                <Link href={"/Dashboard/AddProduct"}>
                    <button className='btn btn-ghost bg-green-600 text-white hover:bg-green-700 transition-all'>
                        <i className="fas fa-plus mr-2"></i> Add Product
                    </button>
                </Link>
            </div>

            {UserScrollY > 55 ? (
                <div className="fixed bottom-[100px] right-10 z-[1]">
                    <i onClick={() => window.scroll(0, 0)} className="btn btn-circle pt-[4.5px] items-center text-center text-4xl cursor-pointer bg-blue-500 hover:bg-blue-600 transition-all">
                        <i className="fas fa-arrow-up"></i>
                    </i>
                </div>
            ) : null}

            <div className='max-w-full overflow-x-hidden z-0'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center'>
                    {Products?.map((product, index: number) => (
                        <div
                            onClick={() => ChangeToEditMode(product?.id)}
                            key={index}
                            className="card bg-white shadow-lg hover:shadow-2xl rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                        >
                            <figure>
                                <img
                                    src={product?.images?.[0]}
                                    alt={product?.title}
                                    className="w-full h-32 object-cover rounded-t-lg"
                                />
                            </figure>
                            <div className="card-body p-4">
                                <h2 className="card-title text-xl font-semibold text-gray-800 flex items-center justify-between">
                                    <span>{product?.title?.split(" ").slice(0, 2).join(" ")}</span>
                                    {(product?.DisPercentage ?? 0) > 0 ? <div className="flex items-center space-x-4">
                                        <span className="text-red-500 text-sm font-semibold">
                                            {product?.DisPercentage}<i className="fas fa-percent"></i> Off
                                        </span>
                                        <span className="flex items-center text-gray-500 line-through text-sm">
                                            <i className="fas fa-dollar-sign mr-1"></i>
                                            <span>{product?.price}</span>
                                        </span>
                                    </div> : null}

                                </h2>



                                <p className="text-gray-600 text-sm">{product?.description?.split(" ").slice(0, 5).join(" ")}...</p>
                                <div className="card-actions justify-between mt-4">
                                    <div className="font-semibold text-green-600">{product?.priceAfterDis} EGP</div>
                                    <div className="badge badge-outline bg-blue-100 text-blue-600">
                                        <i className="fas fa-tags mr-2"></i>
                                        {product?.category?.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
