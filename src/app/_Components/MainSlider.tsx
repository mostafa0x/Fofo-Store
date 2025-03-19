import React, { useContext } from 'react'
import Slider from "react-slick";
import { CategoriesContext } from '../_Contexts/CategoriesContext';
import Image from 'next/image';



export default function MainSlider() {
    const { Categories } = useContext(CategoriesContext)
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
    return (
        <div className='z-[0] p-24'>
            <div className="grid grid-cols-3 gap-6">

                {/* <Image
                    src="/img/test"
                    alt="Bag Image"
                    width={100}
                    height={60}
                    className="w-full h-60 object-fill"
                /> */}

                {/* <Image src="https://s3.us-west-1.amazonaws.com/shop.egyantiques-bucket/wp-content/uploads/2023/02/16023231/%D8%AA%D8%AD%D9%81-%D9%88%D8%A7%D9%86%D8%AA%D9%8A%D9%83%D8%A7-%D8%A7%D9%8A%D8%AC%D9%8A%D8%A8%D8%AA-%D8%A7%D9%86%D8%AA%D9%8A%D9%83%D8%B3.jpg" alt="" className="w-full h-60 object-fill " />
                <Image src="https://s3.us-west-1.amazonaws.com/shop.egyantiques-bucket/wp-content/uploads/2023/02/16023233/%D8%A7%D8%AC%D9%8A%D8%A8%D8%AA-%D8%A7%D9%86%D8%AA%D9%8A%D9%83%D8%B3-%D8%A7%D9%84%D9%83%D9%84%D9%8A%D9%85.jpg" alt="" className="w-full h-60 object-contain " />
                <Image src="https://s3.us-west-1.amazonaws.com/shop.egyantiques-bucket/wp-content/uploads/2023/02/16023234/wiker1.jpg" alt="" className="w-full h-60  object-contain" />
                <Image src="https://s3.us-west-1.amazonaws.com/shop.egyantiques-bucket/wp-content/uploads/2023/02/16023235/Salt-lamp.jpg" alt="" className="w-full h-60 object-contain " />

                <Image src="https://s3.us-west-1.amazonaws.com/shop.egyantiques-bucket/wp-content/uploads/2023/09/22045447/%D8%B9%D8%B1%D9%88%D8%B6-%D9%83%D9%84-%D8%AC%D9%85%D8%B9%D8%A9-.jpg" alt="" className="w-[1550] h-60 object-contain " /> */}

            </div>
        </div>





    )
}
