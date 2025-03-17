"use client";
import React, { createContext, useState } from 'react'
import MainContextTypes from '../_Interfaces/Contexts/MainContextType';

export const MainContext = createContext<MainContextTypes>({
  SearchTXT: null,
  setSearchTXT: () => { [] },
  ItemFillters: [],
  setItemFillters: () => { [] },
  TV: -1,
  setTV: () => { }
});


export default function MainContextProvider({
  children
}: any) {
  const [SearchTXT, setSearchTXT] = useState<string | null>(null)
  const [ItemFillters, setItemFillters] = useState<string[]>([])
  const [TV, setTV] = useState<number>(-1)



  return <MainContext.Provider value={{ SearchTXT, setSearchTXT, ItemFillters, setItemFillters, TV, setTV }}>{children}</MainContext.Provider>

}
