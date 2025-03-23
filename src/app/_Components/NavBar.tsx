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
    const { isLoadingCartIcon } = useContext(CartContext);
    const { MyCart } = useContext(CartContext)
    const [MaxSelectChrs, setMaxSelectChrs] = useState<number>(58)
    const [MaxInputChrs, setMaxInputChrs] = useState<number>(700)
    const Op = useRef<HTMLSelectElement | null>(null);
    const SearchBar = useRef<HTMLInputElement | null>(null);
    const Router = useRouter();
    const Path = usePathname()
    const HookCart = useCart()
    const { } = useCategories()




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


    function selectMax(SelectionSize: number, Option: string) {
        const WillBeCategoty = Categories.find((category) => {
            return category.name == Option
        })
        setCurrentCategory(WillBeCategoty)
        if (SelectionSize <= 4) {
            setMaxSelectChrs(58)
            setMaxInputChrs(700)
        }
        else if (SelectionSize <= 9) {
            setMaxSelectChrs(100)
            setMaxInputChrs(700)
        } else if (SelectionSize >= 10) {
            setMaxSelectChrs(130)
            setMaxInputChrs(650)
        }



    }
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

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                <button className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
                </button>
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>

            </div>
        </div>
    );

}
