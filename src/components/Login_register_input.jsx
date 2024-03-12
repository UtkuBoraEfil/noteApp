import React, { useState } from "react";

function Login_register_input(props){
    return <div>
        <input type="text" placeholder={props.placeholder} name={props.name} className=" border-2 border-black"/>
    </div>
}
export default Login_register_input;