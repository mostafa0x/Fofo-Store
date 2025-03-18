'use client'
import React, { createContext, useEffect, useState } from 'react'
import CategoriesContextType from '../_Interfaces/Contexts/CategoriesContextTYPE'
export const CategoriesContext = createContext<CategoriesContextType>({
    Categories: [], setCategories: () => { }
})

export default function CategoriesContextProvider({ children }: any) {
    const [Categories, setCategories] = useState([])

    return <CategoriesContext.Provider value={{ Categories, setCategories }}>{children}</CategoriesContext.Provider>
}
