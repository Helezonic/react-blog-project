function Button({className, children}) {
  return ( 
    <>
    
      <button className={`rounded-xl border-2  px-3 p-2 m-3 font-semibold w-1/2 mx-auto ${className}`}>{children}</button>
      
    </>
   );
}

export default Button;