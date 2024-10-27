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
        'vrijeme, doba':'tempus, -poris, n'
        'srdit, ljutit':'iratus, 3'
        'izlagati, prikazivati':'expono, 3. posui, positum'
        'dobar':'bonus, 3'
        'težak, mučan':'gravis, -e'
        'protiv':'contra (prijedlog s akuz.)'
        'Rimljanin':'Romanus, -i, m'
        'trijumvir, član kolegija od tri člana':'triumvir, -i, m'
        'Rim':'Roma, -ae, f'
        'biti':'sum, esse, fui'
        'gusar':'pirata, -ae, m'
        'Cezar, rimski vojskovođa i državnik; car':'Caesar, -aris, m'
        'hrana, jelo':'cibus, -i, m'
        'poučavati, obrazovati':'erudio, 4.'
        'uhvatiti, obuhvatiti':'comprehendo, 3. prehendi, prehensum'
        'osuditi, kazniti':'damno, 1.'
        'grčki':'Graecus, 3'
        'Gali, skupno ime za keltska plemena u današnjoj Francuskoj':'Galli, -orum, m'
        'dječak':'puer, pueri, m'
        'čast':'honor, -oris, m'
        'naš':'noster, -stra, -strum'
        'veseliti, zabavljati':'delecto, 1.'
        'koji, -a, -e':'qui, quae, quod'
        'pitati, upitati':'interrogo, 1.'
        'ništa':'nihil, nullius rei, n'
        'izvrstan':'egregius, 3'
        'rado':'libenter (prilog)'
        'konzul, najviši službenik u Rimu':'consul, -ulis, m'
        's pravom, po zasluzi':'merito (prilog)'
        'rimski':'Romanus, 3'
        'tri':'tres, tria'
        'javno; na državni trošak':'publice (prilog)'
        'prije nego':'priusquam (veznik)'
        'pasti, poginuti':'cado, 3. cecidi, – (casurus)'
        'šija, vrat':'cervix, -icis, f'
        'Aleksandar':'Alexander, -dri, m'
        'u, na; s akuz. ima i značenje: prema, protiv':'in (prijedlog s akuz. i abl.)'
        'muževnost, hrabrost, krepost; vrlina':'virtus, -utis, f'
        'reći, kazati; nazvati, imenovati':'dico, 3. dixi, dictum'
        'lak':'facilis, -e'
        'ne, da ne; (veznik) da ne':'ne (negacija)'
        'živjeti':'vivo, 3. vixi, — (victurus)'
        'djeca':'liberi, -orum, m'
        'Romul, mitski utemeljitelj Rima':'Romulus, -i, m'
        'lak':'levis, -e'
        'srpanj':'Iulius, -i, m'
        'obnoviti':'renovo, 1.'
        'odgovarati':'respondeo, 2. spondi, sponsum'
        'zapovjednik, vojskovođa; car':'imperator, -oris, m'
        'ljubiti':'amo, 1.'
        'mjesec (u godini)':'mensis, -is, m'
        'više, većma':'magis (prilog)'
        'voditi, odvesti':'duco, 3. duxi, ductum'
        'hvatati, uzeti, osvojiti, zarobiti, obuzeti, pograbiti':'capio, 3. cepi, captum'
        'narod':'populus, -i, m'
        'otac':'pater, -tris, m'
        'zvati, nazvati':'voco, 1.'
        'ti':'tu'
        'razoriti, uništiti':'deleo, 2. levi, letum'
        'Aleksandar Veliki, makedonski kralj':'Alexander Magnus'
        'jedan, jedini':'unus, 3'
        'znanje; znanost, nauka':'scientia, -ae, f'
        'kazniti':'punio, 4.'
        'nov':'novus, 3'
        'govornik':'orator, -oris, m'
        'učitelj':'magister, -tri, m'
        'more':'mare, maris, n'
        'ja':'ego'
        'priroda':'natura, -ae, f'
        'Julije Cezar':'Iulius Caesar'
        'stvar, djelo; pojava; sadržaj':'res, rei, f'
        'vući, privlačiti':'traho, 3. traxi, tractum'
        'dati; zadati':'do, dare, dedi, datum'
        IZDVOJENI GLAGOLI
        'senator, član rimskog državnog vijeća':'senator, -oris, m'
        'pljeskati, odobravati':'plaudo, 3. plausi, plausum'
        'nego, ali':'sed (veznik)'
        'dom, kuća':'domus, -us, f'
        'opasivati; oplakivati':'cingo, 3. cinxi, cinctum'
        'pobjeđivati, pobijediti':'vinco, 3. vici, victum'
        'svijet':'orbis terrarum'
        'za; k, do, po, kod, na; pred':'ad (prijedlog s akuz.)'
        'strašiti, plašiti':'terreo, 2. ui, itum'
        'hvaliti':'laudo, 1.'
        'divan, sjajan; glasovit, znamenit':'praeclarus, 3'
        'krug; svijet':'orbis, -is, m'
        'onaj, on; takav':'is, ea, id'
        'sam (glavom)':'ipse, ipsa, ipsum'
        'Demosten, najveći grčki govornik, protivnik Filipa Makedonskog':'Demosthenes, -is, m'
        'narodni':'popularis, -e'
        'mnogi':'multus, 3'
        'velik, silan':'magnus, 3'
        'Kvintil, stari rimski naziv za srpanj':'Quintilis, -is, m'
        'pokrajina':'provincia, -ae, f'
        'komedija, vesela igra':'comoedia, -ae, f'
        'domovina, zavičaj':'patria, -ae, f'
        'savršen':'perfectus, 3'
        'rasti, množiti se':'cresco, 3. crevi, cretum'
        'zatvoriti, ograničiti; završiti':'claudo, 3. clausi, clausum'
        'i, te':'et (veznik)'
        'zločinstvo':'scelus, -eris, n'
        'glad':'fames, -is, f'
        'odgajati, odgojiti':'educo, 1.'
        'graditi':'aedifico, 1.'
        'Homer, pjesnik Ilijade i Odiseje':'Homerus, -i, m'
        'iz, od, po, sa':'e, ex (prijedlog s abl.)'
        'Aristonik, vođa ustanka protiv Rimljana u Pergamu':'Aristonicus, -i, m'
        'lađa, brod, čamac':'navigium, -i, n'
        'osnovati, utemeljiti':'condo, 3. didi, ditum'
        'Lakedemonjanin':'Lacedaemonius, -i, m'
        'moj':'meus, 3'
        'uzrok, izvor; parnica; stvar':'causa, -ae, f'
        'napamet učiti':'edisco, 3. edidici, —'
        'kazna':'poena, -ae, f'
        'činiti, napraviti, počiniti':'facio, 3. feci, factum'
        'zemlja':'terra, -ae, f'
        'treći':'tertius, 3'
        'pjesma':'carmen, -minis, n'
        'knjiga':'liber, -bri, m'
        'ubiti':'interficio, 3. feci, fectum'
        'micati, poticati; krenuti, kretati':'moveo, 2. movi, motum'
        'dok':'dum (veznik)'
        'ne znati, ne poznavati':'ignoro, 1.'
        'pjesnik':'poeta, -ae, m'
        'učenik':'discipulus, -i, m'
        'rana':'vulnus, -eris, n'
        'uvijek':'semper (prilog)'
        'cvjetati, cvasti':'floreo, 2. ui, —'
        'gdje':'ubi (prilog)'
        'ozdraviti koga, liječiti':'sano, 1.'
        'Scipion, ime dvojice znamenitih rimskih vojskovođa':'Scipio, -onis, m'
        'nego; kako, koliko; od':'quam (uz komparativ)'
        'Atenjanin':'Atheniensis, -is, m'
        'dio, strana':'pars, partis, f'
        'izdajica':'proditor, -oris, m'
        'čitati':'lego, 3. legi, lectum'
        'isti':'idem, eadem, idem'
        'pravo':'ius, iuris, n'
        'mjesto':'locus, -i, m'
        'zvati, nazivati, nazvati':'appello, 1.'
        'vojska':'exercitus, -us, m'
        'od, po':'a, ab (prijedlog s ablativom)'
        'o da, kamo sreće da':'utinam (veznik)'
        'sloboda':'libertas, -atis, f'
        'sav; svaki':'omnis, -e'
        'riječ, izreka; glagol':'verbum, -i, n'
        'Ciceron, slavni rimski govornik':'Cicero, -onis, m'
        'rad, napor, trud':'labor, -oris, m'
        'Europa':'Europa, -ae, f'
        'pozdravljati':'saluto, 1.'
        'Vercingetoriks, vođa Gala u ratu protiv Cezara':'Vercingetorix, -igis, m'
        'lajati':'latro, 1.'
        'napadati, uznemirivati':'infesto, 1.'
        'nijedan':'nullus, 3'
        'priča; basna':'fabula, -ae, f'
        'brat':'frater, -tris, m'
        'dijeliti; rastavljati; razdijeliti':'divido, 3. visi, visum'
        'neznatan, malen':'exiguus, 3'
        '1. (namjerni) da; 2. (posljedični) da, te; 3. (vremenski) kako, čim; 4. (dopusni) iako, makar; 5. (poredbeni) kako, kao':'ut (veznik)'
        'tako, na taj način':'ita (prilog)'
        'rat':'bellum, -i, n'
        'brzina':'celeritas, -atis, f'
        'natjecanje':'certamen, -minis, n'
        'star, starinski, drevan':'antiquus, 3'
        'optužiti':'accuso, 1.'
        'August, prvi rimski car':'Augustus, -i, m'
        'podrijetlo, izvor':'origo, -ginis, f'
        'škola':'schola, -ae, f'
        'imati; držati, smatrati':'habeo, 2. habui, habitum'
        'sto':'centum'
        'željeti':'cupio, 3. ivi, itum'
        'Kartaga':'Carthago, -ginis, f'
        'Rem, brat Romulov':'Remus, -i, m'
        'izabrati, birati':'eligo, 3. legi, lectum'
        'začinjati; balzamirati':'condio, 4.'
        'ne':'non (negacija)'

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
