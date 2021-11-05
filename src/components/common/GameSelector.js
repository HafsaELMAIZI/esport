import React, {useContext} from 'react';
import {MenuItem, Select, OutlinedInput} from '@material-ui/core';

import {findGameBySlug, GameContext, games} from './context/GameContext';

import './Navbar.css';

const GameSelector = () => {

    const [game, setGame] = useContext(GameContext);

    const handleChange = (event) => {
        setGame(findGameBySlug(event.target.value));
    };

    return (
        <>
            <Select
                className="GameSelector"
                value={game.slug}
                onChange={handleChange}
                input={<OutlinedInput margin='dense'/>}
                label={game.name}>
                {games.map(game =>
                    <MenuItem value={game.slug} key={game.slug}>{game.name}</MenuItem>
                )}
            </Select>
        </>
    );
}
export default GameSelector;