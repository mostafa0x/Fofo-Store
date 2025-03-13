import React, { useState } from 'react'

export default function CategoriesBar() {
    const [isOpenMenu, setisOpenMenu] = useState(false)

    const handleOpenORClose = (stauts: number) => {
        if (stauts == 1) {
            setisOpenMenu(true)
        } else {
            setisOpenMenu(false)
        }

    }

    return (<>        <div className=' pl-28 pr-28  bg-yellow-500 flex justify-between flex-row'>
        <div className="dropdown dropdown-hover" onMouseOver={() => handleOpenORClose(1)} onMouseOut={() => handleOpenORClose(2)}>
            <div tabIndex={0} role="button" className="btn btn-ghost m-1 text-lg ">Woodware  <i className="fa-solid fa-chevron-down"></i></div>
            <ul tabIndex={0} className=" mt-0.8 dropdown-content menu bg-white  z-[1] w-52 p-2 shadow text-black">
                <li><a>Cups</a></li>
                <li><a>Children's dishes</a></li>
            </ul>
        </div>

        <div className="dropdown dropdown-hover" onMouseOver={() => handleOpenORClose(1)} onMouseOut={() => handleOpenORClose(2)}>
            <div tabIndex={0} role="button" className="btn btn-ghost m-1 text-lg "> Arts & Nature  <i className="fa-solid fa-chevron-down"></i></div>
            <ul tabIndex={0} className=" mt-0.8 dropdown-content menu bg-white  z-[1] w-52 p-2 shadow text-black">
                <li><a>Paintings</a></li>
                <li><a>Wicker</a></li>
            </ul>
        </div>

        <div className="dropdown dropdown-hover" onMouseOver={() => handleOpenORClose(1)} onMouseOut={() => handleOpenORClose(2)}>
            <div tabIndex={0} role="button" className="btn btn-ghost m-1 text-lg group ">  Home and Kitchen<i className="fa-solid fa-chevron-down" />
            </div>
            <ul tabIndex={0} className=" mt-0.8 dropdown-content menu bg-white  z-[1] w-52 p-2 shadow text-black ">
                <li><a>Furniture</a></li>
                <li><a>Wool carpets</a></li>
            </ul>
        </div>


    </div>
        {isOpenMenu ? <div className="relative">
            <p className="absolute top-0 left-0 w-full h-screen opacity-40 bg-stone-700 z-[0]"></p>
        </div> : null}

    </>

    )
}
