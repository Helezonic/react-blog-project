import React, { useId } from "react"


export default React.forwardRef(function Input ({label,type,className,placeholder,postData,...props}, ref) {
  const id = useId()
  
 
  return(
  <>
  <div className="mb-1">  
      <label 
      htmlFor={id}
      className="font-mono font-semibold my-2 md:text-xl text-lg text-yellow-300"
      >{label}</label>

      <input
      placeholder={placeholder}
      type = {type}
      id = {id}
      ref = {ref}
      autoComplete="true"
      className={`md:py-3 px-3 py-2 rounded-xl border-2 border-black bg-slate-300 focus:bg-white text-black focus:outline-none focus:drop-shadow-2xl duration-200 w-full ${className}`}
      {...props} />

      
      {/* {errors.${props.name} && <span className="text-red-500 bg-black font-bold p-1">{errors.${props.name}?.message}</span>} */}

      {postData && <p className="text-white px-2">File exists. You can choose to replace</p>}
      
    </div>
  </>
  )
}
)