import React from "react";

const Button = ({children, onClick}) => {
    return <button className="Button" onClick={onClick} >{children}</button>
}

export default Button