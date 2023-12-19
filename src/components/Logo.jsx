import React from "react";
import logoImage from "../LogoImage/LogoImage.png";

function Logo({width = "100px"}){
    return (
        <div className={`w-[100px]`}>
            <img 
            className="p-2 rounded-[20px]"
            src={logoImage} alt="Logo" 
            />
        </div>
    );
}

export default Logo;