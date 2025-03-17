"use client";
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../_Contexts/UserContext';
import { TypesContexts } from "../_Interfaces/TypesContext"
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { MainContext } from '../_Contexts/MainContext';
import { signOut, useSession } from 'next-auth/react';
import { CartContext } from '../_Contexts/CartContext';
import useCart from '../_Hooks/useCart';




export default function NavBar() {
    const { data: session, status } = useSession()
    const { UserToken, setUserToken, isUserLoading }: TypesContexts = useContext(UserContext)
    const { SearchTXT, setSearchTXT, TV, setTV }: TypesContexts = useContext(MainContext)
    const { isLoadingCartIcon } = useContext(CartContext);
    const { MyCart } = useContext(CartContext)
    const [MaxSelectChrs, setMaxSelectChrs] = useState<number>(58)
    const [MaxInputChrs, setMaxInputChrs] = useState<number>(700)
    let Op = useRef<HTMLSelectElement | null>(null);
    let SearchBar = useRef<HTMLInputElement | null>(null);
    const Router = useRouter();
    const Path = usePathname()
    const HookCart = useCart()



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
                        <option>test</option>
                    </select>

                        <button onKeyDown={(e) => { if (e.key == "Enter") { Search(SearchBar?.current?.value ?? "") } }} onClick={() => Search(SearchBar?.current?.value ?? "")} type="button" className=" font-semibold text-sm text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-lg  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Search</button>


                    </div>


                </div>

            </div>

            {isUserLoading ? <i className="fa-solid fa-spinner fa-spin text-3xl mr-3"></i> : <>
                {UserToken ? <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        {isLoadingCartIcon ? <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div> : <div tabIndex={0} role="button" className="text-2xl  btn btn-ghost btn-circle">
                            <div className="indicator">
                                <i className="fa-solid fa-cart-shopping"></i>
                                <span className="badge badge-sm  indicator-item text-lg">{MyCart?.MyCart?.length || 0}</span>
                            </div>
                        </div>}
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                            <div className="card-body">
                                <span className="text-lg font-bold">{MyCart?.MyCart?.length || 0} Items</span>
                                <span className="text-info">Subtotal: ${MyCart?.Totalprice || 0}</span>
                                <div className="card-actions">
                                    <Link href={"/Cart"}><button className="btn btn-primary btn-block">View cart</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Icon Profile"
                                    src={session?.user?.image ?? "Empty"} />
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
