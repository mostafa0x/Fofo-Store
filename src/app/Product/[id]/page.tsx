"use client"
import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import HooksTypes from '@/app/_Interfaces/HooksType'
import axios from 'axios'
import { UserContext } from '@/app/_Contexts/UserContext'
import { useParams, useRouter } from 'next/navigation'
import TypeProducts from '@/app/_Interfaces/TypeProducts'
import Slider from 'react-slick';
import Link from 'next/link'
import toast from 'react-hot-toast'
import { MainContext } from '@/app/_Contexts/MainContext'
import { CartContext } from '@/app/_Contexts/CartContext'
import useCart from '@/app/_Hooks/useCart'
import { useSession } from 'next-auth/react'



export default function ProductID() {
    function GetProductByID() {
        return axios.get(`http://localhost:3001/Product/${Params?.id}`, { headers }).then((product) => {
            setProductByID(product.data.Product)
            return product

        })
    }
    const { TV, setTV } = useContext(MainContext)
    const { setMyCart, AddProductToCart } = useContext(CartContext)
    const Session = useSession()
    const { data, isError, error, isLoading, refetch }: HooksTypes = useQuery({ queryKey: ['ProdcutByID'], queryFn: GetProductByID })
    const HookCart = Session.status === 'authenticated' ? useCart() : null
    const { headers } = useContext(UserContext)
    const Params = useParams()
    const [ProductByID, setProductByID] = useState<TypeProducts>({})
    let settingsSlick = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };
    const Router = useRouter()

    useEffect(() => {
        HookCart?.refetch()
    }, [headers])

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
        return <div className=" flex justify-center pt-72 text-4xl" > <h1>{error?.response?.data?.message}</h1></div >
    }

    return (
        <div className=" flex justify-center items-center mx-20 pt-52 row ">
            <div className="w-1/4 pr-4">
                {(ProductByID?.images?.length ?? 0) > 1 ? (
                    <Slider {...settingsSlick}>
                        {ProductByID?.images?.map((scr, index) => (
                            <img
                                key={index}
                                className="w-full"
                                src={scr}
                                alt={ProductByID?.title}
                            />
                        ))}
                    </Slider>
                ) : (
                    ProductByID?.images?.[0] && (
                        <img
                            className="w-full"
                            src={ProductByID?.images?.[0]}
                            alt={ProductByID?.title}
                        />
                    )
                )}
            </div>
            <div className="w-1/2">
                <h1 className=" text-2xl font-bold text-gray-900">
                    {ProductByID?.title}
                </h1>
                <p className=" text-gray-700 font-light mt-4">
                    {ProductByID?.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                    <p className=' text-center'>{ProductByID?.price} EGP  <i className="fa-solid fa-money-bill-wave"></i></p>
                    <button onClick={() => AddProductToCart(ProductByID.id)} className='btn btn-ghost bg-green-700'>{TV === ProductByID.id ? <div className='flex justify-between items-center' role="status" >  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                        <span className="">Loading...</span></div>
                        : "Add to cart"}</button>
                </div>
            </div>
        </div>
    )
}
