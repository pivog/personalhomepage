import React, {useEffect, useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input} from "@mui/material";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import {setCookie} from "./CookiesMainpulation";
import {getCookie} from "./CookiesMainpulation";
import getCSRFCookie from "./csrf";
import Typography from "@mui/material/Typography";


const ButtonSelectionDialog = (props) => {
    const available = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"];
  const [selectedButtons, setSelectedButtons] = useState(available.map((value, _)=>{
      return [value, props.selected.includes(value)]
  }));

  // Handler for selecting/deselecting buttons
  const handleButtonClick = (index) => {
    setSelectedButtons((prev) =>
      prev.map((selected, i) => (i === index ? [selected[0], !selected[1]] : selected))
    );
  };

  // Handler for save button click
  const handleSave = () => {
      let selectedIds = []
      selectedButtons.forEach((current) => {
          if (current[1]) {
              selectedIds.push(current[0])
          }
      })
    props.onSave(selectedIds);
    props.onClose(); // Close the dialog
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Odaberi Vježbe</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} justifyContent="center">
          {/* Row for square buttons */}
          {selectedButtons.map((button, index) => (
            <Grid item key={index}>
              <Button
                variant="contained"
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: button[1] ? '#1976d2' : '#d3d3d3', // blue if selected, gray if not
                  color: button[1] ? 'white' : 'black',
                }}
                onClick={() => handleButtonClick(index)}
              >
                {button[0]}
              </Button>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          Spasi
        </Button>
      </DialogActions>
    </Dialog>
  );
};
ButtonSelectionDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    selected: PropTypes.array.isRequired,
}


const Tester = (props) => {

    const [openSettings, setOpenSettings] = React.useState((getCookie("vjezbe_ids") === undefined) ? true: false);
    const handleSave = (selected) => {
        setCookie('vjezbe_ids', selected.join(' '))
        props.setVjezbe_ids(selected)
    }
    const closeSettings = () => {
        setOpenSettings(false)
    }

    const [hintBeingUsed, setHintBeingUsed] = useState(false)
    const [checkedIndicies, setCheckedIndicies] = useState([])
    const [unchecked, setUnchecked] = useState(Object.keys(props.words))
    const [wordOnDisplay, setWordOnDisplay] = useState(randomProperty(Object.keys(props.words)))

    function resetInput() {
        document.getElementById("input").value = ""
        setHintBeingUsed(false)
        setWordOnDisplay(randomProperty(unchecked))
    }
    function resetAll() {
        resetInput()
        let _checkedIndicies = []
        let _unchecked = Object.keys(props.words)
        setCheckedIndicies(_checkedIndicies)
        setUnchecked(_unchecked)

    }

    function randomProperty (object) {
        const keys = Object.keys(object);
        return object[keys[Math.floor(keys.length * Math.random())]];
    }

    useEffect(() => {
        resetAll()
    }, [props.words]);

    useEffect(() => {
        resetInput()
    }, [unchecked]);

    function checkWord() {
        if(document.getElementById("input").value.toLowerCase() === props.words[wordOnDisplay].toLowerCase()){
            if (!hintBeingUsed){
                let _checkedIndicies = checkedIndicies
                _checkedIndicies.push(wordOnDisplay)
                let _unchecked = []
                for (let word in props.words) {
                    if(!(_checkedIndicies.includes(word))) {
                        _unchecked.push(word)
                    }
                }
                if(Object.keys(_unchecked).length === 0) {
                    resetInput()
                    _checkedIndicies = []
                    _unchecked = Object.keys(props.words)
                }
                console.log(_unchecked)
                setCheckedIndicies(_checkedIndicies)
                setUnchecked(_unchecked)
            }
            resetInput()
            if(Object.keys(unchecked).length === 0) {
                resetAll()
            }
        }
    }
    function giveHint() {
        setHintBeingUsed(true)
    }

    return (
        <>
            <div className={"horizontal-center"}>
                <h1>Rešetanje latinskog</h1>
                <br/>
                <Button onClick={() => {setOpenSettings(true)}} variant={"outlined"}>Odaberi Riječi</Button>
                <br/>
                <p style={{}} id={"wordsLeft"}>
                    {"Riječi preostalo: "+unchecked.length}
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
                <Typography variant={'p'} sx={{display:(hintBeingUsed ? 'block' : 'none')}} id={"hint"}>{"rjesenje: "+props.words[wordOnDisplay]}</Typography>
                <br/><br/><br/>
                <ButtonSelectionDialog onClose={closeSettings} open={openSettings} onSave={handleSave} selected={props.vjezbe_ids}/>
            </div>
        </>
    )
}
Tester.propTypes = {
    words: PropTypes.object.isRequired,
    setVjezbe_ids: PropTypes.func.isRequired,
    vjezbe_ids: PropTypes.array.isRequired,
}


const LatinPractice = () => {

    let vjezbe_cookie = getCookie("vjezbe_ids")
    if(vjezbe_cookie == undefined){
        const initial = [] // in the form ['32', ..., '42']
        setCookie([].join(initial))
        vjezbe_cookie = initial
    } else vjezbe_cookie = vjezbe_cookie.split(' ')

    const [vjezbe_ids, setVjezbeIds] = useState(vjezbe_cookie);

    const [words, setWords] = useState({})

    useEffect(() => {
        fetch("/api/getlatinwords", {
                method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFCookie(),
            },
                body: JSON.stringify({
                    selected: vjezbe_ids.join(" "),
                }),
                credentials: 'same-origin',
            }
        ).then(res => {
            //check status code(guard clause)
            if (res.status !== 200) {
                alert("Error");
            }
            return res
        }).then(res => res.json()
            .then(data => {
                setWords(data);
            }))
    }, [vjezbe_ids]);

    return (
        <>
            <Tester words={words} setVjezbe_ids={setVjezbeIds} vjezbe_ids={vjezbe_ids}/>
        </>
    )



}


export default LatinPractice;
