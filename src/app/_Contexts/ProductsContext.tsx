"use client"
import React, { createContext, useEffect, useState } from 'react'
import { TypesContexts } from '../_Interfaces/TypesContext'

export const ProductsContext = createContext<TypesContexts>({
    Products: [],
    setProducts: () => { }
})

export default function ProductsContextProvider({ children }: any) {
    const [Products, setProducts] = useState([])



    return <ProductsContext.Provider value={{ Products, setProducts }}>{children}</ProductsContext.Provider>

}
