"use client"
import { MainContext } from '@/app/_Contexts/MainContext';
import { ProductsContext } from '@/app/_Contexts/ProductsContext';
import useProducts from '@/app/_Hooks/useProducts'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';


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
            <h1 >{error?.message}</h1>
        </div>
    }




    return (
        <div className="p-24">
            <div className='flex justify-between pb-4 gap-4'>
                <h1 className='font-bold text-2xl'>Products</h1>
                <Link href={"/Dashboard/AddProduct"}><button className='btn btn-ghost bg-green-600 text-white'>Add Product</button>
                </Link>
            </div>
            {UserScrollY > 55 ? <div className="fixed bottom-[100px] right-10">
                <i onClick={() => window.scroll(0, 0)} className="btn  btn-circle pt-[4.5px]  items-center text-center fa-solid fa-circle-up text-4xl cursor-pointer"></i>
            </div> : null}



            <div className='max-w-full overflow-x-hidden z-0'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center'>
                    {Products?.map((product, index: number) => (
                        <div onClick={() => ChangeToEditMode(product?.id)} key={index} className="card bg-base-100 w-full max-w-xs shadow-xl cursor-pointer">
                            <figure>
                                <img
                                    src={product?.images?.[0]}
                                    alt={product?.title}
                                    className="w-full h-32 object-contain"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {product?.title?.split(` `).slice(0, 2).join(` `)}
                                    <div className="badge badge-secondary">NEW</div>
                                </h2>
                                <p>{product?.description?.split(` `).slice(0, 2).join(` `)}</p>
                                <div className="card-actions justify-between">
                                    <div className="font-semibold">{product?.priceAfterDis} EPG</div>
                                    <div className="badge badge-outline">{product?.category?.name}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}
