'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import CategoriesContextType from '../_Interfaces/Contexts/CategoriesContextTYPE'
import CategoryType from '../_Interfaces/CategoryType'
import { useParams, usePathname } from 'next/navigation'
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
    const Path = usePathname()


    useEffect(() => {
        if (Categories.length > 0) {
            const CurrCategory = Categories.find((Category) => {
                return Category.name == CategoryName
            })
            const selectedCategory = CurrCategory ? CurrCategory : Categories[0]
            setCurrentCategory(selectedCategory)

            const Selector = document.getElementById("mySelect") as HTMLSelectElement
            if (Selector) {
                const selectedIndex = Categories.findIndex(category => category.name === selectedCategory.name)
                Selector.selectedIndex = selectedIndex
            }
            setLoadingIconOptions(false)
        }
    }, [Categories, CategoryName, Path])

    useEffect(() => {

        const Selector = document.getElementById("mySelect") as HTMLSelectElement
        if (Selector) {
            const selectedIndex = Categories.findIndex(category => category.name === CategoryName)
            Selector.selectedIndex = selectedIndex
        }
    }, [])



    return <CategoriesContext.Provider value={{ Categories, setCategories, CurrentCategory, setCurrentCategory, LoadingIconOptions, setLoadingIconOptions }}>{children}</CategoriesContext.Provider>
}
