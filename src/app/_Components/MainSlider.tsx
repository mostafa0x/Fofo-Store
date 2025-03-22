'use client';
import React, { useContext } from 'react';
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
    };

    return (
        <div className="bg-gray-100 py-16">
            {/* العنوان */}
            <h1 className="text-center text-3xl font-semibold text-gray-800 mb-8">
                Explore Our Best Products
            </h1>

            <div className="max-w-screen-xl mx-auto px-4">
                {/* ترتيب الصور: تقسيم الى جزءين */}
                <div className="grid grid-cols-2 gap-8">

                    {/* الجزء الأيسر: صورتين فوق بعض */}
                    <div className="flex flex-col gap-4 w-full">
                        {/* الصورة الأولى */}
                        <div className="relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500 ease-in-out">
                            <img
                                src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074075.jpg"
                                alt="Product 1"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="absolute bottom-0 left-0 p-5 text-white bg-black bg-opacity-50 w-full text-center">
                                <h2 className="text-lg font-semibold">Product 1</h2>
                            </div>
                        </div>

                        {/* الصورة الثانية */}
                        <div className="relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500 ease-in-out">
                            <img
                                src="https://blog.thinkingschool.vn/wp-content/uploads/2021/01/Shopping.jpg"
                                alt="Product 2"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="absolute bottom-0 left-0 p-5 text-white bg-black bg-opacity-50 w-full text-center">
                                <h2 className="text-lg font-semibold">Product 2</h2>
                            </div>
                        </div>
                    </div>

                    {/* الجزء الأيمن: صورة كبيرة مع Slider */}
                    <div className="w-full">
                        <div className="relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500 ease-in-out">
                            {/* هذا هو Slider للصورة الكبيرة */}
                            <Slider {...settings}>
                                <img
                                    src="https://www.searchenginejournal.com/wp-content/uploads/2022/08/google-shopping-ads-6304dccb7a49e-sej-1280x720.png"
                                    alt="Main Product"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <img
                                    src="https://img.freepik.com/free-photo/modern-creative-glass-jar-with-orange-fruit-pulp_1150-5567.jpg"
                                    alt="Main Product 2"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <img
                                    src="https://www.expertreviews.co.uk/sites/expertreviews/files/2021/05/Best-Kitchen-Appliances-Under-100.jpg"
                                    alt="Main Product 3"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </Slider>
                            <div className="absolute bottom-0 left-0 p-5 text-white bg-black bg-opacity-50 w-full text-center">
                                <h2 className="text-xl font-semibold">Main Product</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
