import AnimatedPage from "./AnimatedPage";

export default function Container ({className, children, title}) {
  return (
    <AnimatedPage>
    
    <div className={`bg-slate-500  dark:bg-indigo-700 mx-auto p-2 drop-shadow-[0px_5px_20px_rgba(76,29,149,0.5)] backdrop-blur-xl rounded-lg ${className}`} >
      <h1 className="sm:text-xl text-lg w-full sm:p-2 p-1 sm:mb-2 mb-1 rounded-lg font-bold text-center dark:text-white dark:bg-indigo-800 uppercase text-black bg-indigo-100">{title}</h1>
      {children} 
    </div>
  
    </AnimatedPage>
  )
}