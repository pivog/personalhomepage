import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Grid, ImageList} from "@mui/material";
import Typography from "@mui/material/Typography";
import {en, hr} from "./textContent";
import {Backspace} from "@mui/icons-material";


const Home = () => {
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
    let bigFontSize;
    let mediumFontSize;
    let smallFontSize;
    let topMargin;
    if(isMobile){
        topMargin = "0"
        xsvalue = 12;
        bigFontSize = "24px"
        mediumFontSize = "18px"
        smallFontSize = "14px"
    }
    else {
        topMargin = "10vh"
        xsvalue = 6;
        bigFontSize = "32px"
        mediumFontSize = "22px"
        smallFontSize = "18px"
    }

    return (
        <Box>
            <Box height={topMargin}/>
            <Grid container>
                <Grid item xs={xsvalue} sx={{justifyContent:"center"}}>
                    <img className={"center big-image card"} src="/static/images/ivobass.jpeg" alt={"random image"}/>
                </Grid>
                <Grid item xs={xsvalue}>
                    <Box className={"center"} id={"homepage-text"}>
                        <Box height={"20px"}/>
                        <Typography fontWeight={"550"} fontSize={bigFontSize} fontFamily={"Times New Roman"}>{en.get("homeText1")}</Typography>
                        <Box height={"10px"}/>
                        <Typography fontSize={mediumFontSize} fontFamily={"Times New Roman"}>{en.get("homeText2")}</Typography>
                        <Box height={"10px"}/>
                        <Typography fontSize={mediumFontSize} fontFamily={"Times New Roman"}>{en.get("homeText3")}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
  )
}

export default Home;