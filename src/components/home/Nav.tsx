import React from 'react'
import {motion} from 'framer-motion'
import { NavList } from './NavList'

const heightAnimation = {
    initial :{
        height: 0,
    },
    open:{
        height: "85vh",
        transition : {
           ease: [0.75, 0, 0.23, 1] as [number, number, number, number]
        }
    },
    close:{
        height:0,
        transition:{
        }
    }
}

export const Nav = () => {
  return (
    <motion.div variants={heightAnimation} 
    initial='initial' 
    animate="open"  
    className='bg-black overflow-hidden absolute -top-[40px] left-0 w-full z-[50]  '>
        <div className="container mx-auto h-full flex items-center">
            <NavList/>
        </div>
    </motion.div>
  )
}

export default Nav
