'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useContext } from 'react'
import { ProductsContext } from '../_Contexts/ProductsContext'


export default function useProductByID() {
    const { setProductByID } = useContext(ProductsContext)
    const { id } = useParams()

    async function GetProductByID() {
        try {
            const Data = await axios.get(`https://fofo-store-back-end.vercel.app/Product/${id}`)
            setProductByID(Data.data.Product)
            return Data
        }
        catch (err) {
            console.log(err);
            throw err
        }
    }

    return useQuery({ queryKey: ['ProductByID'], queryFn: GetProductByID })
}
