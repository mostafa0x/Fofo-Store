'use client'
import React, { useContext, useEffect, useRef } from 'react'
import useCart from '../_Hooks/useCart'
import { UserContext } from '../_Contexts/UserContext'
import { CartContext } from '../_Contexts/CartContext'
import TypeProducts from '../_Interfaces/TypeProducts'
import HooksTypes from '../_Interfaces/HooksType'
import { useSession } from 'next-auth/react'
import { MainContext } from '../_Contexts/MainContext'

export default function Cart() {
    const { data, refetch, isError, error }: HooksTypes = useCart()
    const { headers } = useContext(UserContext)
    const { MyCart, AddProductToCart, RemoveProductFormCart, DeleteProductFromCart, DeleteAllCart } = useContext(CartContext)
    const { TV } = useContext(MainContext)
    const Session = useSession()
    const DeleteCart = useRef(null)

    useEffect(() => {
        refetch()
    }, [headers])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])


    if (isError) {
        return <div className="flex justify-center pt-72" role="status">
            <h1>{error?.response?.data.message}</h1>
        </div>
    }

    if (data?.message === "Login Frist") {
        return <div className="flex justify-center pt-72" role="status">
            <svg aria-hidden="true" className="w-28 h-28 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    } else if (!data?.message) {
        return (
            <div className='mt-10 px-16 py-20 ' >
                <div className='mb-20'>
                    <div className=' flex-row flex justify-between items-center  text-center  font-bold'>
                        <h1 className='text-3xl opacity-40'>MyCart</h1>
                        {MyCart?.MyCart?.length ?? 0 > 0 ? <>
                            <h1 className='text-2xl'>Total Prices :{MyCart?.Totalprice} EGP</h1>
                            <button onClick={() => DeleteAllCart(-11)} className='btn btn-ghost text-xl bg-red-950 text-white font-normal'>{TV === -11 ? <i className="fa-duotone fa-solid fa-spinner fa-spin text-2xl"></i> : "Remove Cart"}</button>
                        </> : null}
                    </div>
                </div>
                {MyCart?.MyCart?.length ?? 0 > 0 ?
                    MyCart?.MyCart?.map((product, index: number) => {
                        const DisPrice = product.price && product.DisPercentage && product.count
                            ? (product.price - (product.price * (product.DisPercentage / 100))) * product.count
                            : product.price ?? 0 * (product.count ?? 1);

                        return <div className='py-10' key={index}>
                            <div className=' flex justify-between text-center items-center'>
                                <div className='flex justify-between w-96 items-center '>
                                    <img
                                        className='w-24 h-24 object-cover rounded-lg'
                                        src={product?.images?.[0]}
                                        alt={product.title?.split(" ").splice(0, 2).join(" ")}
                                    />
                                    <h1 className='pl-32 font-semibold'>{product.title?.split(" ").splice(0, 2).join(" ")}</h1>
                                </div>
                                <div className='flex justify-between items-center w-52'>
                                    <button onClick={() => RemoveProductFormCart(product?.id)} className='btn btn-circle bg-red-800'>{TV == (product?.id ?? 0) - 100000 ? <i className="fa-duotone fa-solid fa-spinner fa-spin text-2xl"></i> : <i className="fa-solid fa-minus text-2xl"></i>}</button>
                                    <h1 className='font-bold'>{product.count}</h1>
                                    <button onClick={() => AddProductToCart(product?.id)} className='btn btn-circle bg-green-600'>{TV === (product?.id ?? 0) - 10000 ? <i className="fa-duotone fa-solid fa-spinner fa-spin text-2xl"></i> : <i className="fa-solid fa-plus text-2xl"></i>}</button>
                                </div>
                                <h1 className=' text-xl font-semibold'>{`Price : ${DisPrice ?? 0}`}</h1>
                                <button onClick={() => DeleteProductFromCart(product?.id)} className='btn btn-ghost text-3xl'>{TV == (product.id ?? 0) - 1000000 ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-trash"></i>}</button>
                            </div>

                        </div>
                    })
                    : <div className='flex justify-center text-3xl opacity-55'><h1>Empty</h1></div>}
            </div>
        )

    }


}
