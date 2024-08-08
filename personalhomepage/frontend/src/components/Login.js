import React, {useEffect} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Input} from "@mui/material";
import {getCookie, setCookie} from "./CookiesMainpulation";
import {useNavigate} from "react-router-dom";

const Login = (props) => {

    let navigate = useNavigate()
    function login(formEvent) {
        formEvent.preventDefault()
        let username = formEvent.target.elements.username.value;
        let password = formEvent.target.password.value;
        fetch("/api/login", {
                method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            }
        ).then(res => {
            //check status code(guard clause)
            if (res.status !== 200) {
                alert("Wrong username or password");
                return
            }
            //convert json to js obejct
            let data = res.json()

            setCookie("token", data.token);
            setCookie("username", data.user.username);
            props.setUsername(data.user.username);
            navigate("/listpersonalchessgames")
        })
    }

    return (
        <>
            <Box sx={{width:{xs: "100%", sm:"400px"}, borderRadius:"30px", background:"black", padding:"32px"}} className={"center"}>
                <form
                    onSubmit={(formevent) => login(formevent)}
                >
                    <Input type={"text"} placeholder={"Username"} name={"username"}></Input>
                    <br/>
                    <br/>
                    <Input type={"password"} placeholder={"Password"} name={"password"}></Input>
                    <br/>
                    <br/>
                    <br/>
                    <Button type={"submit"} variant={"contained"}>
                        Login
                    </Button>
                </form>
            </Box>
        </>
    )
}

export default Login;