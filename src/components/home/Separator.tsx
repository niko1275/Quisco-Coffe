import { Donut } from 'lucide-react'
import React from 'react'

export const Separator = () => {
  return (
    <div className='w-1/4 text-orange-200 flex items-center gap-4 '>
      <div className='flex-1 h-[2px] bg-orange-200' />
      <Donut className='w-12 h-12' />
      <div className='flex-1 h-[2px] bg-orange-200' />
    </div>
  )
}
