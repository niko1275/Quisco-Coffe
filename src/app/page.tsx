import Explore from '@/components/home/Explore'
import { Footer } from '@/components/home/Footer'

import { Hero } from '@/components/home/Hero'
import React from 'react'

export default function page () {
  return (
    <div className='h-full'>
       
        <Hero/>
        <Explore/>
        <Footer/> 
    </div>
  )
}
