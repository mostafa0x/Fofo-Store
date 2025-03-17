'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { TypesContexts } from "../_Interfaces/TypesContext"
import { UserContext } from './UserContext'
import { MainContext } from './MainContext'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios, { AxiosResponse } from 'axios'



export const CartContext = createContext<TypesContexts>({
    MyCart: { MyCart: [], Totalprice: 0 },
    setMyCart: () => { },
    isLoadingCartIcon: true,
    setisLoadingCartIcon: () => { }, AddProductToCart: () => { }, RemoveProductFormCart: () => { }, DeleteProductFromCart: () => { },
    DeleteAllCart: () => { }
})

export default function CartContextProvider({ children }: any) {
    const [MyCart, setMyCart] = useState({ MyCart: [], Total: 0 })
    const [isLoadingCartIcon, setisLoadingCartIcon] = useState(true)
    const Router = useRouter()
    const Path = usePathname()
    const { UserToken, headers } = useContext(UserContext)
    const { TV, setTV } = useContext(MainContext)



    async function AddProductToCart(productID: (number | null)) {
        if (TV === -1) {
            if (productID !== null) {
                setTV(productID)
                const tosatLoading = toast.loading("Waiting...")
                await axios.post("http://localhost:3001/Cart", { productID }, { headers }).then((data) => {
                    setMyCart(data.data.Cart)
                    toast.remove(tosatLoading)
                    toast.success(data.data.message)
                    setTV(-1)
                }).catch((err) => {
                    toast.remove(tosatLoading)
                    toast.error(err.response.data.message)
                    if (err?.response?.status === 400) {
                        if (Path !== "/") {
                            Router.push("/Login")
                        }
                    }
                    setTV(-1)
                })
            }
        } else {
            toast.error("Your request is in progress !")
        }

        return;

    }

    async function RemoveProductFormCart(productID: (number | null)) {
        if (TV === -1 && productID) {
            setTV(productID)
            const tosatLoading = toast.loading("Waiting...")
            await axios.patch("http://localhost:3001/Cart", { productID }, { headers }).then((data) => {
                setMyCart(data.data.Cart)
                toast.success(data.data.message)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
            toast.remove(tosatLoading)
            setTV(-1)
        }

    }

    async function DeleteProductFromCart(productID: (number | null)) {
        if (TV === -1 && productID) {
            setTV(productID)
            const tosatLoading = toast.loading("Waiting...")
            await axios.delete(`http://localhost:3001/Cart/${productID}`, { headers }).then((data) => {
                setMyCart(data.data.Cart)
                toast.success(data.data.message)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
            toast.remove(tosatLoading)
            setTV(-1)

        }

    }

    async function DeleteAllCart(index: any) {
        if (TV === -1) {
            console.log(index);

            setTV(-10)
            const tosatLoading = toast.loading("Waiting...")
            try {
                const data = await axios.delete(`http://localhost:3001/AllCart`, { headers })
                console.log(data);

                setMyCart(data.data.Cart)
                toast.success(data.data.message)
            } catch (err: any) {
                toast.error(err.response.data.message)
            }
            toast.remove(tosatLoading)
            setTV(-1)
        }
    }

    return <CartContext.Provider value={{ MyCart, setMyCart, isLoadingCartIcon, setisLoadingCartIcon, AddProductToCart, RemoveProductFormCart, DeleteProductFromCart, DeleteAllCart }}>{children}</CartContext.Provider>
}
