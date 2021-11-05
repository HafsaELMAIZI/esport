import {createContext} from 'react';

export const defaultGame = {slug: "all", name: "All"};

export const games = [
    defaultGame,
    {slug: "codmw", name: "Call Of Duty"},
    {slug: "csgo", name: "CS-GO"},
    {slug: "dota2", name: "Dota 2"},
    {slug: "kog", name: "King of Glory"},
    {slug: "lol-wild-rift", name: "LoL Wild Rift"},
    {slug: "lol", name: "League Of Legend"},
    {slug: "ow", name: "Overwatch"},
    {slug: "pubg", name: "PUBG"},
    {slug: "rl", name: "Rocket League"},
    {slug: "valorant", name: "Valorant"},
];

export function findGameBySlug(slug) {
    return games.find(game => game.slug === slug)
}

export const GameContext = createContext(games);
