import React, {useEffect, useState} from "react";
import params, {map} from "../../static/admin/js/vendor/xregexp/xregexp";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {Link} from "@mui/material";

const Projects = () => {

    const [projectElements, setProjectElements] = useState([]); // example element {"id": "0", "title": "placeholder", "imgUrl":"https://image.com"}

    useEffect(() => {
        fetch(`/api/getprojects`)
            .then(res => res.json()
                .then(data => {
                    console.log(data)
                    setProjectElements(data)
                })
        )
    }, []);

    return (
        <div>
            <Divider/>
            {
                projectElements.map((value, index) => (
                    <Link href={`/project?id=${value.id}`} sx={{textDecoration:"none"}}>
                        <Box>
                            <Box height={"10px"}/>
                            <Box width={"100%"} justifyContent={"center"} flexDirection={"row"} display={"flex"}>
                                <Box width={"fit-content"}><img className={"card mid-image"} src={value.imgUrl} alt={value.imgUrl}/></Box>
                                <Box width={"20px"}/>
                                <Box width={"fit-content"}><Typography className={"vertical-center"} sx={{width:"fit-content", color:"#ffffff"}} variant={"h4"}>{value.title}</Typography></Box>
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