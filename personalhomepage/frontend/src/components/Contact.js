import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Grid, Paper, styled} from "@mui/material";
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

    let xsvalue;
    let xbigFontSize;
    let bigFontSize;
    let mediumFontSize;
    let smallFontSize;
    let topMargin;
    if(isMobile){
        topMargin = "0"
        xsvalue = 12;
        xbigFontSize = "28px"
        bigFontSize = "24px"
        mediumFontSize = "18px"
        smallFontSize = "14px"
    }
    else {
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
                        IG
                    </Grid>
                    <Grid item xs={xsvalue} sx={{width: "30vw", height:"20vh", textAlign:"center"}}>
                        GITHUB
                    </Grid>
                    <Grid item xs={xsvalue} sx={{width: "30vw", height:"20vh", textAlign:"center"}}>
                        FACEBOOK
                    </Grid>
                    <Grid item xs={xsvalue} sx={{width: "30vw", height:"20vh", textAlign:"center"}}>
                        DISCORD
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Contact;