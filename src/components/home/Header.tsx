"use client"

import Image from 'next/image'
import Link from 'next/link'
import {AnimatePresence} from 'framer-motion'
import { useState } from 'react'
import Nav from './Nav'


export  const Header = () => {
    const [navactive, setNavActive] = useState(false)
    return(
        <header className='absolute top-[40px] z-[60]  w-full '>
            <div className='container mx-auto'>
                <div className='flex items-center justify-between'>
                    <Link href='/'>
                        <Image
                            src='/QuioscoCoffe.png'
                            alt='QuioscoCoffe Logo'
                            className='z-[100] relative'
                            width={128}
                            height={128}
                        />
                    </Link>
                   <button
                        onClick={() => setNavActive(!navactive)}
                        className="w-8 h-6 text-orange-500 relative z-[60] outline-none right-5"
                        >
                        <span
                            className={`absolute left-0 w-full h-[2px] bg-current transition-transform duration-300
                            ${navactive ? "top-1/2 rotate-45" : "top-0"}`}
                        />
                        <span
                            className={`absolute left-0 w-full h-[2px] bg-current transition-opacity duration-300
                            ${navactive ? "opacity-0" : "top-1/2"}`}
                        />
                        <span
                            className={`absolute left-0 w-full h-[2px] bg-current transition-transform duration-300
                            ${navactive ? "top-1/2 -rotate-45" : "bottom-0"}`}
                        />
                        </button>
                </div>
            </div>

            <AnimatePresence mode='wait'>
                            ${navactive && <Nav/>}           
            </AnimatePresence>
        </header>
    )
}

export default Header;