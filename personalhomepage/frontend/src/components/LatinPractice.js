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
        "koji a e.": "qui quae quod",
        "zao opak loš": "malus 3",
        "štedjeti": "parco 3. peperci",
        "rijeka": "flumen minis n",
        "obala": "ripa ae f",
        "izvirati": "profluo 3. fluxi",
        "mjesec (u godini)": "mensis is m",
        "siječanj": "ianuarius i m",
        "veljača": "februarius i m",
        "ožujak": "martius i m",
        "travanj": "aprilis is m",
        "svibanj": "maius i m",
        "lipanj": "iunius i m",
        "kvintil srpanj": "quintilis is m",
        "sekstil kolovoz": "sextilis is m",
        "rujan": "september bris m",
        "listopad": "october bris m",
        "studeni": "november bris m",
        "prosinac": "december bris m",
        "žena suprug": "uxor oris f",
        "helena": "helena ae f",
        "menelaj spartanski kralj": "menelaus i m",
        "sparta": "sparta ae f",
        "kralj": "rex regis m",
        "narod": "populus i m",
        "radljivost radinost": "industria ae f",
        "čitav sav": "totus 3",
        "stvar djelo pojava": "res rei f",
        "dobitak korist": "lucrum i n",
        "jedan jedini": "unus 3",
        "gubitak šteta": "damnum i n",
        "drugi (od dvojice)": "alter tera terum",
        "(uzvik s dat.)jao! teško!": "vae",
        "sunce.": "sol solis m",
        "gospodar": "dominus i m",
        "glas kazivanje": "fama ae f",
        "htjeti željeti": "volo velle volui",
        "želja": "votum i n",
        "tko što": "quis quid",
        "svjedok": "testis is m",
        "oko": "oculus i m",
        "uho": "auris is f",
        "godina": "annus i m",
        "jesen": "autumnus i m",
        "zima": "hiems hiemis f",
        "stoljeće vijek": "saeculum i n",
        "prostor razdoblje": "spatium i n",
        "(veznik)ili": "aut",
        "aleksandar": "alexander dri m",
        "aleksandar veliki makedonski kralj": "alexander magnus",
        "tisućice": "milia",
        "makedonci": "macedones um m",
        "(veznik)i ne niti": "nec",
        "heraklo mitski grčki heroj": "hercules is m",
        "(prijedlog s akuz.)protiv": "contra",
        "ilirik rimska provincija zemlja ilira": "illyricum i n",
        "senator član rimskog državnog vijeća": "senator oris m",
        "(prilog)zatim kasnije": "postea",
        "knjižnica": "bibliotheca ae f",
        "kalende prvi dan u mjesecu kod rimljana": "kalendae arum f",
        "kohorta deseti dio legije": "cohors rtis f",
        "centurija šezdeseti dio legije": "centuria ae f",
        "legija jedinica rimske vojske imala je 3.600 do 6.000 pješaka": "legio onis f",
        "koji (po redu)": "quotus 3",
        "sat ura": "hora ae f",
        "triput": "ter",
        "po tri": "terni ae a",
        "četiri puta": "quater",
        "po četiri": "quaterni ae a",
        "pojedini": "singuli ae a",
        "po deset": "deni ae a",
        "(priložni broj)dvaput": "bis",
        "(prilog)brzo hitro": "cito",
        "(veznik)ako da kad": "si",
        "činiti napraviti počiniti": "facio 3. feci factum",
        "mrtvac": "mortuus i m",
        "spaljivati": "cremo 1.",
        "pokopati": "sepelio 4. sepelivi sepultum",
        "crno more": "pontus euxinus",
        "bitka borba": "pugna ae f",
        "(prilog)najprije": "primo",
        "koplje sulica": "pilum i n",
        "bacati": "iacio 3. ieci iactum",
        "(prilog)zatim onda": "deinde",
        "navala napad": "impetus us m",
        "orao": "aquila ae f",
        "hvatati uzeti osvojiti zarobiti obuzeti pograbiti": "capio 3. cepi captum",
        "muha": "musca ae f",
        "željeti": "cupio 3. ivi itum",
        "rudnik": "metalla orum n",
        "iskopavati": "effodio 3. fodi fossum",
        "visoki službenik visoka državna služba (u rimu) vlast": "magistratus us m",
        "(s akuz.)upravljati": "administro 1.",
        "voditi odvesti": "duco 3. duxi ductum",
        "pretor nosilac vrhovne sudačke vlasti u rimu": "praetor oris m",
        "pravo": "ius iuris n",
        "reći kazati": "dico 3. dixi dictum",
        "izricati presudu": "ius dicere",
        "edil viši činovnik u rimu koji se brinuo za hranu i red": "aedilis is m",
        "sigurnost": "securitas atis f",
        "ljetina": "annona ae f",
        "igra": "ludus i m",
        "godišnji": "annuus 3",
        "kvestor rimski činovnik koji se brinuo za državnu blagajnu": "quaestor oris m",
        "blagajna (državna)": "aerarium i n",
        "čuvati stražariti": "custodio 4.",
        "cenzor viši rimski činovnik": "censor oris m",
        "procjena imutka": "census us m",
        "popisivati imutak": "censum agere",
        "promatrati motriti": "observo 1.",
        "nesreća": "res adversae",
        "neradinost lijenost": "inertia ae f",
        "umanjiti oslabiti": "minuo 3. minui minutum",
        "popraviti": "corrigo 3. rexi rectum",
        "glad": "fames is f",
        "objed ručak": "cena ae f",
        "začinjati balzamirati": "condio 4.",
        "vrana": "cornix icis f",
        "narodni": "popularis e",
        "slaviti": "celebro 1.",
        "napuštati napustiti": "desero 3. serui sertum",
        "malen neznatan": "parvus 3",
        "brodovlje": "classis is f",
        "robovati služiti": "servio 4.",
        "perzijanac": "persa ae m",
        "salaminski": "salaminius 3",
        "natjerati u bijeg razbiti": "fugo 1.",
        "kartaga": "carthago ginis f",
        "korint grad u grčkoj": "corinthus i f",
        "osvojiti": "expugno 1.",
        "sula siloviti vođa optimatske stranke": "sulla ae m",
        "ubojstvo pokolj": "caedes is f",
        "krv": "sanguis inis m",
        "napuniti ispuniti": "compleo 2. plevi pletum",
        "otrov": "venenum i n",
        "svršiti": "finio 4.",
        "čvor uzao": "nodus i m",
        "gordij grad u frigiji": "gordium i n",
        "sjeći rezati": "seco 1. secui sectum",
        "oteti ugrabiti": "eripio 3. ripui reptum",
        "munja": "fulmen minis n",
        "žezlo": "sceptrum i n",
        "tiranin silnik": "tyrannus i m",
        "slaveni": "slavi orum m",
        "(prilog)gotovo": "paene",
        "poluotok": "paeninsula ae f",
        "balkan": "haemus i m",
        "osvojiti zauzeti zaposjesti": "occupo 1.",
        "kserkso perzijski kralj": "xerxes is m",
        "požar": "incendium i n",
        "raskoš": "luxuria ae f",
        "amincije cezarov prijatelj": "amintius i m",
        "pisati napisati": "scribo 3. scripsi scriptum",
        "skiti nomadski narod": "scythae arum m",
        "(prilog)neprekidno uvijek": "perpetuo",
        "nepobijeđen": "invictus 3",
        "ostati": "maneo 2. mansi mansum",
        "tarkvinije etrursko ime": "tarquinius ii m",
        "ohol": "superbus 3",
        "tarkvinije oholi posljednji rimski kralj": "tarquinius superbus m",
        "tjerati prognati": "pello 3. pepuli pulsum",
        "progonstvo": "exsilium i n",
        "sjeći posjeći ubiti": "caedo 3. cecidi caesum",
        "pasti poginuti": "cado 3. cecidi",
        "veleposjed": "latifundium i n",
        "upropastiti izgubiti": "perdo 3. perdidi perditum",
        "(prilog)zaista (veznik) a pak": "vero",
        "pokrajina": "provincia ae f",
        "stvar djelo": "res rei f",
        "igla": "acus us f",
        "taknuti dodirnuti": "tango 3. tetigi tactum",
        "kartažanin": "carthaginiensis is m",
        "afrika": "africa ae f",
        "učiti (se) naučiti": "disco 3. didici",
        "darije perzijski kralj": "darius i m",
        "petsto": "quingenti ae a",
        "atenjanin": "atheniensis is m",
        "spremiti opremiti skupiti": "comparo 1.",
        "(prijedlog s abl.)za": "pro",
        "zbor skupština": "contio onis f",
        "ilirski": "illyricus 3",
        "pobjeći uteći umaknuti izbjeći": "effugio 3. fugi",
        "križ": "crux crucis f",
        "pribiti pričvrstiti": "affigo 3. fixi fixum",
        "gramatika slovnica": "grammatica ae f",
        "(prilog)dobro valjano": "bene",
        "pisac": "scriptor oris m",
        "(prilog)slijepo nasumce lakoumno": "temere",
        "temistoklo atenski državnik i vojskovođa": "themistocles is m",
        "obnoviti": "renovo 1.",
        "zidine bedemi": "moenia ium n",
        "srušiti razoriti porušiti razrušiti": "diruo 3. rui rutum",
        "pravilo propis": "regula ae f",
        "prekršiti riječ": "fallo 3. fefelli deceptum",
        "raditi": "laboro 1.",
        "cvjetati cvasti": "floreo 2. ui"
    }
    let internalScore = Object.keys(words).length
    let checkedIndicies = []
    let unchecked = Object.keys(words)
    let wordOnDisplay = randomProperty(unchecked)
    console.log(unchecked)
    function checkWord() {
        if(document.getElementById("input").value.toLowerCase() === words[wordOnDisplay]){
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
