import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {getCookie} from "./CookiesMainpulation";
import {useNavigate} from "react-router-dom";

const ListAllPersonalChesGames = () => {
    const [gamesNames, setGamesNames] = useState([])
    let navigate = useNavigate()

    useEffect(() => {

        if(getCookie("token") === undefined){ // missing token
            return navigate("/login")
        }

        fetch("/api/getpersonalchessgamesnames", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: getCookie("token"),
                crsfToken: "",
            })
            }
        ).then(res => res.json()).then(data => setGamesNames(data))
    }, []);

    return (
        <Box width={"100%"} height={"100%"}>
            <Box height={'48px'}/>
            <Link href={`/chessgames`} sx={{textDecoration:"none", width:'100%'}} >
                <Box width={"100%"} justifyContent={"center"} display={"flex"}>
                    <Typography className={"vertical-center"} sx={{width:"fit-content", color:"#ffffff", fontSize:{xs:"20px", sm:"40px"}}}>
                        I'm Feeling Lucky
                    </Typography>
                </Box>
            </Link>

            {
                gamesNames.map((game, index) => (

                    <Link href={`/personalchessgame?id=${game.id}`} sx={{textDecoration:"none"}}>
                        <Box>
                            <Box height={"10px"}/>
                            <Box width={"100%"} justifyContent={"center"} flexDirection={"row"} display={"flex"} height={"170px"}>
                                <Box width={"fit-content"}><Typography className={"vertical-center"} sx={{width:"fit-content", color:"#ffffff"}} variant={"h3"}>{game.id}.</Typography></Box>
                                <Box width={"20px"}/>
                                <Box width={"fit-content"}><Typography className={"vertical-center"} sx={{width:"fit-content", color:"#ffffff", fontSize:{xs:"20px", sm:"40px"}}}>{["SurelyNotAgain", "ivop1", "Ivo Planinic"].includes(game.white) ? "Ivo Planinic" : game.white}</Typography></Box>
                                <Box width={"20px"}/>
                                <Box width={"fit-content"}><Typography className={"vertical-center"} sx={{width:"fit-content", color:"#ffffff", fontSize:{xs:"20px", sm:"40px"}}}>{["SurelyNotAgain", "ivop1", "Ivo Planinic"].includes(game.black) ? "Ivo Planinic" : game.black}</Typography></Box>
                                {
                                    [
                                        game.site ? (
                                            <>
                                                <Box width={"20px"}/>
                                                <Box width={"fit-content"}><Typography className={"vertical-center"} sx={{width:"fit-content", color:"#ffffff", fontSize:{xs:"20px", sm:"40px"}, display:{xs:'none', sm:'flex'}}}>({game.site})</Typography></Box>
                                            </>
                                        ) : (<></>)
                                    ]
                                }
                            </Box>
                            <Box height={"6px"}/>
                            <Divider/>
                            <Box height={"6px"}/>
                        </Box>
                    </Link>
                ))
            }
        </Box>
    )
}

export default ListAllPersonalChesGames;
