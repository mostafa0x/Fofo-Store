import Link from "next/link";
import React from "react";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="mt-20 w-72 bg-slate-800 text-white p-6 fixed top-0 left-0 bottom-0 z-50">
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-center text-indigo-500">Dashboard</h2>
                </div>

                <div className="menu rounded-box bg-slate-700 text-white space-y-4">
                    <Link href="/Dashboard/Products">
                        <i>
                            <div className="flex items-center space-x-4 py-2 px-4 rounded-lg hover:bg-slate-600 transition-all ease-in-out">
                                <i className="fas fa-box-open text-lg" />
                                <span>Products</span>
                            </div>
                        </i>
                    </Link>
                    <Link href="/Dashboard/AddProduct">
                        <i>
                            <div className="flex items-center space-x-4 py-2 px-4 rounded-lg hover:bg-slate-600 transition-all ease-in-out">
                                <i className="fas fa-plus text-lg" />
                                <span>Add Product</span>
                            </div>
                        </i>
                    </Link>
                    <Link href="#">
                        <i>
                            <div className="flex items-center space-x-4 py-2 px-4 rounded-lg hover:bg-slate-600 transition-all ease-in-out">
                                <i className="fas fa-cogs text-lg" />
                                <span>Settings</span>
                            </div>
                        </i>
                    </Link>
                </div>
            </div>

            <div className="flex-1 ml-72 p-6">
                {children}
            </div>
        </div>
    );
}
