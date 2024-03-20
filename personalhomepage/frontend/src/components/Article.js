import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useParams, useSearchParams } from "react-router-dom";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";

export default function Article({title, content}) {
    const [params, setParams] = useSearchParams()

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`/api/getarticle?id=${params.get("id")}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPosts(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <Box id={"articlecontainer"}  sx={{textAlign: "center"}} className={"horizontal-center"}>
            <Typography variant="h2">
                {
                    posts.title
                }
            </Typography>
            <Divider/>
            <Box id={"contentcontainer"}  sx={{textAlign: "left", width:"70vw"}}>
                <Typography sx={{fontSize: {xs: "1rem", sm: "1.3rem"}}}>
                    {
                        posts.body
                    }
                </Typography>
            </Box>
        </Box>
    )
}