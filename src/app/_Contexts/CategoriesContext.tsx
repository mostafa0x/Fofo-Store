'use client'
import React, { createContext, useEffect, useState } from 'react'
import CategoriesContextType from '../_Interfaces/Contexts/CategoriesContextTYPE'
import CategoryType from '../_Interfaces/CategoryType'

export const CategoriesContext = createContext<CategoriesContextType>({
    Categories: [], setCategories: () => { }
})

export default function CategoriesContextProvider({ children }: any) {
    const [Categories, setCategories] = useState<CategoryType[]>([])

    return <CategoriesContext.Provider value={{ Categories, setCategories }}>{children}</CategoriesContext.Provider>
}
