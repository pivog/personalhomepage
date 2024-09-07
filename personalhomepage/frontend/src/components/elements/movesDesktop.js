import Box from "@mui/material/Box";
import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import isElementVisibleInContainer from "../isVisible";

const MovesDesktop = (props) => {

    useEffect(() => {
        const state = isElementVisibleInContainer(document.getElementById(props.moveIndex.toString()), props.boxRef)
        if(state === "above") {
            document.getElementById(props.moveIndex.toString()).scrollIntoView(true)
        }
        if(state === "under") {
            document.getElementById(props.moveIndex.toString()).scrollIntoView(false)
        }
    }, [props.moveIndex]);


    const clickHandler = (event) => {
        console.log(event.currentTarget.id)
        props.goToMoveIndex(parseInt(event.currentTarget.id))

    }

    return (
        <Box maxWidth={"50vw"} sx={{background:"#373737", overflowY:"scroll", borderRadius: {xs:"20px 20px 0 0", sm:"0 0 20px 20px"}, display:{xs:"none", sm:"flex"}}} height={"100%"} flexGrow={1} padding={"20px"}>
            <Box background={"#ffffff"}>
                {
                    props.whiteMoves.map((item, index) => (
                        <h3 style={{padding:"6px", margin:"0"}}>{index+1}.</h3>
                    ))
                }
            </Box>
            <Box width={"15px"}/>
            <Box background={"#ffffff"} width={"60px"}>
                {
                    props.whiteMoves.map((move, index) => (
                        <h3 onClick={clickHandler} id={2*index+1} style={{background:props.generateColor(2*index+1), padding:"6px", margin:"0"}}>
                            {move}
                        </h3>
                    ))
                }
            </Box>
            <Box width={"20px"}/>
            <Box background={"#ffffff"} width={"60px"}>
                {
                    props.blackMoves.map((move, index) => (
                        <h3 onClick={clickHandler} id={2*index+2} style={{background:props.generateColor(2*index+2), padding:"6px 0 6px 10px", margin:"0"}}>
                            {move}
                        </h3>
                    ))
                }
            </Box>
        </Box>
    )
}



MovesDesktop.propTypes = {
    whiteMoves: PropTypes.array.isRequired,
    blackMoves: PropTypes.array.isRequired,
    goToMoveIndex: PropTypes.func.isRequired,
    generateColor: PropTypes.func.isRequired,
    moveIndex: PropTypes.number.isRequired,
    boxRef: PropTypes.element.isRequired
};


export default MovesDesktop
