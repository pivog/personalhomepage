import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {getCookie} from "./CookiesMainpulation";
import {useState} from "react";

const drawerWidth = 240;
const navItemsEn = ['Home', 'About', 'Contact', 'Projects', 'Chess Games'];
const navItemsHr = ['Home', 'About', 'Contact', 'Projects', 'Chess Games'];
const navItems = navItemsEn
const navHrefs = ["/", "/about", "/contact", "/projects", "/listchessgames"];
const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#1f1f1f"
        }
    }
})
const lightTheme = createTheme({
    palette: {
        mode: "light",
    }
})

const currentTheme = darkTheme;

function DrawerAppBar(props) {

    const { window } = props;
    const [username, setUsername] = useState(getCookie("username"));
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Ivo Planinić
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton href={navHrefs[navItems.indexOf(item)]} sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }} flexGrow={1}>
                <AppBar component="nav">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h3"
                            fontFamily={"cursive"}
                            component="div"
                            sx={{flexGrow: "1", display: 'flex', textAlign: {xs: "right", sm: "left"}}}
                        >
                            <a href={"/"} style={{ color: "#ffffff", textDecoration: "none" }}>
                                <p style={{marginTop: "0", marginBottom: "0", marginRight: "5px", flexGrow: "1"}}>
                                    IP
                                </p>
                            </a>

                            <span style={{fontSize: "18px", flexGrow: "1"}}>
                                {
                                    (() => {

                                        if (username !== undefined) {
                                            return "Logged in as " + username;
                                        }

                                        return ""
                                    })()
                                }
                            </span>
                        </Typography>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                            {navItems.map((item) => (
                                <Button href={navHrefs[navItems.indexOf(item)]} key={item} sx={{color: "inherit"}}>
                                    {item}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
                <Box component="main" sx={{ p: 3 }} id={"maincomponent"} flexGrow={1}>
                    <Toolbar />
                    <BrowserRouter id={"router"} sx={{flexGrow:1}}>
                        <App setUsername={(_username)=>setUsername(_username)} />
                    </BrowserRouter>
                </Box>
            </Box>
        </ThemeProvider>
    );
}


export default DrawerAppBar;
