import React, {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogTitle, Grid, Input, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import PropTypes, {array, arrayOf, string} from "prop-types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {setCookie} from "./CookiesMainpulation";
import {getCookie} from "./CookiesMainpulation";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";




const SettingsDialog = (props) => {
    const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Odaberi Vježbe</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} justifyContent="center">
            {[1, 2, 3, 4, 5].map((number) => (
              <Grid item key={number}>
                <Button
                  variant="contained"
                  sx={{
                    minWidth: '60px',
                    minHeight: '60px',
                    borderRadius: 0,
                    backgroundColor: '#1976d2',
                    color: '#fff',
                  }}
                >
                  {number}
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
    </Dialog>
  );
}
SettingsDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
}

const Tester = (props) => {

    const [openSettings, setOpenSettings] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(props.vjezbe_ids);

    let hintBeingUsed = false
    const randomProperty = function (object) {
        const keys = Object.keys(object);
        return object[keys[Math.floor(keys.length * Math.random())]];
    };
    let internalScore = Object.keys(props.words).length
    let checkedIndicies = []
    let unchecked = Object.keys(props.words)
    let wordOnDisplay = randomProperty(unchecked)
    console.log(unchecked)
    function checkWord() {
        if(document.getElementById("input").value.toLowerCase() === words[wordOnDisplay].toLowerCase()){
            if (!hintBeingUsed){
                checkedIndicies.push(wordOnDisplay)
                unchecked = []
                for (let word in props.words) {
                    if(!(checkedIndicies.includes(word))) {
                        unchecked.push(word)
                    }
                }
            }
            // unchecked = unchecked.filter((element, index, arr) => {
            //     return index !== wordOnDisplay
            // })
            if(Object.keys(unchecked).length === 0) {
                unchecked = Object.keys(props.words)
            }
            document.getElementById("input").value = ""
            document.getElementById("hint").innerHTML = ""
            wordOnDisplay = randomProperty(unchecked)
            document.getElementById("word").innerHTML = "Riječ na hrvatskom: "+wordOnDisplay
            document.getElementById("wordsLeft").innerHTML = "Riječi preostalo: "+unchecked.length
            hintBeingUsed = false
        }
    }
    function giveHint(){
        hintBeingUsed = true
        document.getElementById("hint").innerHTML = "hint: "+props.words[wordOnDisplay]
        document.getElementById("wordsLeft").innerHTML = "Riječi preostalo: "+unchecked.length
    }

    return (
        <>
            <div className={"horizontal-center"}>
                <h1>Rešetanje latinskog</h1>
                <br/>
                <Button variant={"outlined"}>Odaberi Riječi</Button>
                <br/>
                <p style={{}} id={"wordsLeft"}>
                    Riječi preostalo: {unchecked.length}
                </p>
                <p style={{fontWeight: 500}} id={"word"}>
                    Riječ na hrvatskom: {wordOnDisplay}
                </p>
                <br/>
                <Input placeholder={"Odgovor"} type={"text"} id={"input"} onChange={checkWord}>
                </Input>
                <br/>
                <br/>
                <Button variant={"outlined"} onClick={giveHint}>Rješenje</Button>
                <p id={"hint"}></p>
                <br/><br/><br/>
                <SettingsDialog onClose={(_)=>{}} open={true} selectedValue={selectedValue}/>
            </div>
        </>
    )
}
Tester.propTypes = {
    words: PropTypes.object.isRequired,
    setVjezbe_ids: PropTypes.func.isRequired,
}



const LatinPractice = () => {

    let vjezbe_cookie = getCookie("vjezbe_ids")
    if(vjezbe_cookie == undefined){
        setCookie(["36", "37"].join(" "))
        vjezbe_cookie = ["36", "37"]
    }

    const [vjezbe_ids, setVjezbeIds] = useState(vjezbe_cookie);

    const [words, setWords] = useState({})

    useEffect(() => {
        fetch("/api/getlatinwords", {
                method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
                body: JSON.stringify({
                    selected: vjezbe_ids.join(" "),
                })
            }
        ).then(res => {
            //check status code(guard clause)
            if (res.status !== 200) {
                alert("Error");
            }
            return res
        }).then(res => res.json()
            .then(data => {
                console.log(data)
                setWords(data);
            }))
    }, [vjezbe_ids]);

    return (
        <>
            <Tester words={words} setVjezbe_ids={setVjezbeIds}/>
        </>
    )



}



export default LatinPractice;
