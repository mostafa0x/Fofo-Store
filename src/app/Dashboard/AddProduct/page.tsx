"use client";
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from "yup"
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useCategories from '@/app/_Hooks/useCategories';
import { CategoriesContext } from '@/app/_Contexts/CategoriesContext';


export default function AddProduct() {
    let Vyup = Yup.object().shape({
        image: Yup.string().required("Enter image !"),
        name: Yup.string().min(4, "min 4 chr").required("Enter Name !"),
        price: Yup.number().moreThan(9, "Enter number bigger than 9").required("Enter Price !"),
        description: Yup.string().min(8, "min 8 chr").required("Enter description !"),
        category: Yup.string().min(4, "min 4 chr").required("Enter category !")
    })
    const [ApiError, setApiError] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [PageLoading, setPageLoading] = useState(true);
    const { } = useCategories()
    const { Categories } = useContext(CategoriesContext)
    let Router = useRouter();
    //  let selector = useRef<HTMLSelectElement | null>(null)
    const [SelectedCategory, setSelectedCategory] = useState<string | null>(null)



    async function handlePostProducts(formvalues: any) {
        setisLoading(true);
        const formData = new FormData();
        console.log(formvalues);
        formData.append("name", formvalues.name)
        formData.append("description", formvalues.description)
        formData.append("price", formvalues.price)
        formData.append("category", formvalues.category)
        formData.append("image", formvalues.image)
        console.log(formData);

        // await axios.post("https://google-auth-project-xi.vercel.app/products", formData).then((data) => {
        //     console.log(data);
        //     setisLoading(false);
        //     toast.success("sucess upload ")
        //     setPageLoading(true);
        //     Router.push("/Dashboard/Products")

        // }).catch((error) => {
        //     console.log(error);
        //     setisLoading(false);
        //     setApiError(error.message)
        // })
    }
    let formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            price: "",
            category: "",
            image: "",

        }, validationSchema: Vyup, onSubmit: handlePostProducts
    })
    useEffect(() => {
        window.scroll(0, 0);
        setPageLoading(false)


    }, [])

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

                <div className=' flex justify-center items-center flex-col gap-6'>
                    <span className='txtdash'> image Item</span>
                    <input id='image' name='image' type="file" accept="image/*" onChange={(event) => formik.setFieldValue('image', event?.currentTarget?.files?.[0])} className='border border-black rounded-lg' required />
                    {formik.errors.image && formik.touched.image ? (
                        <div
                            className="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {formik.errors.image}
                        </div>
                    ) : null}
                    <span className='txtdash'> Name Item</span>
                    <input id='name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className=' pl-4 border border-black rounded-lg' type="text" placeholder='Enter Name item' />
                    {formik.errors.name && formik.touched.name ? (
                        <div
                            className="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {formik.errors.name}
                        </div>
                    ) : null}
                    <span className='txtdash'> Price Item</span>
                    <input id='price' name='price' value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} className=' pl-4 border border-black rounded-lg text-center' type="number" placeholder='Enter Price item' />
                    {formik.errors.price && formik.touched.price ? (
                        <div
                            className="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {formik.errors.price}
                        </div>
                    ) : null}
                    <span className='txtdash'> description Item</span>
                    <textarea id='description' name='description' value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} className='pt-2 pl-2 border border-black rounded-lg text-left w-64 h-24 leading-tight resize-none' placeholder='Enter description item'></textarea>
                    {formik.errors.description && formik.touched.description ? (
                        <div
                            className="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {formik.errors.description}
                        </div>
                    ) : null}
                    <span className='txtdash'> Categories</span>
                    <select onChange={(e) => setSelectedCategory(e.currentTarget.value)}>
                        {Categories.map((category, index: number) => {
                            return category.name !== "All" && <option key={index}>{category.name}</option>
                        })}

                    </select>
                    {/* <input id='category' name='category' value={formik.values.category} onChange={formik.handleChange} onBlur={formik.handleBlur} className=' pl-4 border border-black rounded-lg text-center' placeholder='Enter Your Category' /> */}
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
