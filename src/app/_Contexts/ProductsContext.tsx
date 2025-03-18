"use client"
import React, { createContext, useEffect, useState } from 'react'
import ProductsContextTypes from '../_Interfaces/Contexts/ProductsContextType'
import TypeProducts from '../_Interfaces/TypeProducts'
import { useParams } from 'next/navigation'

type Parms = {
    name: string,
    CategoryName: string
}

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
    const { CategoryName, name } = useParams<Parms>()

    useEffect(() => {
        const namedecode = decodeURIComponent(name)
        if (Products.length > 0 && CategoryName) {
            const FilterProduct = CategoryName !== "All" ? Products.filter((product) => {
                return product.category?.name == CategoryName
            }) : Products
            if (name) {
                const Filterx2 = FilterProduct.filter((product) => {
                    return product.title?.toLowerCase().includes(namedecode.toLowerCase())
                })
                setProdutcsByCategory(Filterx2)
            } else {
                setProdutcsByCategory(FilterProduct)
            }
        }
    }, [Products])

    useEffect(() => {
        ProdutcsByCategory && setPageCategoryLoading(false)
    }, [ProdutcsByCategory])





    return <ProductsContext.Provider value={{ Products, setProducts, ProdutcsByCategory, setProdutcsByCategory, PageCategoryLoading, setPageCategoryLoading }}>{children}</ProductsContext.Provider>

}
