function Button({className, children}) {
  return ( 
    <>
    
      <button className={`rounded-xl border-2 duration-200 hover:bg-blue-100 px-3 p-2 m-3 font-semibold w-1/2 mx-auto ${className}`}>{children}</button>
      
    </>
   );
}

export default Button;