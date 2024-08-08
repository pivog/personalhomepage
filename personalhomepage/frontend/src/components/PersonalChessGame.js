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
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {getCookie} from "./CookiesMainpulation";


const PersonalChessGame = () => {
    const [params] = useSearchParams()
    const [orientation, setOrientation] = useState('white')
    const [moveIndex, setMoveIndex] = useState(-1);
    const [moves, setMoves] = useState([]);
    const [boardState, setBoardState] = useState(new Chess())
    const {width, height} = useWindowDimensions();
    const [whiteMoves, setWhiteMoves] = useState([]);
    const [blackMoves, setBlackMoves] = useState([]);
    const [names, setNames] = useState(["Player", "Player"])
    const [site, setSite] = useState("Site")


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
        if ((moveIndex === moves.length && n>0) || (moveIndex === 0 && n<0) || n === 0) {
            return
        }
        goToMoveIndex(moveIndex+n)
    }



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

    useEffect(() => {
        // url is the url for the api call with an optional id parameter
        let id = params.get("id")
        let url = `/api/getpersonalchessgame`



        if(getCookie("token") === undefined){ // missing token
            return navigate("/login")
        }

        fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: getCookie("token"),
                    crsfToken: "",
                    gameId: id,
                })
            }
        ).then((res) => res.json())
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
        if (index != -1) {
            _game.loadPgn(moves.slice(0, index+1).join("\n"))
        }
        setMoveIndex(index)
        setBoardState(_game)
    }

    const generateColor = (index) => {
        if (moveIndex === index) {
            return "#575757"
        }
        return "#373737"
    }

    const MovesDesktop = (props) => {
        return (
            <Box maxWidth={"50vw"} sx={{background:"#373737", overflowY:"scroll", borderRadius: {xs:"20px 20px 0 0", sm:"0 0 20px 20px"}, display:{xs:"none", sm:"flex"}}} height={"100%"} flexGrow={1} padding={"20px"}>
                <Box background={"#ffffff"}>
                    {
                        whiteMoves.map((item, index) => (
                            <h3 style={{padding:"6px", margin:"0"}}>{index+1}.</h3>
                        ))
                    }
                </Box>
                <Box width={"15px"}/>
                <Box background={"#ffffff"} width={"60px"}>
                    {
                        whiteMoves.map((move, index) => (
                            <h3 onClick={() => {goToMoveIndex(2*index)}} id={2*index} style={{background:generateColor(2*index), padding:"6px", margin:"0"}}>
                                {move}
                            </h3>
                        ))
                    }
                </Box>
                <Box width={"20px"}/>
                <Box background={"#ffffff"} width={"60px"}>
                    {
                        blackMoves.map((move, index) => (
                            <h3 onClick={() => {goToMoveIndex(2*index+1)}} id={2*index+1} style={{background:generateColor(2*index+1), padding:"6px 0 6px 10px", margin:"0"}}>
                                {move}
                            </h3>
                        ))
                    }
                </Box>
            </Box>
        )
    }

    const MovesStripMobileOnly = (props) => {
        return (
            <Box sx={{display:{xs:"flex", sm:"none"}, overflowX:"scroll"}} height={"fit-content"} paddingY={"6px"} width={"100%"}>
                {
                    moves.map((move, index) => (
                        <>
                            {
                                (index % 2 === 0) ? <Typography sx={{display:{xs:"inline-block"}, padding: "6px", margin: "0", background:"#373737"}}>{index / 2 + 1}.</Typography> : <></>
                            }
                            <Typography onClick={() => { goToMoveIndex(index) }} id={(index)+"mobileStrip"} style={{display:{xs:"inline-block"}, background: generateColor(index), padding: "6px", margin: "0"}}>
                                {move}
                            </Typography>
                        </>

                    ))
                }
            </Box>
        )
    }

    const ButtonsMobile = (props) => {
        return (
            <Box maxWidth={"60vw"} sx={{background:"#272727", display:{xs:"flex", sm:"none"}}} height={"fit-content"} paddingY={"10px"}>
                <Button variant={"contained"} onClick={() => {makeAMove(-1)}}><ArrowBackIosRounded width={"20px"}/></Button>
                <Box width={"20px"}/>
                <Button variant={"contained"} onClick={() => {makeAMove(1)}}><ArrowForwardIosRounded width={"20px"}/></Button>
            </Box>
        )
    }

    const ButtonsDesktop = (props) => {
        return (
            <Box maxWidth={"30vw"} sx={{background:"#272727", display:{xs:"none", sm:"flex"}}} height={"fit-content"} paddingY={"10px"}>
                <Button variant={"contained"} onClick={() => {makeAMove(-1)}}><ArrowBackIosRounded width={"20px"}/></Button>
                <Box width={"20px"}/>
                <Button variant={"contained"} onClick={() => {makeAMove(1)}}><ArrowForwardIosRounded width={"20px"}/></Button>
            </Box>
        )
    }

    const Names = () => {
        return (
            <Box display={"flex"} sx={{flexDirection: {xs: "column", sm: "row"}, justifyContent:"center", width:(width-48+"px")}} id={"a box"}>
                <Typography variant={"h3"} sx={{display:{xs:"none", sm:"flex"}}}>{names[0]} - {names[1]}</Typography>
                <Typography variant={"h5"} sx={{display:{xs:"flex", sm:"none"}}}>{names[0]} - {names[1]}</Typography>
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

                <MovesStripMobileOnly/>

                <Box height={"20px"}/>


                <Box sx={{width: {xs: "100%", sm: "70vh"}, marginInline: {xs: "auto", sm: "0px"}}}>
                    <Chessboard boardOrientation={orientation} position={boardState.fen()} arePiecesDraggable={false} />
                </Box>

                <Box width={"20px"} height={"20px"}/>

                <Box key={width} display={"flex"} justifyContent={"center"} flexGrow={1} id={"THE BOX"} flexDirection={"column"} alignItems={"center"} sx={{ borderRadius:"20px",  height: { xs: "100%", sm: "70vh" }, maxWidth:"700px", width: (width-48-20-0.7*height), background:"#272727"}}>

                    <ButtonsMobile/>

                    <MovesDesktop/>

                    <ButtonsDesktop/>

                </Box>
            </Box>

            <OtherGames/>
        </ThemeProvider>


    )
}

export default PersonalChessGame;