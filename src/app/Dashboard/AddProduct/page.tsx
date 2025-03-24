"use client";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useCategories from "@/app/_Hooks/useCategories";
import { CategoriesContext } from "@/app/_Contexts/CategoriesContext";
import { MainContext } from "@/app/_Contexts/MainContext";
import TypeProducts from "@/app/_Interfaces/TypeProducts";
import CategoryType from "@/app/_Interfaces/CategoryType";

type TypeForimk = {
    id?: number | undefined;
    title: string | undefined;
    description: string | undefined;
    price: number | undefined;
    category: { name?: string; id?: number; image?: string } | undefined;
    images?: string | string[] | object;
    stock: number | undefined;
    DisPercentage: number | undefined;
};

export default function AddProduct() {
    const [ApiError, setApiError] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [PageLoading, setPageLoading] = useState(true);
    const { } = useCategories();
    const { Categories } = useContext(CategoriesContext);
    const Router = useRouter();
    const [SelectedCategory, setSelectedCategory] = useState<CategoryType | null | undefined>(null);
    const { setTV, EditMode, setEditMode } = useContext(MainContext);
    const [ProdcutById, setProdcutById] = useState<TypeProducts | null>(null);

    const Vyup = Yup.object().shape({
        title: Yup.string().min(4, "min 4 chr").required("Enter Name !"),
        price: Yup.number().moreThan(9, "Enter number bigger than 9").required("Enter Price !"),
        description: Yup.string().min(8, "min 8 chr").required("Enter description !"),
        category: Yup.object().required("Enter category !"),
        stock: Yup.number().moreThan(-1, "0 or >>").required("Enter Stock"),
        DisPercentage: Yup.number().moreThan(-1, "0 or >>").max(100, "Max 100").required("Enter Discount Percentage")
    });

    const formik = useFormik<TypeForimk>({
        initialValues: {
            title: "",
            description: "",
            price: 0,
            category: { name: "", id: 0, image: "" },
            images: [],
            stock: 0,
            DisPercentage: 0
        },
        validationSchema: Vyup,
        onSubmit: handlePostProducts
    });

    async function handlePostProducts(formvalues: any) {
        console.log(typeof formik.values.images);
        setApiError(null);
        setisLoading(true);
        const formData = new FormData();
        console.log(formvalues);
        formData.append("title", formvalues.title);
        formData.append("description", formvalues.description);
        formData.append("price", formvalues.price);
        formData.append("category", JSON.stringify(formvalues.category));
        formData.append("stock", formvalues.stock);
        formData.append("DisPercentage", formvalues.DisPercentage);
        Array.from(formvalues.images).forEach((file: any) => {
            formData.append("images", file);
        });

        if (EditMode) {
            try {
                const Docoid: any = ProdcutById?._id;
                formData.append("_id", Docoid);
                const Data = await axios.patch("https://fofo-store-back-end.vercel.app/admin/product", formData);
                toast.success(Data.data.message);
                setEditMode(null);
                Router.push("/Dashboard/Products");
            } catch (err: any) {
                console.log(err);
                setApiError(err.response.data.message);
                toast.error(err.response.data.message);
            } finally {
                setisLoading(false);

            }
        } else {
            try {
                const Data = await axios.post("https://fofo-store-back-end.vercel.app/admin/product", formData);
                toast.success(Data.data.message);
                Router.push("/Dashboard/Products");
            } catch (err: any) {
                console.log(err);
                setApiError(err.response.data.message);
                toast.error(err.response.data.message);
            } finally {
                setisLoading(false);

            }
        }
    }

    useEffect(() => {
        if (ProdcutById && EditMode) {
            formik.setValues({
                id: ProdcutById?.id,
                title: ProdcutById?.title,
                price: ProdcutById?.price,
                description: ProdcutById?.description,
                stock: ProdcutById?.stock,
                DisPercentage: ProdcutById?.DisPercentage,
                category: ProdcutById?.category,
                images: ProdcutById.images
            });

            setPageLoading(false);
            console.log(formik.values);
            const Selector = document.getElementById("selector") as HTMLSelectElement;
            if (Selector && EditMode && ProdcutById) {
                const CurrIndex = Categories.findIndex((cagetory) => {
                    return cagetory.name == ProdcutById?.category?.name;
                });
                Selector.selectedIndex = CurrIndex - 1;
            }
        }
    }, [ProdcutById]);

    async function GetProdcutByID() {
        try {
            const Data = await axios.get(`https://fofo-store-back-end.vercel.app/Product/${EditMode}`);
            setProdcutById(Data.data.Product);
            console.log(Data);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    useEffect(() => {
        window.scroll(0, 0);

        if (!ProdcutById && EditMode) {
            GetProdcutByID();
        }
        if (!EditMode) {
            setPageLoading(false);
        }
        return () => {
            setisLoading(false);
            setApiError(null);
            setSelectedCategory(null);
            setPageLoading(true);
            setTV(-1);
        };
    }, []);

    useEffect(() => {
        if (Categories.length > 0) {
            formik.setFieldValue("category", Categories[1]);
        }
    }, [Categories]);

    useEffect(() => {
        formik.setFieldValue("category", SelectedCategory);
    }, [SelectedCategory]);

    if (PageLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen p-24">
                <span className="loading loading-spinner loading-lg transform scale-150"></span>
            </div>
        );
    }

    return (
        <form onSubmit={formik.handleSubmit} className="mt-16 space-y-6 p-10 bg-gray-50 rounded-lg shadow-md">
            <div className="text-center text-3xl font-semibold text-gray-700 mb-6">{EditMode ? "Update Product" : "Post Product"}</div>
            <div className="flex flex-col gap-6">
                <label className="text-xl font-medium text-gray-700">Image Product</label>
                <div className="flex gap-4">
                    {!EditMode
                        ? null
                        : ProdcutById?.images?.map((x, index) => (
                            <img key={index} src={x} className="w-20 h-20 object-fill rounded-lg shadow-lg" alt={`Product image ${index}`} />
                        ))}
                </div>
                <input
                    id="images"
                    multiple
                    name="images"
                    type="file"
                    accept="image/*"
                    onChange={(event) => formik.setFieldValue("images", event?.currentTarget?.files)}
                    className="border border-gray-300 rounded-lg p-3"
                />
                {formik.errors.images && formik.touched.images ? (
                    <div className="text-sm text-red-600">{formik.errors.images}</div>
                ) : null}

                <label className="text-xl font-medium text-gray-700">Title Product</label>
                <input
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Enter title Product"
                />
                {formik.errors.title && formik.touched.title ? (
                    <div className="text-sm text-red-600">{formik.errors.title}</div>
                ) : null}

                <label className="text-xl font-medium text-gray-700">Price Product</label>
                <input
                    id="price"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="number"
                    placeholder="Enter Price Product"
                />
                {formik.errors.price && formik.touched.price ? (
                    <div className="text-sm text-red-600">{formik.errors.price}</div>
                ) : null}

                <label className="text-xl font-medium text-gray-700">Stock Product</label>
                <input
                    id="stock"
                    name="stock"
                    value={formik.values.stock}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="number"
                    placeholder="Enter stock Product"
                />
                {formik.errors.stock && formik.touched.stock ? (
                    <div className="text-sm text-red-600">{formik.errors.stock}</div>
                ) : null}

                <label className="text-xl font-medium text-gray-700">Discount Percentage</label>
                <input
                    id="DisPercentage"
                    name="DisPercentage"
                    value={formik.values.DisPercentage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="number"
                    placeholder="Enter Discount Percentage Product %"
                />
                {formik.errors.DisPercentage && formik.touched.DisPercentage ? (
                    <div className="text-sm text-red-600">{formik.errors.DisPercentage}</div>
                ) : null}

                <label className="text-xl font-medium text-gray-700">Description Product</label>
                <textarea
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="pt-2 pl-2 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description Product"
                ></textarea>
                {formik.errors.description && formik.touched.description ? (
                    <div className="text-sm text-red-600">{formik.errors.description}</div>
                ) : null}

                <label className="text-xl font-medium text-gray-700">Categories</label>
                <select
                    id="selector"
                    onChange={(e) => {
                        const selectedCategory = Categories.find((category) => category.name === e.currentTarget.value);
                        setSelectedCategory(selectedCategory);
                    }}
                    className="pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {Categories.map((category, index: number) => {
                        return category.name !== "All" && <option key={index}>{category.name}</option>;
                    })}
                </select>
                {formik.errors.category && formik.touched.category ? (
                    <div className="text-sm text-red-600">{formik?.errors?.category}</div>
                ) : null}

                <div className="text-center">
                    {isLoading ? (
                        <div className="text-3xl text-black ">
                            <h1>Loading</h1>
                            <i className="fa-duotone fa-spinner fa-spin"></i>
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
                        >
                            {!EditMode ? (
                                <>
                                    <i className="fas fa-plus-circle mr-2"></i> Post Product
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-edit mr-2"></i> Update
                                </>
                            )}
                        </button>
                    )}
                </div>

                {ApiError && (
                    <div className="text-xl text-red-600 text-center mt-4">{ApiError}</div>
                )}
            </div>
        </form>
    );
}
