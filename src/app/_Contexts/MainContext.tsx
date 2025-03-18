"use client";
import React, { createContext, useEffect, useState } from 'react'
import MainContextTypes from '../_Interfaces/Contexts/MainContextType';
import TypeProducts from '../_Interfaces/TypeProducts';

export const MainContext = createContext<MainContextTypes>({
  SearchTXT: null,
  setSearchTXT: () => { [] },
  TV: -1,
  setTV: () => { }
});


export default function MainContextProvider({
  children
}: any) {
  const [SearchTXT, setSearchTXT] = useState<string | null>(null)
  const [TV, setTV] = useState<number>(-1)


  return <MainContext.Provider value={{ SearchTXT, setSearchTXT, TV, setTV }}>{children}</MainContext.Provider>

}
