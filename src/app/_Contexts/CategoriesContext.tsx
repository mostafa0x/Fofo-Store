'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import CategoriesContextType from '../_Interfaces/Contexts/CategoriesContextTYPE'
import CategoryType from '../_Interfaces/CategoryType'
import { useParams } from 'next/navigation'
import { ProductsContext } from './ProductsContext'

export const CategoriesContext = createContext<CategoriesContextType>({
    Categories: [], setCategories: () => { },
    CurrentCategory: undefined, setCurrentCategory: () => { },
    LoadingIconOptions: true, setLoadingIconOptions: () => { }
})

export default function CategoriesContextProvider({ children }: any) {
    const [Categories, setCategories] = useState<CategoryType[]>([])
    const [CurrentCategory, setCurrentCategory] = useState<CategoryType | undefined>(undefined)
    const [LoadingIconOptions, setLoadingIconOptions] = useState<boolean>(true)
    const { CategoryName } = useParams()
    const { } = useContext(ProductsContext)


    useEffect(() => {
        if (Categories.length > 0) {
            const CurrCategory = Categories.find((Category) => {
                return Category.name == CategoryName
            })
            setCurrentCategory(CurrCategory)
            setLoadingIconOptions(false)
        }
    }, [Categories])

    useEffect(() => {
        console.log(CurrentCategory);

    }, [CurrentCategory])



    return <CategoriesContext.Provider value={{ Categories, setCategories, CurrentCategory, setCurrentCategory, LoadingIconOptions, setLoadingIconOptions }}>{children}</CategoriesContext.Provider>
}
