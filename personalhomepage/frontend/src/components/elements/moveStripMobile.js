import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import PropTypes from "prop-types";


const MovesStripMobileOnly = (props) => {

    return (
        <Box sx={{display:{xs:"flex", sm:"none"}, flexDirection:"row", overflowX:"scroll", maxLines:"1"}} height={"fit-content"} paddingY={"6px"}>
            {
                props.moves.map((move, index) => (
                    <>
                        {
                            (index % 2 === 0) ? <Typography sx={{display:{xs:"block"}, padding: "6px", margin: "0", background:"#373737", width:"fit-content"}}>{index / 2 + 1}.</Typography> : <></>
                        }
                        <Box sx={{width:"50px"}}>
                            <Typography onClick={() => { props.goToMoveIndex(index) }} id={(index)+"mobileStrip"} style={{display:"block", background: props.generateColor(index), padding: "6px 12px", margin: "0", maxLines:"1", width:"max-content"}}>
                                {move}
                            </Typography>
                        </Box>
                    </>

                ))
            }
        </Box>
    )
}

MovesStripMobileOnly.propTypes = {
    moves: PropTypes.array.isRequired,
    goToMoveIndex: PropTypes.func,
    generateColor: PropTypes.func
};

export default MovesStripMobileOnly