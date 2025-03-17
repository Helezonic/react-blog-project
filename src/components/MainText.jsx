import React from 'react'

function MainText({children, className}) {
  return (
    <>
      <div className={`p-2  top-1/4 left-1/2  font-semibold w-fit mx-auto text-2xl uppercase dark:text-white text-black ${className}`}>
        <span>{children}</span>
      </div>
    </>
  )
}

export default MainText