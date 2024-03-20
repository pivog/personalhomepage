// App.js
import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import ChessGames from "./ChessGames";
import Projects from "./Projects";
import Box from "@mui/material/Box";
import Article from "./Article";

const App = () => {
    return (
        <Box id={"app box"} sx={{flexGrow:1}}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/chessgames" element={<ChessGames/>}/>
                <Route path="/article/" element={<Article/>}/>
                <Route path="/article/:id" element={<Article/>}/>
            </Routes>
        </Box>
    );
};

export default App;