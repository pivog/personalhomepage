import React from 'react';
import {render} from "react-dom";
import Navbar from "./components/Navbar";

const root = document.getElementById('app');
render(
    <React.StrictMode>
        <Navbar id={"navbar"}/>
         {/*inside is the browser router in "box component="main""*/}
    </React.StrictMode>,
    root
    );