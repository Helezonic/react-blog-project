export default function Container ({className, children}) {
  return (
    <>
    
    <div className={`w-full max-w-xl mx-auto p-2 bg-violet-500 my-2 rounded-lg ${className}`} >{children} 
    </div>
    </>
  )
}