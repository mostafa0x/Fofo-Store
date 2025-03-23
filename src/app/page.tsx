"use client";
import { useContext, useEffect } from "react";
import { MainContext } from "./_Contexts/MainContext";
import MainSlider from "./_Components/MainSlider";
import CategoriesSlider from "./_Components/CategoriesSlider";
import Products from "./_Components/Products";




export default function Home() {
  let { setSearchTXT } = useContext(MainContext);

  useEffect(() => {
    window.scroll(0, 0)
    setSearchTXT(null)
  }, [])



  return (
    <>
      <div >
        {/* <div className="pt-20"><CategoriesBar /></div> */}
        <div className=""> <MainSlider /></div>
        <div className=""> <CategoriesSlider /></div>

        <div className=" p-24 pt-6">
          <h1 className='p-5 font-semibold text-2xl '>Products</h1>
          <Products />
        </div>

      </div>
    </>);
}
