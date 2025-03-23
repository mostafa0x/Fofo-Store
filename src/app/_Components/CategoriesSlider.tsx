'use client';
import React, { useContext } from 'react';
import { CategoriesContext } from '../_Contexts/CategoriesContext';
import CategoryType from '../_Interfaces/CategoryType';
import useCategories from '../_Hooks/useCategories';
import Link from 'next/link';

export default function CategoriesSlider() {
    const { Categories } = useContext(CategoriesContext);
    const { } = useCategories();



    return (
        <div className="bg-gray-50 py-8">
            <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">
                Shop by Categories
            </h1>

            <div className="flex justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full px-48 sm:px-8 lg:pl-48">
                    {Categories?.slice(1).map((Category: CategoryType, index: number) => (
                        <Link key={index} href={`/Category/${Category.name}`}>
                            <div
                                className="group relative bg-white border border-gray-200 p-4 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-gray-100 cursor-pointer"
                            >

                                <img
                                    src={Category.image}
                                    alt={Category.name}
                                    className="w-full h-40 object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
                                />
                                <h2 className="mt-4 text-xl font-medium text-gray-800 group-hover:text-blue-600 transition-all duration-200">
                                    {Category.name}
                                </h2>

                                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-0 transition-all duration-300 rounded-xl"></div>
                            </div>
                        </Link>

                    ))}
                </div>
            </div>
        </div>
    );
}
