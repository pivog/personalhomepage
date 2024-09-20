import React, {useState} from "react";
import {Input, Link, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {array, arrayOf, string} from "prop-types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const LatinVerbs = () => {
    let hintBeingUsed = false
    const randomProperty = function (object) {
        const keys = Object.values(object);
        return object[keys[Math.floor(keys.length * Math.random())]];
    };

    const words = ["amo 1."]
    let internalScore = words.length
    let checkedIndicies = []
    let unchecked = [words]
    let wordOnDisplay = randomProperty(unchecked)
    console.log(unchecked)
    function checkAnswers() {
        return
    }
    function giveHint(){
        hintBeingUsed = true
        return
    }

    return (
        <>
            <Box className={"horizontal-center"}>
                <h4>Riječ: lorem, 1 ipsum, dolor</h4>
                <h4>Vrijeme: Indikativ Imperfekta Aktivnog</h4>
            </Box>
            <Box className={"horizontal-center"}>
                <div>
                    <div>
                        <Table>
                            <TableHead>
                            <TableRow>
                                <TableCell><Typography className={"horizontal-center"}>Lice</Typography></TableCell>
                                <TableCell><Typography className={"horizontal-center"}>Jednina</Typography></TableCell>
                                <TableCell><Typography className={"horizontal-center"}>Množina</Typography></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            <TableRow>
                                <TableCell>1.</TableCell>
                                <TableCell id={"1-desktop"}><TextField></TextField></TableCell>
                                <TableCell id={"4-desktop"}><TextField></TextField></TableCell>
                            </TableRow>
                            <TableCell>2.</TableCell>
                            <TableCell id={"2-desktop"}><TextField></TextField></TableCell>
                            <TableCell id={"5-desktop"}><TextField></TextField></TableCell>
                            <TableRow>
                                <TableCell>3.</TableCell>
                                <TableCell id={"3-desktop"}><TextField></TextField></TableCell>
                                <TableCell id={"6-desktop"}><TextField></TextField></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <br/>
                    <br/>
                    <Button variant={"contained"} className={"horizontal-center"} onClick={checkAnswers}>Provjeri</Button>
                </div>
            </div>
        </Box>
        <Box sx={{bottom:"0", position:"absolute"}} className={"horizontal-center"}>In collaboration with <Link sx={{textDecoration:"none"}} href="https://dujma7.github.io/webpage1st/">Zvonko Dujmović</Link></Box>
    </>
    )
}

export default LatinVerbs;
