"use client";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "./_Contexts/MainContext";
import CategoriesBar from "./_Components/CategoriesBar";
import MainSlider from "./_Components/MainSlider";
import CategoriesSlider from "./_Components/CategoriesSlider";
import useCart from "./_Hooks/useCart";
import { CartContext } from "./_Contexts/CartContext";
import HooksTypes from "./_Interfaces/HooksType";
import { signOut, useSession } from "next-auth/react";
import Products from "./_Components/Products";
import { usePathname } from "next/navigation";
import { UserContext } from "./_Contexts/UserContext";
import Head from "next/head";





export default function Home() {
  const Session = useSession()
  let { SearchTXT, setSearchTXT } = useContext(MainContext);
  const { MyCart, setMyCart, setisLoadingCartIcon } = useContext(CartContext)
  const [isLogOut, setisLogOut] = useState(false)
  const { UserToken, headers } = useContext(UserContext)


  useEffect(() => {
    window.scroll(0, 0)
    setSearchTXT(null)
  }, [])



  return (
    <>
      <div >
        <div className="pt-20"><CategoriesBar /></div>
        <div className=""> <MainSlider /></div>
        <div className=""> <CategoriesSlider /></div>

        <div className=" p-24 pt-6">
          <h1 className='p-5 font-semibold text-2xl '>Products</h1>
          <Products />
        </div>

      </div>
    </>);
}
