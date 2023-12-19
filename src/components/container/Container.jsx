import React from "react";

function Container({
  children,
  className="",
}){
    //whenever there is one line then we can drop paranthesis and can put ; at end to distinguish and easy to read. we can also drop the ;
  return <div className={`w-full max-w-7xl mx-auto p-4 min-h-[75vh] ${className}`}>{children}</div>;
}

export default Container;