import React, { JSX } from 'react'
import {motion} from 'framer-motion'
import Link from 'next/link';

const links = [
    { name: 'Productos', href: '/category' },

]

const cardAnim = {
    initial:{
        y:"100%",
        opacity:0
    },
    enter: (i:[number,number]) => ({
        y:0,
        opacity:1,
        transition:{
            duration:1,ease:[0.42, 0, 0.58, 1] as [number, number, number, number],
            delay: i[0],
        }
    }),
    exit:{
        y:0,
        opacity:0,
        transition:{
            duration:
                0.6,ease:[0.42, 0, 0.58, 1] as [number, number, number, number],
                delay:0.03
            
        }
    }
}

const getCard = (name:string) => {
    const card = [] as JSX.Element[]
    name.split('').forEach((letter, index) => {
    card.push(
      <motion.span variants={cardAnim} initial="initial" animate="enter" 
      custom={[index * 0.03, (name.length -index )*0.01]}
      exit="exit"
      key={index} className='inline-block'>
        {
            letter
        }
      </motion.span>
    )
     });
     return card 
};


export const NavList = () => {
  return (
  
    <ul className='flex flex-col gap-8 text-4xl font-semibold
    text-orange-500 items-center uppercase justify-center w-full
    '>

        {
        links.map((link, index) => (
        <Link href={link.href} key={index} className='relative group'>
          
         <div className='flex overflow-hidden
         hover:text-white transition-all
         ' key={index}>
            {getCard(link.name)}
         </div>
           </Link>
        ))
        }        
    </ul>
    
  )
}
