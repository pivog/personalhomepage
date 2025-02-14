import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useSearchParams} from "react-router-dom";
import {Link} from "@mui/material";

const projectShowcase = () => {
    const [params] = useSearchParams()
    const [project, setProject] = useState({"title":"a"});
    useEffect(() => {
        fetch(`/api/getproject?id=${params.get("id")}`)
            .then((res) => {
                console.log(res)
                return res.json()
            })
            .then(data => {
                console.log(data)
                setProject(data)
        })
    }, []);

    return (
        <Box display={"flex"} flexDirection={"column"} textAlign={"center"} justifyItems={"center"}>
            <Typography variant={"h3"}>{project["title"]}</Typography>
            <br/><br/>
            <Box sx={{height:{xs:"100px", sm:"300px"}, width:{xs:"100px", sm:"300px"}}} className={"horizontal-center"}>
                <img src={project["imgUrl"]} style={{height:"100%", width:"100%"}} alt={"picture of the project"}/>
            </Box>
            <br/><br/>
            <Typography fontSize={"20px"}>{project["body"]}</Typography>
            <br/><br/>
            <Link sx={{textDecoration: "none"}} href={project["urlToSite"]}>
                <Typography fontSize={"20px"}>Visit</Typography>
            </Link>
        </Box>
    )
}

export default projectShowcase;