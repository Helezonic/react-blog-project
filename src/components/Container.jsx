import AnimatedPage from "./AnimatedPage";

export default function Container ({className, children, title}) {
  return (
    <AnimatedPage>
    
    <div className={`mx-auto p-2 bg-violet-700 drop-shadow-[0px_5px_20px_rgba(76,29,149,0.5)] rounded-lg ${className}`} >
      <h1 className="text-xl w-full p-2 mb-2 rounded-lg font-bold text-center text-white bg-violet-800 uppercase">{title}</h1>
      {children} 
    </div>
  
    </AnimatedPage>
  )
}