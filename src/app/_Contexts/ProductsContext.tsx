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
    Products: null,
    setProducts: () => { [] },
    ProdutcsByCategory: null,
    setProdutcsByCategory: () => null,
    PageCategoryLoading: true, setPageCategoryLoading: () => null,
    ProductByID: null, setProductByID: () => null,
    PageProduct: true, setPageProduct: () => null
})

export default function ProductsContextProvider({ children }: any) {
    const [Products, setProducts] = useState<TypeProducts[] | null>(null)
    const [ProdutcsByCategory, setProdutcsByCategory] = useState<TypeProducts[] | null>(null)
    const [ProductByID, setProductByID] = useState<TypeProducts | null>({})
    const [PageProduct, setPageProduct] = useState<boolean>(true)

    const [PageCategoryLoading, setPageCategoryLoading] = useState<boolean>(true)
    const { CategoryName, name } = useParams<Parms>()

    useEffect(() => {
        const namedecode = decodeURIComponent(name)
        if (Products) {
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
            setPageProduct(false)

        }
    }, [Products, setProducts])

    useEffect(() => {
        if (ProdutcsByCategory) {


            ProdutcsByCategory?.map((product => product.PriceAfterDis = product.price && product.DisPercentage
                ? (product.price - (product.price * (product.DisPercentage / 100)))
                : product.price))
            setPageCategoryLoading(false)
        }
    }, [ProdutcsByCategory])


    useEffect(() => {
        if (ProductByID) {

            ProductByID.PriceAfterDis = ProductByID.price && ProductByID.DisPercentage
                ? (ProductByID.price - (ProductByID.price * (ProductByID.DisPercentage / 100)))
                : ProductByID.price
            setPageCategoryLoading(false)
        }
    }, [ProductByID])



    return <ProductsContext.Provider value={{ Products, setProducts, ProdutcsByCategory, setProdutcsByCategory, PageCategoryLoading, setPageCategoryLoading, ProductByID, setProductByID, PageProduct, setPageProduct }}>{children}</ProductsContext.Provider>

}
