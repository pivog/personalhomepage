import React, {useEffect, useState} from "react";
import {Input, Link, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {array, arrayOf, string} from "prop-types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tense from "./tense.mjs";

const LatinVerbs = () => {
    let hintBeingUsed = false
    const [errors, setErrors] = useState([undefined, undefined, undefined, undefined, undefined, undefined])
    const resetErrors = () => {
        setErrors([undefined, undefined, undefined, undefined, undefined, undefined])
    }
    const randomProperty = function (object) {
        return object[Math.floor(object.length * Math.random())];
    };
    const randomKey = function (object) {
        const keys = Object.keys(object);
        return object[keys[Math.floor(keys.length * Math.random())]];
    };

    const words = ["amo 1."]
    const tenses = {
        "indikativ prezenta aktivnog" : new Tense([
            ["or", "aris", "atur", "amur", "amini", "antur"],
            ["or", "ris", "tur", "mur", "mini", "ntur"],
            ["or", "eris", "itur", "imur", "imini", "untur"],
            ["or", "ris", "tur", "mur", "mini", "untur"]
        ])
    }
    let internalScore = words.length
    let checkedIndicies = []
    let unchecked = [words]
    const [wordOnDisplay, setWordOndisplay] = useState(randomProperty(unchecked))
    const [tenseOnDisplay, setTenseOndisplay] = useState(randomProperty(Object.keys(tenses)))

    useEffect(() => {
        let _answers = []
        for (let i = 0; i < 6; i++) {
            console.log(tenseOnDisplay)
            _answers.push(tenses[tenseOnDisplay].getVariation(words[0], i))
        }
        console.log(_answers)
        setAnswers(_answers)
    }, [tenseOnDisplay]);

    const [answers, setAnswers] = useState(["a", "a", "a", "a", "a", "a"])
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
                <Typography variant={"h5"}>Riječ: {wordOnDisplay}</Typography>
                <Typography variant={"h5"}>Vrijeme: {tenseOnDisplay}</Typography>
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
                                <TableCell><TextField id={"0-desktop"}></TextField></TableCell>
                                <TableCell><TextField id={"3-desktop"}></TextField></TableCell>
                            </TableRow>
                            <TableCell>2.</TableCell>
                            <TableCell><TextField id={"1-desktop"}></TextField></TableCell>
                            <TableCell><TextField id={"4-desktop"}></TextField></TableCell>
                            <TableRow>
                                <TableCell>3.</TableCell>
                                <TableCell><TextField id={"2-desktop"}></TextField></TableCell>
                                <TableCell><TextField id={"5-desktop"}></TextField></TableCell>
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
