import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {en, hr} from "./textContent";
import Divider from "@mui/material/Divider";


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
        bigFontSize = "26px"
        mediumFontSize = "21px"
        smallFontSize = "14px"
    }
    else {
        topMargin = "10vh"
        xsvalue = 6;
        bigFontSize = "40px"
        mediumFontSize = "28px"
        smallFontSize = "18px"
    }

    return (
        <Box justifyContent={"center"} textAlign={"center"} height={"100vh"}>
            <Box height={"3%"}/>
            <Divider/>
            <Box height={"80%"}>
                <Typography fontWeight={"570"} fontSize={bigFontSize} fontFamily={"Times New Roman"} className={"vertical-center"}>{en.get("homeText1")}</Typography>
            </Box>
            <Divider/>
            <Box height={"10%"}/>
            <Box height={"80%"}>
                <Typography fontWeight={"570"} fontSize={mediumFontSize} fontFamily={"Times New Roman"} className={"vertical-center"}>{en.get("homeText2")}</Typography>
            </Box>
            <Divider/>
            <Box height={"10%"}/>
            <Box height={"80%"}>
                <Typography fontWeight={"570"} fontSize={mediumFontSize} fontFamily={"Times New Roman"} className={"vertical-center"}>{en.get("homeText3")}</Typography>
            </Box>
            <Divider/>
            <Box height={"4%"}/>
        </Box>
    )
}

export default Home;