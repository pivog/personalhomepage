import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import PropTypes from "prop-types";


const MovesStripMobileOnly = (props) => {

    return (
        <Box sx={{display:{xs:"flex", sm:"none"}, overflowX:"scroll"}} height={"fit-content"} paddingY={"6px"} width={"100%"}>
            {
                props.moves.map((move, index) => (
                    <>
                        {
                            (index % 2 === 0) ? <Typography sx={{display:{xs:"inline-block"}, padding: "6px", margin: "0", background:"#373737"}}>{index / 2 + 1}.</Typography> : <></>
                        }
                        <Typography onClick={() => { props.goToMoveIndex(index) }} id={(index)+"mobileStrip"} style={{display:{xs:"inline-block"}, background: props.generateColor(index), padding: "6px", margin: "0"}}>
                            {move}
                        </Typography>
                    </>

                ))
            }
        </Box>
    )
}

MovesStripMobileOnly.propTypes = {
    moves: PropTypes.array.isRequired,
    goToMoveIndex: PropTypes.func
};

export default MovesStripMobileOnly