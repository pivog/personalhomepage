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
            <Box height={"16px"}/>
            <Divider/>
            {
                projectElements.map((value, index) => (
                    <Link href={`/project?id=${value.id}`} sx={{textDecoration:"none"}}>
                        <Box>
                            <Box height={"32px"}/>
                            <Box width={"100%"} justifyContent={"center"} flexDirection={"row"} display={"flex"}>
                                {/*<Box textAlign={"center"} width={"fit-content"}><Typography className={"vertical-center"} sx={{width:"fit-content", color:"#ffffff"}} variant={"h4"}>{index+1}.</Typography></Box>*/}
                                {/*<Box width={"20px"}/>*/}
                                <Box sx={{width:{sx: "auto", sm: "fit-content"}, display:{xs:"none", sm:"block"}}}><img className={"card mid-image"} src={value.imgUrl} alt={value.imgUrl}/></Box>
                                <Box width={"20px"}/>
                                <Box textAlign={"center"} width={"fit-content"}><Typography className={"vertical-center"} sx={{width:"fit-content", color:"#ffffff"}} variant={"h4"}>{value.title}</Typography></Box>
                            </Box>
                            <Box height={"32px"}/>
                            <Divider/>
                        </Box>
                    </Link>
                ))
            }
        </div>
    )
}

export default Projects;