import React, { useContext } from 'react'
import { MainContext } from '../_Contexts/MainContext';
import Pottery from "../../img/Pottery.png"
import Woodware from "../../img/Woodware.png"
import Wicker from "../../img/Wicker.png"
import Bags from "../../img/bags.png"
import RugsKilim from "../../img/Rugs & Kilim.png"
import ArtsNature from "../../img/Arts & Nature.png"


export default function CategoriesSlider() {
    let { Category } = useContext(MainContext);
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

            {Category?.map((Category, index: number) => {
                return <div key={index} className=' bg-white border border-black border-opacity-25 p-3 pl-10 pr-10  text-black items-center text-center cursor-pointer rounded-2xl'>
                    <img src={`https://s3.us-west-1.amazonaws.com/shop.egyantiques-bucket/wp-content/uploads/2022/12/16023346/Pottery.Menu-Thumbnails1.png`} alt="" />
                    <h1 className=' font-semibold'>{Category}</h1>
                </div>
            })}
        </div></div>


    )
}
