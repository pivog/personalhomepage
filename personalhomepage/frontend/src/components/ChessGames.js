import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import { Chess } from "chess.js"
import Button from "@mui/material/Button";
import {Chessboard} from "react-chessboard";
import Box from "@mui/material/Box";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {en} from "./textContent";
import {
    ArrowBack,
    ArrowBackIos,
    ArrowBackIosNew,
    ArrowBackIosRounded,
    ArrowForwardIos,
    ArrowForwardIosRounded
} from "@mui/icons-material";


const ChessGames = () => {
    const [params] = useSearchParams()
    const [PGN, setPGN] = useState("")
    const [orientation, setOrientation] = useState('white')
    const [moveIndex, setMoveIndex] = useState(0);
    const [moves, setMoves] = useState([]);
    const [boardState, setBoardState] = useState(new Chess())
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [widthAvailable, setWidthAvailable] = useState(width - 48);


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


    const isMobile = width < 600;



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
                if (["SurelyNotAgain", "ivop1", "Ivo Planinic"].includes(game.header().Black)) {
                    console.log("orientation black")
                    setOrientation('black')
                }
                else {
                    console.log("orientation white")
                }
            })
            .catch((err) => {
                // log the error if the api request fails
                console.log(err.message);
            });
    }, []);


    return (


        // <ThemeProvider theme={currentTheme}>
        //     <CssBaseline />
        //     <Box display={"flex"} margin={"auto"} justifyContent={"space-evenly"}>
        //         <Box sx={{ width: { xs: "90vw", sm: "550px" },  height: { xs: "90vw", sm: "550px" }}}>
        //             <Chessboard boardOrientation={orientation} position={boardState.fen()} />
        //         </Box>
        //         <div className={""} id={"buttons_container"}>
        //             <Button onClick={() => {
        //                 makeAMove()
        //             }}>
        //                 NEXT
        //             </Button>
        //
        //             <Button variant="contained" onClick={() => {
        //                 moveBackwards()
        //             }}>
        //                 BACK
        //             </Button>
        //         </div>
        //     </Box>
        // </ThemeProvider>
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            {/*<Box>*/}
            {/*    <Grid container width={width-48}>*/}
            {/*        <Grid item xs={leftXs}></Grid>*/}
            {/*        <Grid item xs={xsvalue}>*/}
            {/*            <Chessboard boardOrientation={orientation} position={boardState.fen()} arePiecesDraggable={false} />*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={rightXs}>*/}
            {/*            <Box display={"flex"} justifyContent={"center"} flexGrow={1} id={"THE BOX"} height={"100%"}>*/}
            {/*                <Box display={"flex"} alignItems={"end"}>*/}
            {/*                    <Button variant={"outlined"} onClick={moveBackwards}>Back</Button>*/}
            {/*                    <Box width={"20px"}/>*/}
            {/*                    <Button variant={"outlined"} onClick={makeAMove}>Next</Button>*/}
            {/*                </Box>*/}
            {/*            </Box>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</Box>*/}
            <Box display={"flex"} sx={{flexDirection: {xs: "column", sm: "row"}}}>
                <Box sx={{width: {xs: widthAvailable+"px", sm: "70vh"}, marginInline: {xs: "auto", sm: "start"}}}>
                    <Chessboard boardOrientation={orientation} position={boardState.fen()} arePiecesDraggable={false} />
                </Box>

                <Box width={"20px"} height={"20px"}/>

                <Box display={"flex"} justifyContent={"center"} flexGrow={1} id={"THE BOX"} flexDirection={"column"} alignItems={"center"} sx={{ borderRadius:"20px",  height: { xs: "100%", sm: "70vh" }, width: (width-48-20-0.7*height), background:"#272727"}}>
                    <Box display={"flex"} maxWidth={"30vw"} sx={{background:"#272727"}} height={"100%"} padding={"10px"}>
                        <Box background={"#ffffff"}/>
                        <Box width={"20px"}/>
                        <Box background={"#ffffff"}/>
                    </Box>
                    <Box display={"flex"} maxWidth={"30vw"} sx={{background:"#272727"}} height={"fit-content"} paddingBottom={"10px"}>
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