"use client";
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../_Contexts/UserContext';
import { TypesContexts } from "../_Interfaces/TypesContext"
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { MainContext } from '../_Contexts/MainContext';
import { signOut } from 'next-auth/react';
import { CartContext } from '../_Contexts/CartContext';



export default function NavBar() {
    let { UserToken, setUserToken, isLoading }: TypesContexts = useContext(UserContext)
    let { SearchTXT, setSearchTXT, TV, setTV }: TypesContexts = useContext(MainContext)
    const { MyCart } = useContext(CartContext)
    const [MaxSelectChrs, setMaxSelectChrs] = useState<number>(58)
    const [MaxInputChrs, setMaxInputChrs] = useState<number>(700)
    let Op = useRef<HTMLSelectElement | null>(null);
    let SearchBar = useRef<HTMLInputElement | null>(null);
    let Router = useRouter();

    function selectMax(SelectionSize: number) {
        console.log(SelectionSize);
        if (SelectionSize <= 49) {
            setMaxSelectChrs(58)
            setMaxInputChrs(700)
        } else if (SelectionSize >= 50) {
            setMaxSelectChrs(364)
            setMaxInputChrs(400)
        }



    }
    function LogOut() {
        if (TV === 1) {
            setTV(0)
            toast.dismiss()
            toast.loading("Waiting Logout...")
            signOut({ callbackUrl: '/Login' })
        }
    }
    function Search(SecTXT: string) {
        if (SecTXT == "") {
            toast.error("Enter Text to Search bar")
        } else {
            setSearchTXT(SecTXT)
            Router.push(`/Search/${SecTXT}`)
        }
    }

    return (
        <div className="navbar  bg-white fixed top-0 z-[1] pl-10 pr-10 pt-5">
            <div className="flex-1">
                <div className=' flex gap-6'>
                    <Link href={"/"}> <i className="btn btn-ghost text-xl">Fofo Store</i></Link>
                    <input ref={SearchBar} type="text" placeholder="Search here for products" className="outline-none !max-w-none" style={{ width: `${MaxInputChrs}px` }} />
                    <div className=' flex flex-row'> <select onClick={() => selectMax(Op?.current?.value?.length ?? 0)} ref={Op} className='outline-none'
                        style={{ width: `${MaxSelectChrs}px` }}>
                        <option>All</option>
                        <option>Btata</option>
                        <option>Sasssssssssssssss sssssssssssssJ sssssssssssssssssssssssssssssssssssssssssa</option>
                    </select>

                        <button onKeyDown={(e) => { if (e.key == "Enter") { Search(SearchBar?.current?.value ?? "") } }} onClick={() => Search(SearchBar?.current?.value ?? "")} type="button" className=" font-semibold text-sm text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-lg  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Search</button>


                    </div>


                </div>

            </div>

            {isLoading ? <i className="fa-solid fa-spinner fa-spin text-3xl mr-3"></i> : <>
                {UserToken ? <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="text-2xl  btn btn-ghost btn-circle">
                            <div className="indicator">
                                <i className="fa-solid fa-cart-shopping"></i>
                                <span className="badge badge-sm  indicator-item text-lg">{MyCart?.MyCart?.length || 0}</span>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                            <div className="card-body">
                                <span className="text-lg font-bold">{MyCart?.MyCart?.length || 0} Items</span>
                                <span className="text-info">Subtotal: ${MyCart?.Total || 0}</span>
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-block">View cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a onClick={() => { LogOut() }}>Logout</a></li>
                        </ul>
                    </div>
                </div> : <Link href={"/Login"}><i className="fa-regular fa-user text-5xl btn btn-ghost"></i></Link>}
            </>}

        </div>
    )
}
