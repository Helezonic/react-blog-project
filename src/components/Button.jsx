function Button({className, children, ...props}) {
  return ( 
    <>
    
      <button className={`rounded-xl duration-200 hover:bg-blue-100 hover:text-black px-3 p-2 m-3 font-semibold w-1/2 mx-auto ${className}`} {...props}>{children}</button>
      
    </>
   );
}

export default Button;