"use client";
import React, { createContext, useState } from 'react'
import { TypesContexts } from "../_Interfaces/TypesContext"

export const MainContext = createContext<TypesContexts>({
  SearchTXT: null,
  setSearchTXT: () => { },
  ItemFillters: [],
  setItemFillters: () => { },
  Category: [],
  setCategory: () => { },
  TV: 1,
  Middleware: null, setMiddleware: () => { }
});

export function Hi(x: Number) {
  console.log("hiiiiiiiiii ");

}

export default function MainContextProvider({
  children
}: any) {
  const [SearchTXT, setSearchTXT] = useState(null)
  const [ItemFillters, setItemFillters] = useState([])
  const [Category, setCategory] = useState(["Pottery", "Woodware", "Wicker", "Bags", "Rugs & Kilim", "Arts & Nature"])
  const [TV, setTV] = useState(1)
  const [Middleware, setMiddleware] = useState(null)



  return <MainContext.Provider value={{ SearchTXT, setSearchTXT, ItemFillters, setItemFillters, Category, setCategory, TV, setTV, Middleware, setMiddleware }}>{children}</MainContext.Provider>

}
