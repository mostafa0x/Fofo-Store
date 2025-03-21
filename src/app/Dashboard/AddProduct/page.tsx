"use client";
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useCategories from '@/app/_Hooks/useCategories';
import { CategoriesContext } from '@/app/_Contexts/CategoriesContext';
import { MainContext } from '@/app/_Contexts/MainContext';
import TypeProducts from '@/app/_Interfaces/TypeProducts';



export default function AddProduct() {
    let Vyup = Yup.object().shape({
        image: Yup.string().required("Enter image !"),
        title: Yup.string().min(4, "min 4 chr").required("Enter Name !"),
        price: Yup.number().moreThan(9, "Enter number bigger than 9").required("Enter Price !"),
        description: Yup.string().min(8, "min 8 chr").required("Enter description !"),
        category: Yup.object().required("Enter category !"),
        stock: Yup.number().moreThan(-1, "0 or >>").required("Enter Stock"),
        DisPercentage: Yup.number().moreThan(-1, "0 or >>").max(100, "Max 100").required("Enter Discount Percentage")
    })
    const [ApiError, setApiError] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [PageLoading, setPageLoading] = useState(true);
    const { } = useCategories()
    const { Categories } = useContext(CategoriesContext)
    let Router = useRouter();
    const [SelectedCategory, setSelectedCategory] = useState<any | null>(null)
    const { TV, setTV, EditMode, setEditMode } = useContext(MainContext)
    const [ProdcutById, setProdcutById] = useState<TypeProducts | null>(null)


    async function handlePostProducts(formvalues: any) {
        setApiError(null)
        setisLoading(true);

        const formData = new FormData();
        console.log(formvalues);

        formData.append("title", formvalues.title)
        formData.append("description", formvalues.description)
        formData.append("price", formvalues.price)
        formData.append("category", JSON.stringify(formvalues.category))
        formData.append("stock", formvalues.stock)
        formData.append("DisPercentage", formvalues.DisPercentage)
        Array.from(formvalues.image).forEach((file: any) => {
            formData.append("images", file)

        })



        try {
            const Data = await axios.post("http://localhost:3001/admin/product", formData)
            setisLoading(false);
            toast.success(Data.data.message)
            Router.push("/Dashboard/Products")
        } catch (err: any) {
            console.log(err);
            setApiError(err.response.data.message)
            toast.error(err.response.data.message)
            setisLoading(false);
        }

    }
    let formik = useFormik<TypeProducts>({
        initialValues: {
            title: "",
            description: "",
            price: 0,
            category: { name: "", id: 0, image: "" },
            images: [],
            stock: 0,
            DisPercentage: 0,

        }, validationSchema: Vyup, onSubmit: handlePostProducts
    })

    useEffect(() => {
        if (ProdcutById) {

            formik.setValues({
                id: ProdcutById?.id,
                title: ProdcutById?.title,
                price: ProdcutById?.price,
                description: ProdcutById?.description,
                stock: ProdcutById?.stock,
                DisPercentage: ProdcutById?.DisPercentage,
                category: ProdcutById?.category
            })

            setPageLoading(false)
            console.log(formik.values);
            const Selector = document.getElementById("selector") as HTMLSelectElement
            if (Selector) {
                const CurrIndex = Categories.findIndex((cagetory) => {
                    return cagetory.name == ProdcutById.category?.name
                })
                Selector.selectedIndex = CurrIndex
            }
        }
    }, [ProdcutById])

    async function GetProdcutByID() {
        try {
            const Data = await axios.get(`http://localhost:3001/Product/${EditMode}`)
            setProdcutById(Data.data.Product)
            console.log(Data);
        } catch (err) {
            console.log(err);
            throw err

        }
    }
    useEffect(() => {
        window.scroll(0, 0);

        if (!ProdcutById && EditMode) {
            GetProdcutByID()
        }
        if (!EditMode) {
            setPageLoading(false)

        }
        return () => {
            setisLoading(false)
            setApiError(null)
            setSelectedCategory(null)
            setPageLoading(true)
            setTV(-1)
        }

    }, [])
    useEffect(() => {
        if (Categories.length > 0) {
            formik.setFieldValue('category', Categories[1])
        }
    }, [Categories])

    useEffect(() => {
        SelectedCategory && formik.setFieldValue('category', SelectedCategory)
    }, [SelectedCategory])


    if (PageLoading) {
        return <div className=' flex justify-center items-center min-h-screen p-24'>
            <span className="loading loading-spinner loading-lg transform scale-150"></span>
        </div>
    }

    return (
        <form onSubmit={formik.handleSubmit}>

            <div className=' p-24'>
                {EditMode ? <h1>Update Product</h1> : <h1>Post Product</h1>}
                <div className=' flex justify-center items-center flex-col gap-6'>
                    <span className='txtdash'> image Product</span>
                    <div className='flex flex-row gap-4'>
                        {!EditMode ? null : ProdcutById?.images?.map((x, index) => (
                            <img
                                key={index}
                                src={x}
                                className='w-20 h-20 object-fill'
                                alt={`Product image ${index}`}
                            />
                        ))}
                    </div>


                    <input id='images' multiple name='images' type="file" accept="image/*" onChange={(event) => formik.setFieldValue('images', event?.currentTarget?.files)} className='border border-black rounded-lg' required />
                    {formik.errors.images && formik.touched.images ? (
                        <div
                            className="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {formik.errors.images}
                        </div>
                    ) : null}
                    <span className='txtdash'> title Product</span>
                    <input id='title' name='title' value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} className=' pl-4 border border-black rounded-lg' type="text" placeholder='Enter title Product' />
                    {formik.errors.title && formik.touched.title ? (
                        <div
                            className="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {formik.errors.title}
                        </div>
                    ) : null}
                    <span className='txtdash'> Price Product</span>
                    <input id='price' name='price' value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} className=' pl-4 border border-black rounded-lg text-center' type="number" placeholder='Enter Price Product' />
                    {formik.errors.price && formik.touched.price ? (
                        <div
                            className="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {formik.errors.price}
                        </div>
                    ) : null}
                    <span className='txtdash'> Stock Product</span>
                    <input id='stock' name='stock' value={formik.values.stock} onChange={formik.handleChange} onBlur={formik.handleBlur} className=' pl-4 border border-black rounded-lg text-center' type="number" placeholder='Enter stock Product' />
                    {formik.errors.stock && formik.touched.stock ? (
                        <div
                            className="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {formik.errors.stock}
                        </div>
                    ) : null}
                    <span className='txtdash'> Discount Percentage Item</span>
                    <input id='DisPercentage' name='DisPercentage' value={formik.values.DisPercentage} onChange={formik.handleChange} onBlur={formik.handleBlur} className=' pl-4 border border-black rounded-lg text-center' type="number" placeholder='Enter Discount Percentage Product %' />
                    {formik.errors.DisPercentage && formik.touched.DisPercentage ? (
                        <div
                            className="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {formik.errors.DisPercentage}
                        </div>
                    ) : null}
                    <span className='txtdash'> description Product</span>
                    <textarea id='description' name='description' value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} className='pt-2 pl-2 border border-black rounded-lg text-left w-64 h-24 leading-tight resize-none' placeholder='Enter description Product'></textarea>
                    {formik.errors.description && formik.touched.description ? (
                        <div
                            className="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {formik.errors.description}
                        </div>
                    ) : null}
                    <span className='txtdash'> Categories</span>
                    <select id='selector' onChange={(e) => {
                        const selectedCategory = Categories.find(category => category.name === e.currentTarget.value);
                        setSelectedCategory(selectedCategory)
                    }}>
                        {Categories.map((category, index: number) => {
                            return category.name !== "All" && <option key={index}>{category.name}</option>
                        })}

                    </select>
                    {formik.errors.category && formik.touched.category ? (
                        <div
                            className="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {formik.errors.category}
                        </div>
                    ) : null}
                    {isLoading ? <i className="fa-duotone fa-solid fa-spinner fa-spin text-3xl"></i> : <div className=' p-10 w-54 h-44'>
                        <button type='submit' className="btn btn-success text-center text-lg  px-12">Success</button>
                    </div>}
                    {ApiError ? (
                        <div
                            className="text-2xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {ApiError}
                        </div>
                    ) : null}
                </div>
            </div >


        </form>

    )
}
