import React, { useId } from 'react'

function Select({
    options = [],
    label,
    className = '',
    ...props
}, ref) {
    const id = useId()

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block mb-1 pl-1 text-sm font-medium text-orange-600"
                >
                    {label}
                </label>
            )}

            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-4 py-2 rounded-xl bg-white text-gray-800 outline-none focus:ring-2 focus:ring-orange-400 focus:bg-orange-50 transition-all border border-gray-300 w-full ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option} className="text-gray-700">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
