'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React, { useContext } from 'react'
import { CategoriesContext } from '../_Contexts/CategoriesContext';


export default function useCategories() {
    const { setCategories } = useContext(CategoriesContext)
    async function GetCategories() {

        try {
            const Data = await axios.get("http://localhost:3001/Categories")
            console.log(Data);
            setCategories(Data.data.categories)
            return Data
        }
        catch (err) {
            console.log(err);
            throw err

        }

    }


    return useQuery({ queryKey: ['Categories'], queryFn: GetCategories })
}
