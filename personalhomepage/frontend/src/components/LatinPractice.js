import React, {useState} from "react";
import {Input, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {array} from "prop-types";

const LatinPractice = () => {

    const [wordOnDisplay, setWordOnDisplay] = useState("test1")
    const randomProperty = function (object) {
        const keys = Object.keys(object);
        return object[keys[Math.floor(keys.length * Math.random())]];
    };

    const words = {
        "test1": "test1",
        "test2": "test2",
        "test3": "test3",
        "test4": "test4",
        "test5": "test5",
        "test6": "test6",
    }
    var unchecked = words
    function checkWord() {
        if(document.getElementById("input").value == words[wordOnDisplay]){
            // delete unchecked[wordOnDisplay]
            unchecked = unchecked.filter((element, index, arr) => {
                return index !== wordOnDisplay
            })
            if(unchecked === {}) {
                unchecked = words
            }
            document.getElementById("input").value = ""
            setWordOnDisplay(randomProperty(unchecked))
            console.log(Object.keys(unchecked).length)
        }
    }

    return (
        <div className={"horizontal-center"}>
            <h1>Rešetanje latinskog</h1>
            <br/>
            <br/>
            <Typography fontWeight={500}>
                Riječ na latinskom: {wordOnDisplay}
            </Typography>
            <br/>
            <Input placeholder={"Odgovor"} type={"text"} id={"input"} onChange={checkWord}>
            </Input>
            <br/><br/><br/><br/>
            <p>Napravili Ivo Planinić i Lana Tikvić</p>
        </div>
    )
}

export default LatinPractice;
