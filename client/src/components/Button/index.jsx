import React from "react";

const Button = (props) =>{
    return(
        <button {...props}>{props.caption}</button>
    )
}

export default Button