import React, {useState} from "react";
import {Input, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {array, arrayOf, string} from "prop-types";
import Button from "@mui/material/Button";

const LatinPractice = () => {
    let hintBeingUsed = false
    const randomProperty = function (object) {
        const keys = Object.keys(object);
        return object[keys[Math.floor(keys.length * Math.random())]];
    };

    const words = {
        "koji, -a, -e.": "qui, quae, quod",
        "zao, opak, loš": "malus, 3",
        "štedjeti": "parco, 3. peperci",
        "rijeka": "flumen, -minis, n",
        "obala": "ripa, -ae, f",
        "izvirati": "profluo, 3. fluxi",
        "siječanj": "Ianuarius, -i, m",
        "veljača": "Februarius, -i, m",
        "ožujak": "Martius, -i, m",
        "travanj": "Aprilis, -is, m",
        "svibanj": "Maius ,-i, m",
        "lipanj": "Iunius, -i, m",
        "Kvintil, srpanj": "Quintilis, -is, m",
        "sekstil, kolovoz": "Sextilis, -is, m",
        "rujan": "September, -bris, m",
        "listopad": "October, -bris, m",
        "studeni": "November, -bris, m",
        "prosinac": "December, -bris, m",
        "žena, suprug": "uxor, -oris, f",
        "Helena": "Helena, -ae, f",
        "Menelaj, spartanski kralj": "Menelaus, -i, m",
        "Sparta": "Sparta, -ae, f",
        "narod": "populus, -i, m",
        "radljivost, radinost": "industria, -ae, f",
        "čitav, sav": "totus, 3",
        "stvar, djelo, pojava": "res, rei, f",
        "dobitak, korist": "lucrum, -i, n",
        "jedan, jedini": "unus, 3",
        "gubitak, šteta": "damnum, -i, n",
        "drugi (od dvojice)": "alter, -tera, -terum",
        "(uzvik s dat.)jao! teško!": "vae",
        "sunce.": "sol, solis, m",
        "gospodar": "dominus, -i, m",
        "glas, kazivanje": "fama, -ae, f",
        "htjeti, željeti": "volo, velle, volui",
        "želja": "votum, -i, n",
        "tko, što": "quis, quid",
        "svjedok": "testis, -is, m",
        "oko": "oculus, -i, m",
        "uho": "auris, -is, f",
        "godina": "annus, -i, m",
        "jesen": "autumnus, -i, m",
        "zima": "hiems, hiemis, f",
        "stoljeće, vijek": "saeculum, -i, n",
        "prostor, razdoblje": "spatium, -i, n",
        "(veznik)ili": "aut",
        "Aleksandar": "Alexander, -dri, m",
        "Aleksandar Veliki, makedonski kralj": "Alexander Magnus",
        "tisućice": "milia",
        "Makedonci": "Macedones, -um, m",
        "(veznik)i ne, niti": "nec",
        "Heraklo, mitski grčki heroj": "Hercules, -is, m",
        "(prijedlog s akuz.)protiv": "contra",
        "Ilirik, rimska provincija, zemlja Ilira": "Illyricum, -i, n",
        "senator, član rimskog državnog vijeća": "senator, -oris, m",
        "(prilog)zatim, kasnije": "postea",
        "knjižnica": "bibliotheca, -ae, f",
        "mjesec (u godini)": "mensis, -is, m",
        "Kalende, prvi dan u mjesecu kod Rimljana": "Kalendae, -arum, f",
        "kohorta, deseti dio legije": "cohors, -rtis, f",
        "centurija, šezdeseti dio legije": "centuria, -ae, f",
        "legija, jedinica rimske vojske, imala je 3.600 do 6.000 pješaka": "legio, -onis, f",
        "koji (po redu)": "quotus, 3",
        "sat, ura": "hora, -ae, f",
        "triput": "ter",
        "po tri": "terni, -ae, -a",
        "četiri puta": "quater",
        "po četiri": "quaterni, -ae, -a",
        "pojedini": "singuli, -ae, -a",
        "po deset": "deni, -ae, -a",
        "(priložni broj)dvaput": "bis",
        "(prilog)brzo, hitro": "cito",
        "(veznik)ako, da, kad": "si",
        "činiti, napraviti, počiniti": "facio, 3. feci, factum",
        "mrtvac": "mortuus, -i, m",
        "spaljivati": "cremo, 1.",
        "pokopati": "sepelio, 4. sepelivi, sepultum",
        "Crno more": "Pontus Euxinus",
        "bitka, borba": "pugna, -ae, f",
        "(prilog)najprije": "primo",
        "koplje, sulica": "pilum, -i, n",
        "bacati": "iacio, 3. ieci, iactum",
        "(prilog)zatim, onda": "deinde",
        "navala, napad": "impetus, -us, m",
        "orao": "aquila, -ae, f",
        "hvatati, uzeti, osvojiti, zarobiti, obuzeti, pograbiti": "capio, 3. cepi, captum",
        "muha": "musca, -ae, f",
        "željeti": "cupio, 3. ivi, itum",
        "rudnik": "metalla, -orum, n",
        "iskopavati": "effodio, 3. fodi, fossum",
        "visoki službenik, visoka državna služba (u Rimu) vlast": "magistratus, -us, m",
        "(s akuz.)upravljati": "administro, 1.",
        "voditi, odvesti": "duco, 3. duxi, ductum",
        "pretor, nosilac vrhovne sudačke vlasti u Rimu": "praetor, -oris, m",
        "pravo": "ius, iuris, n",
        "reći, kazati": "dico, 3. dixi, dictum",
        "izricati presudu": "ius dicere",
        "edil, viši činovnik u Rimu koji se brinuo za hranu i red": "aedilis, -is, m",
        "sigurnost": "securitas, -atis, f",
        "ljetina": "annona, -ae, f",
        "igra": "ludus, -i, m",
        "godišnji": "annuus, 3",
        "kvestor, rimski činovnik koji se brinuo za državnu blagajnu": "quaestor, -oris, m",
        "blagajna (državna)": "aerarium, -i, n",
        "čuvati, stražariti": "custodio, 4.",
        "cenzor, viši rimski činovnik": "censor, -oris, m",
        "procjena imutka": "census, -us, m",
        "popisivati imutak": "censum agere",
        "promatrati, motriti": "observo, 1.",
        "nesreća": "res adversae",
        "neradinost, lijenost": "inertia, -ae, f",
        "umanjiti, oslabiti": "minuo, 3. minui, minutum",
        "popraviti": "corrigo, 3. rexi, rectum",
        "glad": "fames, -is, f",
        "objed, ručak": "cena, -ae, f",
        "začinjati balzamirati": "condio, 4.",
        "vrana": "cornix, -icis, f",
        "narodni": "popularis, -e",
        "slaviti": "celebro, 1.",
        "napuštati, napustiti": "desero, 3. serui, sertum",
        "malen, neznatan": "parvus, 3",
        "brodovlje": "classis, -is, f",
        "robovati, služiti": "servio, 4.",
        "Perzijanac": "Persa, -ae, m",
        "salaminski": "Salaminius, 3",
        "natjerati u bijeg, razbiti": "fugo, 1.",
        "Kartaga": "Carthago, -ginis, f",
        "Korint, grad u Grčkoj": "Corinthus, -i, f",
        "osvojiti": "expugno, 1.",
        "Sula, siloviti vođa optimatske stranke": "Sulla, -ae, m",
        "ubojstvo, pokolj": "caedes, -is, f",
        "krv": "sanguis, -inis, m",
        "napuniti, ispuniti": "compleo, 2. plevi, pletum",
        "otrov": "venenum, -i, n",
        "svršiti": "finio, 4.",
        "čvor, uzao": "nodus, -i, m",
        "Gordij, grad u Frigiji": "Gordium, -i, n",
        "sjeći, rezati": "seco, 1. secui, sectum",
        "oteti, ugrabiti": "eripio 3. ripui, reptum",
        "munja": "fulmen, -minis, n",
        "žezlo": "sceptrum, -i, n",
        "tiranin, silnik": "tyrannus, -i, m",
        "Slaveni": "Slavi, -orum, m",
        "(prilog)gotovo": "paene",
        "poluotok": "paeninsula, -ae, f",
        "Balkan": "Haemus, -i, m",
        "osvojiti, zauzeti, zaposjesti": "occupo, 1.",
        "Kserkso, perzijski kralj": "Xerxes, -is, m",
        "požar": "incendium, -i, n",
        "raskoš": "luxuria, -ae, f",
        "Amincije, Cezarov prijatelj": "Amintius, -i, m",
        "pisati, napisati": "scribo, 3. scripsi, scriptum",
        "Skiti, nomadski narod": "Scythae, -arum, m",
        "(prilog)neprekidno, uvijek": "perpetuo",
        "nepobijeđen": "invictus, 3",
        "ostati": "maneo, 2. mansi, mansum",
        "kralj": "rex, regis, m",
        "Tarkvinije, etrursko ime": "Tarquinius, -ii, m",
        "ohol": "superbus, 3",
        "Tarkvinije Oholi, posljednji rimski kralj": "Tarquinius Superbus, m",
        "tjerati, prognati": "pello, 3. pepuli, pulsum",
        "progonstvo": "exsilium, -i, n",
        "sjeći, posjeći, ubiti": "caedo, 3. cecidi, caesum",
        "pasti, poginuti": "cado, 3. cecidi",
        "veleposjed": "latifundium, -i, n",
        "upropastiti, izgubiti": "perdo, 3. perdidi, perditum",
        "(prilog)zaista, (veznik) a, pak": "vero",
        "pokrajina": "provincia, -ae, f",
        "stvar, djelo": "res, rei, f",
        "igla": "acus, -us, f",
        "taknuti, dodirnuti": "tango, 3. tetigi, tactum",
        "Kartažanin": "Carthaginiensis, -is, m",
        "Afrika": "Africa, -ae, f",
        "učiti (se), naučiti": "disco, 3. didici",
        "Darije, perzijski kralj": "Darius, -i, m",
        "petsto": "quingenti, -ae, -a",
        "Atenjanin": "Atheniensis, -is, m",
        "spremiti, opremiti, skupiti": "comparo, 1.",
        "(prijedlog s abl.)za": "pro",
        "zbor, skupština": "contio, -onis, f",
        "ilirski": "Illyricus, 3",
        "pobjeći, uteći, umaknuti, izbjeći": "effugio, 3. fugi",
        "križ": "crux, crucis, f",
        "pribiti, pričvrstiti": "affigo, 3. fixi, fixum",
        "gramatika, slovnica": "grammatica, -ae, f",
        "(prilog)dobro, valjano": "bene",
        "pisac": "scriptor, -oris, m",
        "(prilog)slijepo, nasumce, lakoumno": "temere",
        "Temistoklo, atenski državnik i vojskovođa": "Themistocles, -is, m",
        "obnoviti": "renovo, 1.",
        "zidine, bedemi": "moenia, -ium, n",
        "srušiti, razoriti, porušiti, razrušiti": "diruo, 3. rui, rutum",
        "pravilo, propis": "regula, -ae, f",
        "prekršiti riječ": "fallo, 3. fefelli, (deceptum)",
        "raditi": "laboro, 1.",
        "cvjetati, cvasti": "floreo, 2. ui"
    }
    let internalScore = Object.keys(words).length
    let checkedIndicies = []
    let unchecked = Object.keys(words)
    let wordOnDisplay = randomProperty(unchecked)
    console.log(unchecked)
    function checkWord() {
        if(document.getElementById("input").value === words[wordOnDisplay]){
            checkedIndicies.push(wordOnDisplay)
            unchecked = []
            for (let word in words) {
                if(!(checkedIndicies.includes(word))) {
                    unchecked.push(word)
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
            hintBeingUsed = false
        }
    }
    function giveHint(){
        hintBeingUsed = true
        document.getElementById("hint").innerHTML = "hint: "+words[wordOnDisplay]
    }

    return (
        <>
            <div className={"horizontal-center"}>
                <h1>Rešetanje latinskog</h1>
                <br/>
                <p style={{fontWeight: 500}} id={"word"}>
                    Riječ na hrvatskom: {wordOnDisplay}
                </p>
                <br/>
                <Input placeholder={"Odgovor"} type={"text"} id={"input"} onChange={checkWord}>
                </Input>
                <br/>
                <br/>
                <Button variant={"outlined"} value={"hint"} onClick={giveHint}>Hint</Button>
                <p id={"hint"}></p>
                <br/><br/><br/>
            </div>

            {/*<Typography className={"horizontal-center"} sx={{top: "90vh", position: "absolute"}}>Napravili Ivo Planinić i Lana Tikvić</Typography>*/}
        </>
    )
}

export default LatinPractice;
