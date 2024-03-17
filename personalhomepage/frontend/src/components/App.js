// App.js
import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import ChessGames from "./ChessGames";
import Projects from "./Projects";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/chessgames" element={<ChessGames/>}/>
            </Routes>
        </>
    );
};

export default App;