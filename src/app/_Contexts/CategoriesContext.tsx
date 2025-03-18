'use client'
import React, { createContext, useEffect, useState } from 'react'
import CategoriesContextType from '../_Interfaces/Contexts/CategoriesContextTYPE'
import CategoryType from '../_Interfaces/CategoryType'

export const CategoriesContext = createContext<CategoriesContextType>({
    Categories: [], setCategories: () => { },
    CurrentCategory: undefined, setCurrentCategory: () => { }
})

export default function CategoriesContextProvider({ children }: any) {
    const [Categories, setCategories] = useState<CategoryType[]>([])
    const [CurrentCategory, setCurrentCategory] = useState<CategoryType | undefined>(undefined)

    return <CategoriesContext.Provider value={{ Categories, setCategories, CurrentCategory, setCurrentCategory }}>{children}</CategoriesContext.Provider>
}
