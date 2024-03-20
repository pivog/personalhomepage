import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Grid, Link, Paper, styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import {en} from "./textContent";
import Grid2 from "@mui/material/Unstable_Grid2";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Contact = () => {

    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width < 600;

    let iconSize;
    let xsvalue;
    let xbigFontSize;
    let bigFontSize;
    let mediumFontSize;
    let smallFontSize;
    let topMargin;
    if(isMobile){
        iconSize = 50
        topMargin = "0"
        xsvalue = 12;
        xbigFontSize = "28px"
        bigFontSize = "24px"
        mediumFontSize = "18px"
        smallFontSize = "14px"
    }
    else {
        iconSize = 65
        topMargin = "10vh"
        xsvalue = 6;
        xbigFontSize = "50px"
        bigFontSize = "32px"
        mediumFontSize = "22px"
        smallFontSize = "18px"
    }


    return (
        <Box className={"center"}>
            <Typography fontSize={xbigFontSize} fontFamily={"Times New Roman"} className={"horizontal-center"}>Here Is All My Social Media</Typography>
            <Box className={"social-media-container"}>
                <Grid container>
                    <Grid item xs={xsvalue} sx={{width: "30vw", height:"20vh", textAlign:"center"}}>
                        <Link target="_blank" href={"https://www.instagram.com/a.certain.magical.gargoyle?igsh=cmttMnA5Zmlxb3d6"}>
                            <img width={`${iconSize}px`} src={"/static/images/instagram-Logo.png"}
                                 alt={"instagram logo"}/>
                        </Link>
                    </Grid>
                    <Grid item xs={xsvalue} sx={{width: "30vw", height: "20vh", textAlign: "center"}}>
                        <Link target="_blank" href={"https://github.com/pivog"}>
                            <img width={`${iconSize}px`} src={"/static/images/github-Logo.png"} alt={"github logo"}/>
                        </Link>
                    </Grid>
                    <Grid item xs={xsvalue} sx={{width: "30vw", height: "20vh", textAlign:"center"}}>
                        <Link target="_blank" href={"https://discordapp.com/users/694960498348916847"}>
                            <img width={`${iconSize * 2}px`} src={"/static/images/discord-Logo.png"}
                                 alt={"discord logo"}/>
                        </Link>
                    </Grid>
                    <Grid item xs={xsvalue} sx={{width: "30vw", height: "20vh", textAlign:"center"}}>
                        <Link target="_blank" href={"https://chess.com/member/ivop1"}>
                            <img width={`${iconSize}px`} src={"/static/images/chesscom-Logo.png"} alt={"chess.com logo"}/>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Contact;