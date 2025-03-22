'use client'
import React, { createContext, useContext, useState } from 'react'
import { UserContext } from './UserContext'
import { MainContext } from './MainContext'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'
import CartContextTypes from '../_Interfaces/Contexts/CartContext'
import TypeProducts from '../_Interfaces/TypeProducts'

export const CartContext = createContext<CartContextTypes>({
    MyCart: { MyCart: [], Totalprice: 0 },
    setMyCart: () => { },
    isLoadingCartIcon: true,
    setisLoadingCartIcon: () => { }, AddProductToCart: () => { }, RemoveProductFormCart: () => { }, DeleteProductFromCart: () => { },
    DeleteAllCart: () => { }
})

export default function CartContextProvider({ children }: any) {
    const [MyCart, setMyCart] = useState<{ MyCart: TypeProducts[], Totalprice: number }>({ MyCart: [], Totalprice: 0 })
    const [isLoadingCartIcon, setisLoadingCartIcon] = useState(true)
    const Router = useRouter()
    const Path = usePathname()
    const { UserToken, headers } = useContext(UserContext)
    const { TV, setTV } = useContext(MainContext)



    async function AddProductToCart(productID: (number | null)) {
        if (TV === -1) {
            if (productID !== null) {
                setTV(productID - 10000)
                const tosatLoading = toast.loading("Waiting...")
                try {
                    const Data = await axios.post("https://fofo-store-back-end.vercel.app/Cart", { productID }, { headers })
                    setMyCart(Data.data.Cart)
                    toast.success(Data.data.message)
                    setTV(-1)
                } catch (err: any) {
                    toast.error(err.response.data.message)
                    if (err?.response?.status === 400) {
                        if (Path !== "/") {
                            Router.push("/Login")
                        }
                    }
                }
                toast.remove(tosatLoading)
                setTV(-1)
            }
        } else {
            toast.dismiss()
            toast.error("Your request is in progress !")
        }

        return;

    }

    async function RemoveProductFormCart(productID: (number | null)) {
        if (TV === -1 && productID) {
            setTV(productID - 100000)
            const tosatLoading = toast.loading("Waiting...")
            try {
                const Data = await axios.patch("https://fofo-store-back-end.vercel.app/Cart", { productID }, { headers })
                setMyCart(Data.data.Cart)
                toast.success(Data.data.message)
            } catch (err: any) {
                toast.error(err.response.data.message)
            }
            toast.remove(tosatLoading)
            setTV(-1)
        } else {
            toast.dismiss()
            toast.error("Your request is in progress !")
        }

    }

    async function DeleteProductFromCart(productID: (number | null)) {
        if (TV === -1 && productID) {
            setTV(productID - 1000000)
            const tosatLoading = toast.loading("Waiting...")
            try {
                const Data = await axios.delete(`https://fofo-store-back-end.vercel.app/Cart/${productID}`, { headers })
                setMyCart(Data.data.Cart)
                toast.success(Data.data.message)
            } catch (err: any) {
                toast.error(err.response.data.message)
            }
            toast.remove(tosatLoading)
            setTV(-1)
        } else {
            toast.dismiss()
            toast.error("Your request is in progress !")
        }


    }

    async function DeleteAllCart(index: any) {
        if (TV === -1) {
            setTV(index)
            const tosatLoading = toast.loading("Waiting...")
            try {
                const data = await axios.delete(`https://fofo-store-back-end.vercel.app/AllCart`, { headers })
                console.log(data);

                setMyCart(data.data.Cart)
                toast.success(data.data.message)
            } catch (err: any) {
                toast.error(err.response.data.message)
            }
            toast.remove(tosatLoading)
            setTV(-1)
        } else {
            toast.error("Your request is in progress !")
        }
    }

    return <CartContext.Provider value={{ MyCart, setMyCart, isLoadingCartIcon, setisLoadingCartIcon, AddProductToCart, RemoveProductFormCart, DeleteProductFromCart, DeleteAllCart }}>{children}</CartContext.Provider>
}
