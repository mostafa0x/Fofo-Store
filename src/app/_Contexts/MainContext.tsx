"use client";
import React, { createContext, useEffect, useState } from 'react'
import MainContextTypes from '../_Interfaces/Contexts/MainContextType';
import TypeProducts from '../_Interfaces/TypeProducts';

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
  const [ItemFillters, setItemFillters] = useState<TypeProducts[]>([])
  const [TV, setTV] = useState<number>(-1)

  useEffect(() => {
    console.log(ItemFillters);

  }, [ItemFillters])


  return <MainContext.Provider value={{ SearchTXT, setSearchTXT, ItemFillters, setItemFillters, TV, setTV }}>{children}</MainContext.Provider>

}
