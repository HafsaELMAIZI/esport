import React from 'react';
import {
    AppBar,
    Button,
    Toolbar
} from "@mui/material";
import {Link} from "react-router-dom";
import GameSelector from "./GameSelector";
import './Navbar.css';
import SearchBar from "./SearchBar";

const Navbar = () => {

    return (
        <AppBar position="static">
            <Toolbar>
                        <Button component={Link} to='/'>
                            <h2 className="homeButton">Esport Leagues</h2>
                        </Button>
                        <div className="headerButtons">
                            <Button component={Link} to={"/"}><span className="headerButton">Leagues</span></Button>
                            <Button component={Link} to={"/teams"}><span className="headerButton">Teams</span></Button>
                            <Button component={Link} to={"/series"}><span className="headerButton">Series</span></Button>
                            <GameSelector/>
                            <SearchBar/>
                        </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;