'use client'
import React, { createContext, useEffect, useState } from 'react'
import { TypesContexts } from "../_Interfaces/TypesContext"

export const CartContext = createContext<TypesContexts>({
    MyCart: { MyCart: [], Total: 0 },
    setMyCart: () => { },
    isLoadingCartIcon: true,
    setisLoadingCartIcon: () => { }
})

export default function CartContextProvider({ children }: any) {
    const [MyCart, setMyCart] = useState({ MyCart: [], Total: 0 })
    const [isLoadingCartIcon, setisLoadingCartIcon] = useState(true)

    useEffect(() => {
        console.log(MyCart);

    }, [MyCart])
    return <CartContext.Provider value={{ MyCart, setMyCart, isLoadingCartIcon, setisLoadingCartIcon }}>{children}</CartContext.Provider>
}
