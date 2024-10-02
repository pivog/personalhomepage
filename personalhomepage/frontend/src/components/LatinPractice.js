import React, {useState} from "react";
import {Input, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {array, arrayOf, string} from "prop-types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const LatinPractice = () => {
    let hintBeingUsed = false
    const randomProperty = function (object) {
        const keys = Object.keys(object);
        return object[keys[Math.floor(keys.length * Math.random())]];
    };

    const words = {
        "more":"mare maris n",
        "dječak":"puer pueri m",
        "Homer pjesnik Ilijade i Odiseje":"Homerus i m",
        "sto":"centum",
        "star starinski drevan":"antiquus 3",
        "velik silan":"magnus 3",
        "dio strana":"pars partis f",
        "Kartaga":"Carthago ginis f",
        "Rimljanin":"Romanus i m",
        "Lakedemonjanin":"Lacedaemonius i m",
        "grčki":"Graecus 3",
        "Julije Cezar":"Iulius Caesar",
        "Kvintil stari rimski naziv za srpanj":"Quintilis is m",
        "knjiga":"liber bri m",
        "težak mučan":"gravis e",
        "znanje; znanost nauka":"scientia ae f",
        "lađa brod čamac":"navigium i n",
        "dok":"dum",
        "rad napor trud":"labor oris m",
        "otac":"pater tris m",
        "uvijek":"semper",
        "pjesnik":"poeta ae m",
        "isti":"idem eadem idem",
        "svijet":"orbis terrarum",
        "dati; zadati":"do dare dedi datum",
        "senator član rimskog državnog vijeća":"senator oris m",
        "Atenjanin":"Atheniensis is m",
        "javno; na državni trošak":"publice",
        "domovina zavičaj":"patria ae f",
        "Europa":"Europa ae f",
        "i te":"et",
        "Aristonik vođa ustanka protiv Rimljana u Pergamu":"Aristonicus i m",
        "čast":"honor oris m",
        "ja":"ego",
        "narod":"populus i m",
        "dom kuća":"domus us f",
        "učenik":"discipulus i m",
        "izvrstan":"egregius 3",
        "mjesec (u godini)":"mensis is m",
        "Scipion ime dvojice znamenitih rimskih vojskovođa":"Scipio onis m",
        "sav; svaki":"omnis e",
        "krug; svijet":"orbis is m",
        "divan sjajan; glasovit znamenit":"praeclarus 3",
        "narodni":"popularis e",
        "srpanj":"Iulius i m",
        "uzrok izvor; parnica; stvar":"causa ae f",
        "Romul mitski utemeljitelj Rima":"Romulus i m",
        "dobar":"bonus 3",
        "zločinstvo":"scelus eris n",
        "vrijeme doba":"tempus poris n",
        "s pravom po zasluzi":"merito",
        "pokrajina":"provincia ae f",
        "učitelj":"magister tri m",
        "gusar":"pirata ae m",
        "ne":"non",
        "djeca":"liberi orum m",
        "podrijetlo izvor":"origo ginis f",
        "koji a e":"qui quae quod",
        "gdje":"ubi",
        "stvar djelo; pojava; sadržaj":"res rei f",
        "vojska":"exercitus us m",
        "Aleksandar":"Alexander dri m",
        "tako na taj način":"ita",
        "August prvi rimski car":"Augustus i m",
        "za; k do po kod na; pred":"ad",
        "prije nego":"priusquam",
        "neznatan malen":"exiguus 3",
        "nego ali":"sed",
        "rimski":"Romanus 3",
        "tri":"tres tria",
        "pjesma":"carmen minis n",
        "iz od po sa":"e ex",
        "priča; basna":"fabula ae f",
        "konzul najviši službenik u Rimu":"consul ulis m",
        "natjecanje":"certamen minis n",
        "priroda":"natura ae f",
        "sam (glavom)":"ipse ipsa ipsum",
        "kazna":"poena ae f",
        "rana":"vulnus eris n",
        "onaj on; takav":"is ea id",
        "rat":"bellum i n",
        "mnogi":"multus 3",
        "od po":"a ab",
        "hrana jelo":"cibus i m",
        "treći":"tertius 3",
        "Rem brat Romulov":"Remus i m",
        "nov":"novus 3",
        "biti":"sum esse fui",
        "mjesto":"locus i m",
        "glad":"fames is f",
        "rado":"libenter",
        "pravo":"ius iuris n",
        "izdajica":"proditor oris m",
        "naš":"noster stra strum",
        "ti":"tu",
        "zapovjednik vojskovođa; car":"imperator oris m",
        "riječ izreka; glagol":"verbum i n",
        "Aleksandar Veliki makedonski kralj":"Alexander Magnus",
        "škola":"schola ae f",
        "Rim":"Roma ae f",
        "komedija vesela igra":"comoedia ae f",
        "sloboda":"libertas atis f",
        "izlagati prikazivati":"expono 3 posui positum",
        "ljubiti":"amo 1",
        "zvati nazivati nazvati":"appello 1",
        "osuditi kazniti":"damno 1",
        "poučavati obrazovati":"erudio 4",
        "pitati upitati":"interrogo 1",
        "obnoviti":"renovo 1",
        "izabrati birati":"eligo 3 legi lectum",
        "odgovarati":"respondeo 2 spondi sponsum",
        "začinjati; balzamirati":"condio 4",
        "napamet učiti":"edisco 3 edidici —",
        "hvaliti":"laudo 1",
        "vući privlačiti":"traho 3 traxi tractum",
        "odgajati odgojiti":"educo 1",
        "pozdravljati":"saluto 1",
        "čitati":"lego 3 legi lectum",
        "činiti napraviti počiniti":"facio 3 feci factum",
        "strašiti plašiti":"terreo 2 ui itum",
        "zvati nazvati":"voco 1",
        "pobjeđivati pobijediti":"vinco 3 vici victum",
        "optužiti":"accuso 1",
        "micati poticati; krenuti kretati":"moveo 2 movi motum",
        "graditi":"aedifico 1",
        "napadati uznemirivati":"infesto 1",
        "pasti poginuti":"cado 3 cecidi",
        "ozdraviti koga liječiti":"sano 1",
        "veseliti zabavljati":"delecto 1",
        "opasivati; oplakivati":"cingo 3 cinxi cinctum",
        "osnovati utemeljiti":"condo 3 didi ditum",
        "kazniti":"punio 4",
        "ne znati ne poznavati":"ignoro 1",
        "zatvoriti ograničiti; završiti":"claudo 3 clausi clausum",
        "hvatati uzeti osvojiti zarobiti obuzeti pograbiti":"capio 3 cepi captum",
        "reći kazati; nazvati imenovati":"dico 3 dixi dictum",
        "razoriti uništiti":"deleo 2 levi letum",
        "dijeliti; rastavljati; razdijeliti":"divido 3 visi visum",
        "željeti":"cupio 3 ivi itum",
        "lajati":"latro 1",
        "uhvatiti obuhvatiti":"comprehendo 3 prehendi prehensum",
        "pljeskati odobravati":"plaudo 3 plausi plausum",

    }
    let internalScore = Object.keys(words).length
    let checkedIndicies = []
    let unchecked = Object.keys(words)
    let wordOnDisplay = randomProperty(unchecked)
    console.log(unchecked)
    function checkWord() {
        if(document.getElementById("input").value.toLowerCase() === words[wordOnDisplay].toLowerCase()){
            if (!hintBeingUsed){
                checkedIndicies.push(wordOnDisplay)
                unchecked = []
                for (let word in words) {
                    if(!(checkedIndicies.includes(word))) {
                        unchecked.push(word)
                    }
                }
            }
            // unchecked = unchecked.filter((element, index, arr) => {
            //     return index !== wordOnDisplay
            // })
            if(Object.keys(unchecked).length === 0) {
                alert()
                unchecked = Object.keys(words)
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
        document.getElementById("hint").innerHTML = "hint: "+words[wordOnDisplay]
        document.getElementById("wordsLeft").innerHTML = "Riječi preostalo: "+unchecked.length
    }

    return (
        <>
            <div className={"horizontal-center"}>
                <h1>Rešetanje latinskog</h1>
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
            </div>

            {/*<Typography className={"horizontal-center"} sx={{top: "90vh", position: "absolute"}}>Napravili Ivo Planinić i Lana Tikvić</Typography>*/}
        </>
    )
}

export default LatinPractice;
