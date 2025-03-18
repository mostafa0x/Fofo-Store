'use client'
import React, { useContext } from 'react'
import { MainContext } from '../_Contexts/MainContext';
import Pottery from "../../img/Pottery.png"
import Woodware from "../../img/Woodware.png"
import Wicker from "../../img/Wicker.png"
import Bags from "../../img/bags.png"
import RugsKilim from "../../img/Rugs & Kilim.png"
import ArtsNature from "../../img/Arts & Nature.png"
import { CategoriesContext } from '../_Contexts/CategoriesContext';
import CategoryType from '../_Interfaces/CategoryType';
import useCategories from '../_Hooks/useCategories';
import Link from 'next/link';

export default function CategoriesSlider() {
    const { Categories } = useContext(CategoriesContext)
    const { isLoading, isError, error } = useCategories()

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        autoplaySpeed: 1500,
        autoplay: false,
        arrows: false,
    };
    return (<div>
        <h1 className=' p-5 pl-24 font-semibold text-2xl'>Shop by categories</h1>
        <div className='z-[0] px-24 pt-4 pb-6 flex justify-between gap-4 '>

            {Categories?.map((Category: CategoryType, index: number) => {
                return <div key={index} className=' bg-white border border-black border-opacity-25 p-3 pl-10 pr-10  text-black items-center text-center cursor-pointer rounded-2xl'>
                    <Link href={`/Category/${Category.name}`}>
                        <img src={Category.image} alt={Category.name} />
                        <h1 className=' font-semibold'>{Category.name}</h1>
                    </Link>
                </div>
            })}
        </div></div>


    )
}
