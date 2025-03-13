'use client'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { UserContext } from '../_Contexts/UserContext';


export default function useCart() {
    const { headers } = useContext(UserContext)

    async function GetMyCart() {
        return await axios.get("http://localhost:3001/Cart", { headers })
    }

    const ResObj = useQuery({ queryKey: ['Cart'], queryFn: GetMyCart })
    return ResObj;
}
