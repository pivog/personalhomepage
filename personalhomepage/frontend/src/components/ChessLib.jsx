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


const ChessGames = () => {
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
        let urlQueryParam = ""
        if (id) {
            urlQueryParam = `?id=${id}`
        }
        let url = `/api/getchessgame${urlQueryParam}`


        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // do stuff with json of all games
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
                <Typography variant={"h3"} sx={{display:{xs:"none", sm:"flex"}}}>{names[0]} - {names[1]}</Typography>
                <Typography variant={"h5"} sx={{display:{xs:"flex", sm:"none"}}}>{names[0]} - {names[1]}</Typography>
            </Box>
        </ThemeProvider>


    )
}

export default ChessLib;