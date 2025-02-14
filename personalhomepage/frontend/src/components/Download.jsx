import React, { useState, useEffect } from "react";
import { getCookie } from "./CookiesMainpulation";
import { Button } from "@mui/material";


function initDownload(filename){
    let data

    fetch("/api/downloadfile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: getCookie("token"),
            filename: filename,
        })
    }).then(res => res.text().then((txt)=>{
            data = txt
            const blob = new Blob([data], {type: 'text/plain'});
            if(window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveBlob(blob, filename);
            }
            else{
                const elem = window.document.createElement('a');
                elem.href = window.URL.createObjectURL(blob);
                elem.download = filename;        
                document.body.appendChild(elem);
                elem.click();        
                document.body.removeChild(elem);
            }
        }))
}

const DownloadPage = () => {
    const [filenames, setfilenames] = useState([])

    useEffect(() => {
        if(getCookie("token") === undefined){ // missing token
            return navigate("/login")
        }

        fetch("/api/listdownloads", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: getCookie("token"),
                crsfToken: "",
            })
        }
        ).then(res => res.json()).then(data => setfilenames(data))
    }, []);
    return (
        <div>
            a:{filenames.map((filename, index)=>(
            <Button variant="text" onClick={()=>initDownload(filename)}>{filename}</Button>
        ))}
        </div>
    )
}

export default DownloadPage;
