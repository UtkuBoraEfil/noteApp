import React, {useState} from "react";
import Input from "./Login_register_input";

function Login(){
    return <div>
        <h1>register</h1>
        <form action="post" className=" grid place-items-center">
            <Input placeholder="email" name="email"></Input>
            <Input placeholder="password" name="password"></Input>
        </form>
    </div>
}
export default Login;