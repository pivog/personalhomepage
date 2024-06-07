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
import LatinPractice from "./LatinPractice";
import ProjectShowcase from "./ProjectShowcase";

const App = () => {
    return (
        <Box id={"app box"} width={"100%"} height={"100%"}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/project/" element={<ProjectShowcase/>}/>
                <Route exact path="/projects/" element={<Projects/>}/>
                <Route path="/chessgames" element={<ChessGames/>}/>
                <Route path="/article/" element={<Article/>}/>
                <Route path="/article/:id" element={<Article/>}/>
                <Route path="/latinski/" element={<LatinPractice/>}/>
            </Routes>
        </Box>
    );
};

export default App;