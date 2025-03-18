"use client"
import React, { createContext, useState } from 'react'
import ProductsContextTypes from '../_Interfaces/Contexts/ProductsContextType'
import TypeProducts from '../_Interfaces/TypeProducts'

export const ProductsContext = createContext<ProductsContextTypes>({
    Products: [],
    setProducts: () => { [] },
    ProdutcsByCategory: [],
    setProdutcsByCategory: () => { [] }
})

export default function ProductsContextProvider({ children }: any) {
    const [Products, setProducts] = useState<TypeProducts[]>([])
    const [ProdutcsByCategory, setProdutcsByCategory] = useState<TypeProducts[]>([])



    return <ProductsContext.Provider value={{ Products, setProducts, ProdutcsByCategory, setProdutcsByCategory }}>{children}</ProductsContext.Provider>

}
