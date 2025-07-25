import React from 'react'
import Link from 'next/link'
import Header from './Header'

export const Hero = () => {
  return (
    <>
       <Header/>
    <div className='relative h-[90dvh] sm:h-screen overflow-hidden'>
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        className='w-full h-full absolute top-0 left-0 object-cover'
      >
        <source src='/coffe.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      {/* Overlay negro con transparencia */}
      <div className='absolute inset-0 bg-black/80 z-10'></div>


      {/* Contenido encima del video */}
      <div className='relative z-20 flex flex-col items-center text-white p-10 xl:mx-72 mx-8 mt-40'>

       

        <span className='font-cormorant text-7xl text-orange-500'>
          Quiosco<span className='text-orange-300'>Coffe</span>
        </span>
        <p className=' text-justify m-10 font-playwright'>
        Descubre nuestra deliciosa selección de café, donas, galletas y más. Todo preparado con los mejores ingredientes.
        </p>

        <Link href='/category'>
      
        <button className='bg-orange-500 p-4 font-bold hover:bg-amber-700 rounded-sm'>
          Nuestro Menu 
        </button>
        </Link>
      
      </div>
      
    </div>
    </>
  )
}
