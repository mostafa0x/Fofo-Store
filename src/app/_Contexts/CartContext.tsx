'use client'
import React, { createContext, useState } from 'react'
import { TypesContexts } from "../_Interfaces/TypesContext"

export const CartContext = createContext<TypesContexts>({
    MyCart: [],
    setMyCart: () => { }
})

export default function CartContextProvider({ Childen }: any) {
    const [MyCart, setMyCart] = useState([])

    return (
        <CartContext.Provider value={{ MyCart, setMyCart }}>{Childen}</CartContext.Provider>
    )
}
