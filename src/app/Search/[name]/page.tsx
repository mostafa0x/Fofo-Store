"use client"
import { MainContext } from '@/app/_Contexts/MainContext';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { TypesContexts } from '@/app/_Interfaces/TypesContext';

export default function Search() {
    let { Data, ItemFillters, setItemFillters, SearchTXT, setSearchTXT }: TypesContexts = useContext(MainContext);
    let Parms = useParams();


    useEffect(() => {

        console.log(SearchTXT);
        if (Data && Parms?.name) {
            const decodedName = decodeURIComponent(Parms?.name);
            const FT = Data?.filter((item: string) => item.toLowerCase().includes(Parms?.name.toLowerCase()));
            setItemFillters(FT);
            setSearchTXT(decodedName)
        }


    }, [Parms?.name]);

    if (SearchTXT == null) {
        return <div className=' flex justify-center items-center min-h-screen p-24'>
            <span className="loading loading-spinner loading-lg transform scale-150"></span>

        </div>
    }

    return (
        <div className=' p-24'>
            <h1 className=' text-2xl font-bold'>Search : {SearchTXT}</h1>
            <div className='pt-8'>            {ItemFillters?.length > 0 ? ItemFillters?.map((item: string, index: number) => {
                return <div key={index}><h1>{item}</h1></div>;
            }) : <h1 >There are no search results</h1>}</div>

        </div>
    );
}
