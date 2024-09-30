import { useId } from "react"
import React from "react"

function Select ({label, options, className, ...props}, ref) {
    const id = useId()

    return (
        <>
            <div className="mb-3">
                {label && <label htmlFor={id} className="font-mono font-semibold my-2 text-xl text-yellow-300">{label}</label>}
                <select
                {...props}
                id = {id}
                ref={ref}
                className={`w-full p-3 rounded-xl bg-red text-black ${className}`}
                >
                    {options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                    
                </select>
            </div>
        </>
    )
}

export default React.forwardRef(Select)