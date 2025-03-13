"use client";
import { useContext, useEffect } from "react";
import { MainContext } from "./_Contexts/MainContext";
import { TypesContexts } from "./_Interfaces/TypesContext";
import CategoriesBar from "./_Components/CategoriesBar";
import MainSlider from "./_Components/MainSlider";
import CategoriesSlider from "./_Components/CategoriesSlider";
import useCart from "./_Hooks/useCart";
import { CartContext } from "./_Contexts/CartContext";
import HooksTypes from "./_Interfaces/HooksType";
import { signOut } from "next-auth/react";




export default function Home() {
  let { SearchTXT, setSearchTXT, Data, setData } = useContext(MainContext);
  const { data, isError, error, isLoading, refetch }: HooksTypes = useCart()
  const { MyCart, setMyCart, setisLoadingCartIcon } = useContext(CartContext)

  useEffect(() => {
    setisLoadingCartIcon(isLoading)
  }, [isLoading])

  useEffect(() => {
    if (error?.status === 401) {
      signOut()
    }
  }, [error?.status])

  useEffect(() => {
    if (Array.isArray(data?.data?.Cart?.MyCart)) {
      setMyCart(data?.data?.Cart)
    }
  }, [data])

  if (isLoading) {
    return <div className="flex justify-center pt-72" role="status">
      <svg aria-hidden="true" className="w-28 h-28 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  }

  if (isError) {


    return <div><h1>{error?.response?.data?.message}</h1></div>
  }


  return (

    <div >
      <div className="pt-20"><CategoriesBar /></div>
      <div className=""> <MainSlider /></div>
      <div className=""> <CategoriesSlider /></div>

      <div className=" p-24 pt-6">
        <h1>Home is Here</h1>
        {Data?.map((items, index) => {
          return <h1 key={index}>{items}</h1>
        })}</div>

    </div>
  );
}
