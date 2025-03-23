import React from 'react';

export default function Footer() {
    return (
        <div id="app">
            <footer className="bg-gray-800 py-4 z-[54]">
                <div className="max-w-screen-xl mx-auto px-2">
                    <div className="flex justify-between">
                        <div className='text-white'>
                            <h3 className="text-2xl font-semibold">Fofo Store</h3>
                            <p className="text-sm">Shoping</p>
                        </div>
                        <div>
                            <div className="text-left">
                                <h1 className='text-white text-2xl'>Contact us</h1>
                                <h4 className='text-orange-500 text-lg'>(+20) 01157072073</h4>
                                <span className='text-gray-400'>Follow us</span>
                            </div>

                            <div className='text-3xl flex gap-2 pt-4'>
                                <a href='https://www.facebook.com/profile.php?id=100080751632307' target='_blank' className="fa-brands fa-facebook cursor-pointer hover:text-yellow-300" />
                                <a href='https://www.instagram.com/mostafa_0x/' target='_blank' className="fa-brands fa-instagram hover:text-yellow-300" />

                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-white">
                        <div className='flex justify-center gap-4 text-3xl text-green-500'>
                            <i className="fa-brands fa-cc-visa" ></i>
                            <i className="fa-brands fa-cc-mastercard" />
                            <i className="fa-brands fa-cc-paypal" />
                        </div>
                        <p>© Fofo Store. All rights reserved</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
