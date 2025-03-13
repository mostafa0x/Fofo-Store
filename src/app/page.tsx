"use client";
import { useContext, useEffect } from "react";
import { MainContext } from "./_Contexts/MainContext";
import { TypesContexts } from "./_Interfaces/TypesContext";
import CategoriesBar from "./_Components/CategoriesBar";
import MainSlider from "./_Components/MainSlider";
import CategoriesSlider from "./_Components/CategoriesSlider";


export default function Home() {
  let { SearchTXT, setSearchTXT, Data, setData } = useContext(MainContext);
  useEffect(() => {

    // console.log(Data);



  }, [Data])


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
