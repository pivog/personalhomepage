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
import ListAllChessGames from "./ListAllChessGames";
import ListAllPersonalChesGames from "./ListAllPersonalChesGames";
import Login from "./Login";
import PersonalChessGame from "./PersonalChessGame";
import LatinVerbs from "./LatinVerbs";

const App = ({setUsername}) => {
    return (
        <Box id={"app box"} flexGrow={1}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/project/" element={<ProjectShowcase/>}/>
                <Route exact path="/projects/" element={<Projects/>}/>
                <Route path="/chessgames/" element={<ChessGames/>}/>
                <Route path="/personalchessgame/" element={<PersonalChessGame/>}/>
                <Route exact path="/listchessgames/" element={<ListAllChessGames/>}/>
                <Route exact path="/listpersonalchessgames/" element={<ListAllPersonalChesGames/>}/>
                <Route path="/article/" element={<Article/>}/>
                <Route path="/login/" element={<Login  setUsername={(_username)=>setUsername(_username)}/>}/>
                <Route path="/article/:id" element={<Article/>}/>
                <Route path="/latinskiglagoli" element={<LatinVerbs/>}/>
                <Route path="/latinski/" element={<LatinPractice/>}/>{/* deprecated, removed from navbar */}
            </Routes>
        </Box>
    );
};

export default App;