import React from 'react'
import {motion} from "framer-motion"

function AnimatedPage({children}) {
  const animation = {
    initial : {opacity:0.5, y:10},
    animate : {opacity:1, y:0}
  }
  return (
    <motion.div variants={animation} initial="initial" animate="animate" transition={{duration:0.5}}>
      {children}
    </motion.div>
    
  )
}

export default AnimatedPage