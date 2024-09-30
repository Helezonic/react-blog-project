import React, { useId } from "react"


export default React.forwardRef(function Input ({
  label,
  type,
  className,
  placeholder,
  ...props
},ref) {
  const id = useId()
  return(
  <>
  <div className="mb-3">  
      <label 
      htmlFor={id}
      className="font-mono font-semibold my-2 text-xl text-yellow-300"
      >{label}</label>

      <input
      placeholder={placeholder}
      type = {type}
      id = {id}
      ref = {ref}
      className={`p-3 rounded-xl bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      {...props} />
    </div>
  </>
  )
}
)