import Link from 'next/link';
import React from 'react'


export default function Notfound() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-700 via-purple-800 to-pink-600">
            <div className="text-center text-white px-6 py-8 rounded-lg shadow-lg max-w-md mx-auto">
                <div className="flex justify-center mb-6 animate__animated animate__fadeIn animate__delay-1s">
                    <i className="fas fa-exclamation-triangle fa-4x text-yellow-300"></i>
                </div>
                <h1 className="text-4xl font-bold mb-4 animate__animated animate__fadeIn animate__delay-1s">
                    404 - Page Not Found
                </h1>
                <p className="text-lg mb-6 animate__animated animate__fadeIn animate__delay-2s">
                    Sorry, the page you are looking for doesnt exist. It might have been moved or deleted.
                </p>
                <Link href={"/"}>
                    <button
                        className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-3s"
                    >
                        Go to Homepage
                    </button>
                </Link>
            </div>
        </div>
    )
}
