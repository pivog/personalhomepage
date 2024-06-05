import React, {useEffect, useState} from "react";
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


const ChessGames = () => {
    const [params] = useSearchParams()
    const [orientation, setOrientation] = useState('white')
    const [moveIndex, setMoveIndex] = useState(0);
    const [moves, setMoves] = useState([]);
    const [boardState, setBoardState] = useState(new Chess())
    const {width, height} = useWindowDimensions();
    const [whiteMoves, setWhiteMoves] = useState([]);
    const [blackMoves, setBlackMoves] = useState([]);
    const [widthAvailable, setWidthAvailable] = useState(width-48+"px")


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



    const moveBackwards = () => {
        if (moveIndex === 0) {
            return
        }
        const gameCopy = new Chess()
        gameCopy.loadPgn(moves.slice(0, moveIndex).join("\n"))
        const result = gameCopy.undo()
        setBoardState(gameCopy)
        setMoveIndex(moveIndex - 1)
        return result
    }

    const makeAMove = () => {
        if (moveIndex === moves.length) {
            return
        }
        const gameCopy = new Chess()
        gameCopy.load(boardState.fen())
        const result = gameCopy.move(moves[moveIndex])
        setBoardState(gameCopy)
        setMoveIndex(moveIndex + 1)
        return result
    }

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
                for (let i = 0; i < _moves.length/2-0.5; i++) {
                    _whiteMoves.push(_moves[2*i])
                    _blackMoves.push(_moves[2*i+1])
                }
                if(_moves.length%2 === 1) {
                    _blackMoves.push(_moves[-1])
                }
                setWhiteMoves(_whiteMoves)
                setBlackMoves(_blackMoves)
                if (["SurelyNotAgain", "ivop1", "Ivo Planinic"].includes(game.header().Black)) {
                    setOrientation('black')
                }
            })
            .catch((err) => {
                // log the error if the api request fails
                console.log(err.message);
            });
    }, []);


    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Box display={"flex"} sx={{flexDirection: {xs: "column", sm: "row"}, justifyContent:"center", width:(width-48+"px")}} id={"a box"}>
                <Box sx={{width: {xs: "90vw", sm: "70vh"}, marginInline: {xs: "auto", sm: "0px"}}}>
                    <Chessboard boardOrientation={orientation} position={boardState.fen()} arePiecesDraggable={false} />
                </Box>

                <Box width={"20px"} height={"20px"}/>

                <Box key={width} display={"flex"} justifyContent={"center"} flexGrow={1} id={"THE BOX"} flexDirection={"column"} alignItems={"center"} sx={{ borderRadius:"20px",  height: { xs: "100%", sm: "70vh" }, maxWidth:"700px", width: (width-48-20-0.7*height), background:"#272727"}}>
                    <Box display={"flex"} maxWidth={"30vw"} sx={{background:"#373737", overflowY:"scroll"}} height={"100%"} flexGrow={1} padding={"10px"}>
                        <Box background={"#ffffff"} width={"50px"}>
                            {
                                whiteMoves.map((move) => (
                                    <h3>
                                        {move}
                                    </h3>
                                ))
                            }
                        </Box>
                        <Box width={"30px"}/>
                        <Box background={"#ffffff"} width={"50px"}>
                            {
                                blackMoves.map((move, index) => (
                                    <h3 id={index}>
                                        {move}
                                    </h3>
                                ))
                            }
                        </Box>
                    </Box>
                    <Box display={"flex"} maxWidth={"30vw"} sx={{background:"#272727"}} height={"fit-content"} paddingY={"10px"}>
                        <Button variant={"contained"} onClick={moveBackwards}><ArrowBackIosRounded width={"20px"}/></Button>
                        <Box width={"20px"}/>
                        <Button variant={"contained"} onClick={makeAMove}><ArrowForwardIosRounded width={"20px"}/></Button>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>


    )
}

export default ChessGames;