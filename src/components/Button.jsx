import React from "react";

function Button({
    children, // text
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    className = '',
    ...props
}){
    return(
        <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`} {...props}
        // onClick={}
        >{children}</button>
    )
}

export default Button;