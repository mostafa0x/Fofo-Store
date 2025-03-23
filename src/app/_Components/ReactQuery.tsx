"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react'
const Query = new QueryClient();
export default function RreactQuery({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <QueryClientProvider client={Query}>
            {children}
            <ReactQueryDevtools />
        </QueryClientProvider>

    )
}
