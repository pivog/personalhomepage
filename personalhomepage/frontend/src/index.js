import React from 'react';
import {render} from "react-dom";
import Navbar from "./components/Navbar";
import {getCookie, setCookie} from "./components/CookiesMainpulation"

const root = document.getElementById('app');
if(!(getCookie("language") in ["en", "hr"])) {
    setCookie("language", "en")
}

render(
    <React.StrictMode sx={{flexGrow:1}}>
        <Navbar id={"navbar"} sx={{width:"100%"}}/>
         {/*inside is the browser router in "box component="main""*/}
    </React.StrictMode>,
    root
    );