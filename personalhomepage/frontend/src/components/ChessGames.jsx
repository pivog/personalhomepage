import React, {useEffect, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";
import { Chess } from "chess.js"
import Button from "@mui/material/Button";
import {Chessboard} from "react-chessboard";
import Box from "@mui/material/Box";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
    ArrowBackIosRounded,
    ArrowForwardIosRounded
} from "@mui/icons-material";
import useWindowDimensions from "./windowSizeHook";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MovesDesktop from "./elements/movesDesktop";
import PropTypes from "prop-types";
import MovesStripMobileOnly from "./elements/moveStripMobile";


const ChessGames = () => {
    const [params] = useSearchParams()
    const [orientation, setOrientation] = useState('white')
    const [moveIndex, setMoveIndex] = useState(0);
    const [moves, setMoves] = useState([]);
    const [boardState, setBoardState] = useState(new Chess())
    const {width, height} = useWindowDimensions();
    const [whiteMoves, setWhiteMoves] = useState([]);
    const [blackMoves, setBlackMoves] = useState([]);
    const [names, setNames] = useState(["Player", "Player"])
    const [site, setSite] = useState("Site")
    const movesDesktopRef = useRef();


    // const lightTheme = createTheme({
    //     palette: {
    //         mode: "light",
    //     }
    // })

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            background: {
                default: "#1f1f1f"
            }
        }
    })

    const currentTheme = darkTheme;

    const makeAMove = function (n) {
        // Move n moves ahead(one move means a player moves a piece, not a turn for one player each)
        if ((moveIndex === moves.length && n>0) || (moveIndex === 0 && n<0) || n === 0) {
            return
        }
        goToMoveIndex(moveIndex+n)
    }



    // Arrow buttin listener
    useEffect(() =>
    {
        const arrowListener = (e) => {
            if(e.code === "ArrowRight"){
                makeAMove(1)
            }
            if(e.code === "ArrowLeft"){
                makeAMove(-1)
            }
        }
        document.addEventListener('keydown', arrowListener);
        return () =>
        {
            document.removeEventListener('keydown', arrowListener);
        }
    }, [moveIndex])

    // Fetching the chess game
    useEffect(() => {
        // url is the url for the api call with an optional id parameter
        let id = params.get("id")
        let urlQueryParam = ""
        if (id) {
            urlQueryParam = `?id=${id}`
        }
        let url = `/api/getchessgame${urlQueryParam}`


        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // do stuff with the pgn of a requested game
                const game = new Chess()
                game.loadPgn(data.pgn)
                setMoves(game.history())
                let _whiteMoves = []
                let _blackMoves = []
                let _moves = game.history()
                console.log(_moves.length)
                for (let i = 0; i < _moves.length/2; i++) {
                    _whiteMoves.push(_moves[2*i])
                }
                for (let i = 0; i < _moves.length/2-0.5; i++) {
                    _blackMoves.push(_moves[2*i+1])
                }
                setWhiteMoves(_whiteMoves)
                setBlackMoves(_blackMoves)
                let white = game.header().White
                let black = game.header().Black
                setNames
                ([
                    ["SurelyNotAgain", "ivop1", "Ivo Planinic"].includes(white) ? "Ivo Planinic" : white,
                    ["SurelyNotAgain", "ivop1", "Ivo Planinic"].includes(black) ? "Ivo Planinic" : black
                ])

                if (["SurelyNotAgain", "ivop1", "Ivo Planinic"].includes(black)) {
                    setOrientation('black')
                }
            })
            .catch((err) => {
                // log the error if the api request fails
                console.log(err.message);
            });
    }, []);

    const goToMoveIndex = (index) => {
        const _game = new Chess()
        if (index => 0) {
            _game.loadPgn(moves.slice(0, index).join("\n"))
            setMoveIndex(index)
            setBoardState(_game)
        }
    }

    const generateColor = (index) => {
        if (moveIndex === index) {
            return "#575757"
        }
        return "#373737"
    }

    const ButtonsMobile = (props) => {
        return (
            <Box maxWidth={"60vw"} sx={{background:"#272727", display:{xs:"flex", sm:"none"}}} height={"fit-content"} paddingY={"10px"}>
                <Button variant="contained" onClick={() => {makeAMove(-1)}}><ArrowBackIosRounded width={"20px"}/></Button>
                <Box width={"20px"}/>
                <Button variant="contained" onClick={() => {makeAMove(1)}}><ArrowForwardIosRounded width={"20px"}/></Button>
            </Box>
        )
    }

    const ButtonsDesktop = (props) => {
        return (
            <Box maxWidth={"30vw"} sx={{background:"#272727", display:{xs:"none", sm:"flex"}}} height={"fit-content"} paddingY={"10px"}>
                <Button variant="contained" onClick={() => {makeAMove(-1)}}><ArrowBackIosRounded width={"20px"}/></Button>
                <Box width={"20px"}/>
                <Button variant="contained" onClick={() => {makeAMove(1)}}><ArrowForwardIosRounded width={"20px"}/></Button>
            </Box>
        )
    }

    const Names = () => {
        return (
            <Box display={"flex"} sx={{flexDirection: {xs: "column", sm: "row"}, justifyContent:"center", width:(width-48+"px")}} id={"a box"}>
            <Typography variant="h3" sx={{display:{xs:"none", sm:"flex"}}}>{names[0]} - {names[1]}</Typography>
            <Typography variant="h5" sx={{display:{xs:"flex", sm:"none"}}}>{names[0]} - {names[1]}</Typography>
        </Box>
        )
    }

    const OtherGames = (props) => {
      return (
          <div style={{display:"none"}}>todo</div>
      )
    }



    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Names/>
            <Box height={"5px"}/>
            <Divider/>
            <Box height={"10px"}/>
            <Box display={"flex"} sx={{flexDirection: {xs: "column", sm: "row"}, justifyContent:"center", width:(width-48+"px")}} id={"a box"}>

                <MovesStripMobileOnly moves={moves} goToMoveIndex={goToMoveIndex} generateColor={generateColor} moveIndex={moveIndex} />

                <Box height={"20px"}/>


                <Box sx={{width: {xs: "100%", sm: "70vh"}, marginInline: {xs: "auto", sm: "0px"}}}>
                    <Chessboard boardOrientation={orientation} position={boardState.fen()} arePiecesDraggable={false} />
                </Box>

                <Box width={"20px"} height={"20px"}/>

                <Box key={width} display={"flex"} justifyContent={"center"} flexGrow={1} id={"THE BOX"} flexDirection={"column"} alignItems={"center"} sx={{ borderRadius:"20px",  height: { xs: "100%", sm: "70vh" }, maxWidth:"700px", width: (width-48-20-0.7*height), background:"#272727"}}>

                    <ButtonsMobile/>

                    <Box ref={movesDesktopRef} height={"80%"} flexGrow={1}>
                        <MovesDesktop whiteMoves={whiteMoves} blackMoves={blackMoves} goToMoveIndex={goToMoveIndex} generateColor={generateColor} moveIndex={moveIndex} boxRef={movesDesktopRef.current}/>
                    </Box>

                    <ButtonsDesktop/>

                </Box>
            </Box>

            <OtherGames/>
        </ThemeProvider>


    )
}

export default ChessGames;