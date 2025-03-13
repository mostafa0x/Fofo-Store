"use client";
import React, { createContext, useState } from 'react'
import { TypesContexts } from "../_Interfaces/TypesContext"

export const MainContext = createContext<TypesContexts>({
  SearchTXT: null,
  setSearchTXT: () => { },
  Data: ['Apple',
    'Banana',
    'Orange',
    'Mango',
    'Grapes',
    'Pineapple',],
  ItemFillters: [],
  setItemFillters: () => { },
  Category: [],
  setCategory: () => { },
  TV: 1,
  setTV: () => { },
});

export default function MainContextProvider({
  children
}: any) {
  const [SearchTXT, setSearchTXT] = useState(null)
  const [Data, setData] = useState([
    'Apple',
    'Banana',
    'Orange',
    'Mango',
    'Grapes',
    'Pineapple',
  ])
  const [ItemFillters, setItemFillters] = useState([])
  const [Category, setCategory] = useState(["Pottery", "Woodware", "Wicker", "Bags", "Rugs & Kilim", "Arts & Nature"])
  const [TV, setTV] = useState(1)
  return <MainContext.Provider value={{ SearchTXT, setSearchTXT, Data, setData, ItemFillters, setItemFillters, Category, setCategory, TV, setTV }}>{children}</MainContext.Provider>

}
