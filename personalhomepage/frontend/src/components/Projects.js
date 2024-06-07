import React, {useEffect, useState} from "react";
import params, {map} from "../../static/admin/js/vendor/xregexp/xregexp";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {Link} from "@mui/material";

const Projects = () => {

    const [projectElements, setProjectElements] = useState([]); // example element ["0(id)", "name", "/static/images/ivobass.jpeg"]

    useEffect(() => {
        fetch(`/api/getprojects`)
            .then(res => res.json()
                .then(data => {
                    console.log(data)
                    let _projectElements = []
                    Object.keys(data).forEach(key => {
                        _projectElements.push([key, data[key].split(";")[0], data[key].split(";")[1]]);
                    });
                    setProjectElements(_projectElements)
                })
        )
    }, []);

    return (
        <div>
            <Divider/>
            {
                projectElements.map((value, index) => (
                    <Link href={`/project?id=${value[0]}`} sx={{textDecoration:"none"}}>
                        <Box>
                            <Box height={"10px"}/>
                            <Box width={"100%"} justifyContent={"center"} flexDirection={"row"} display={"flex"}>
                                <Box width={"fit-content"}><img className={"card mid-image"} src={value[2]} alt={value[2]}/></Box>
                                <Box width={"20px"}/>
                                <Box width={"fit-content"}><Typography className={"vertical-center"} sx={{width:"fit-content", color:"#ffffff"}} variant={"h4"}>{value[1]}</Typography></Box>
                            </Box>
                            <Box height={"6px"}/>
                            <Divider/>
                            <Box height={"6px"}/>
                        </Box>
                    </Link>
                ))
            }
        </div>
    )
}

export default Projects;