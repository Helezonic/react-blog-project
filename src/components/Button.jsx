function Button({className, children, ...props}) {
  return ( 
    <>
    
      <button className={`rounded-xl duration-200 hover:bg-blue-100 hover:text-black sm:px-3 sm:py-2 px-2 py-1 font-semibold w-1/2 mx-auto ${className}`} {...props}>{children}</button>
      
    </>
   );
}

export default Button;