"use client";
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../_Contexts/UserContext';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { MainContext } from '../_Contexts/MainContext';
import { signOut, useSession } from 'next-auth/react';
import { CartContext } from '../_Contexts/CartContext';
import useCart from '../_Hooks/useCart';
import { CategoriesContext } from '../_Contexts/CategoriesContext';
import useCategories from '../_Hooks/useCategories';





export default function NavBar() {
    const { data: session } = useSession()
    const { UserToken, isUserLoading } = useContext(UserContext)
    const { SearchTXT, setSearchTXT, TV, setTV } = useContext(MainContext)
    const { LoadingIconOptions, Categories, CurrentCategory, setCurrentCategory } = useContext(CategoriesContext)
    const { MyCart, isLoadingCartIcon } = useContext(CartContext)

    const Op = useRef<HTMLSelectElement | null>(null);
    const SearchBar = useRef<HTMLInputElement | null>(null);
    const Router = useRouter();
    const Path = usePathname()
    const HookCart = useCart()
    const { } = useCategories()
    const CartList = useRef<HTMLDivElement>(null)




    useEffect(() => {
        if (Path === "/") {
            if (SearchTXT !== "") {
                if (SearchBar?.current) {
                    SearchBar.current.value = "";
                }
                setSearchTXT("");
            }
        }

    }, [Path]);

    useEffect(() => {
        HookCart.refetch()


    }, [session])

    function LogOut() {
        if (TV === -1) {
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

            Router.push(`/Search/${CurrentCategory?.name}/${SecTXT}`)
        }
    }

    function List() {
        console.log("xx");

        if (CartList) {
            CartList.current.classList.toggle("dropdown-content");
        }

    }

    return (
        <div className="navbar fixed top-0 bg-base-100 shadow-sm z-[60]">
            <div className="flex-1">
                <Link href={"/"}> <a className="btn btn-ghost text-xl">Fofo Store</a></Link>
            </div>
            <div className="flex gap-2">
                {UserToken ? isLoadingCartIcon ? <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div> : <div ref={CartList} className="dropdown">
                    <div tabIndex={0} onClick={() => List()} role="button" className="btn btn-ghost btn-circle  pr-4">
                        <div className="indicator items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-15 w-8 items-center" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                            <span className="badge badge-sm indicator-item">{MyCart.MyCart.length}</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 z-1 mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">{MyCart.MyCart.length} Items</span>
                            <span className="text-info">Subtotal: {MyCart.Totalprice} EGP</span>
                            <div className="card-actions">
                                <Link href={"/Cart"}><button className="btn btn-primary btn-block">View cart</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                    : null}
                <input ref={SearchBar} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        Search(e.currentTarget.value)
                    }
                }} type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                <button onClick={() => { Search(SearchBar?.current?.value) }} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
                </button>
                {isUserLoading ? <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div> : <div onClick={() => {
                    if (!UserToken) {
                        Router.push("/Login")
                    }
                }} className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost  btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="FOFO STORE"
                                src={session?.user?.image ?? "https://thumb.ac-illust.com/51/51e1c1fc6f50743937e62fca9b942694_t.jpeg"} />
                        </div>
                    </div>
                    {UserToken ?
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li onClick={() => LogOut()}><a>Logout</a></li>
                        </ul>
                        : null}
                </div>}


            </div >
        </div >
    );

}
