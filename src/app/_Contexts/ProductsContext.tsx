"use client"
import React, { createContext, useState } from 'react'
import ProductsContextTypes from '../_Interfaces/Contexts/ProductsContextType'

export const ProductsContext = createContext<ProductsContextTypes>({
    Products: [],
    setProducts: () => { [] }
})

export default function ProductsContextProvider({ children }: any) {
    const [Products, setProducts] = useState<string[]>([])



    return <ProductsContext.Provider value={{ Products, setProducts }}>{children}</ProductsContext.Provider>

}
