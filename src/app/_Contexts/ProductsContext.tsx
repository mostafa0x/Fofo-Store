"use client"
import React, { createContext, useEffect, useState } from 'react'
import ProductsContextTypes from '../_Interfaces/Contexts/ProductsContextType'
import TypeProducts from '../_Interfaces/TypeProducts'
import { useParams } from 'next/navigation'

export const ProductsContext = createContext<ProductsContextTypes>({
    Products: [],
    setProducts: () => { [] },
    ProdutcsByCategory: null,
    setProdutcsByCategory: () => null,
    PageCategoryLoading: true, setPageCategoryLoading: () => { }
})

export default function ProductsContextProvider({ children }: any) {
    const [Products, setProducts] = useState<TypeProducts[]>([])
    const [ProdutcsByCategory, setProdutcsByCategory] = useState<TypeProducts[] | null>(null)
    const [PageCategoryLoading, setPageCategoryLoading] = useState<boolean>(true)
    const { CategoryName } = useParams()

    useEffect(() => {
        if (Products.length > 0) {
            const FilterProduct = Products.filter((product) => {
                return product.category?.name == CategoryName
            })
            setProdutcsByCategory(FilterProduct)
        }
    }, [Products])

    useEffect(() => {
        ProdutcsByCategory && setPageCategoryLoading(false)
    }, [ProdutcsByCategory])





    return <ProductsContext.Provider value={{ Products, setProducts, ProdutcsByCategory, setProdutcsByCategory, PageCategoryLoading, setPageCategoryLoading }}>{children}</ProductsContext.Provider>

}
