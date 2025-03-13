import Link from 'next/link';
import React from 'react';

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex'>
            <div className="p-24 relative w-62 h-32 ">
                <div className="absolute top-20 left-10 rounded-xl  ">
                    <ul className='fixed'>
                        <ul className="menu rounded-box w-56 h-full  bg-slate-700 text-white">
                            <Link href={"/Dashboard/Products"}><li><i>Products</i></li></Link>
                            <Link href={"/Dashboard/AddProduct"}><li><i>Add Product</i></li></Link>
                            <Link href={"#"}><li><i>Others</i></li></Link>

                        </ul>
                    </ul>
                </div>
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}
