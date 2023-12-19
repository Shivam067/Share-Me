import React, { useId } from "react";

// general input component that can be used for any input feild.

const Input = React.forwardRef(function input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className="w-full">
            {label && <label
            className="inline-block mb-1 pl-1"
            htmlFor="id"
            >
                {label}
            </ label>}
            <input
            type={type}
            className={`px-3 py-2 rounded-lg outline-none duration-200 border border-gray-200 w-full ${className} focus:bg-gray-50 focus:text-gray-600 `}
            ref={ref}
            {...props}
            id={id} />
        </div>
    );
})

export default Input;