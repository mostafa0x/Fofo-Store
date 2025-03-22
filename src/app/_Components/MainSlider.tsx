'use client';
import React, { useContext, useEffect } from 'react';
import { CategoriesContext } from '../_Contexts/CategoriesContext';
import Slider from 'react-slick';

export default function MainSlider() {
    const { Categories } = useContext(CategoriesContext);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000
    };



    return (
        <div className="bg-gray-100 py-18">
            <h1 className="text-center text-3xl font-semibold text-gray-800 mb-8">
                Explore Our Best Products
            </h1>

            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-2 gap-8">

                    <div className="flex flex-col gap-4 w-full">
                        <div className="relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500 ease-in-out">
                            <img
                                src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074075.jpg"
                                alt="Product 1"
                                className="w-full h-48 object-fill rounded-lg"
                            />
                            <div className="absolute bottom-0 left-0 p-5 text-white bg-black bg-opacity-50 w-full text-center">
                                <h2 className="text-lg font-semibold">Various products
                                </h2>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500 ease-in-out">
                            <img
                                src="https://blog.thinkingschool.vn/wp-content/uploads/2021/01/Shopping.jpg"
                                alt="Product 2"
                                className="w-full h-48 object-fill rounded-lg"
                            />
                            <div className="absolute bottom-0 left-0 p-5 text-white bg-black bg-opacity-50 w-full text-center">
                                <h2 className="text-lg font-semibold">Latest products
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="relativeoverflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500 ease-in-out">
                            <Slider {...settings}>
                                <img
                                    src="https://www.searchenginejournal.com/wp-content/uploads/2022/08/google-shopping-ads-6304dccb7a49e-sej-1280x720.png"
                                    alt="Main Product"
                                    className="w-full  h-[370px] object-fill rounded-lg"
                                />
                                <img
                                    src="https://static.vecteezy.com/system/resources/thumbnails/026/481/463/small_2x/friends-with-shopping-bags-in-shopping-mall-background-with-empty-space-for-textrealism-photo.jpg"
                                    alt="Main Product 2"
                                    className="w-full  h-[370px] object-fill rounded-lg"
                                />
                                <img
                                    src="https://marketplace.canva.com/EAGQ1aYlOWs/1/0/1600w/canva-blue-colorful-illustrative-e-commerce-online-shop-logo-bHiX_0QpJxE.jpg"
                                    alt="Main Product 3"
                                    className="w-full  h-[370px] object-fill rounded-lg"
                                />
                            </Slider>
                            <div className="absolute bottom-0 left-0  text-white bg-black bg-opacity-50 w-full text-center">
                                <h2 className="text-xl font-semibold">
                                    An online marketing platform allows users to buy and sell products and services easily and securely.
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
