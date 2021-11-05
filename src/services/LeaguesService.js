import axios from "axios";
import {accessToken, apiURL} from "../constants/Utils";
import {defaultGame} from "../components/common/context/GameContext";

class LeaguesService {
    async retrieveLeagues(params, game) {
        return this.apiCall(apiURL + this.gameSlug(game) +  '/leagues/', params);
    }

    async retrieveLeagueDetails(leagueid) {
        return this.apiCall(apiURL + 'leagues/' + leagueid);
    }

    async retrieveLeagueSeries(leagueid) {
        return this.apiCall(apiURL + 'leagues/' + leagueid + '/series');
    }

    async retrieveTeamDetails(teamid) {
        return this.apiCall(apiURL + 'teams/' + teamid);
    }

    async retrieveTeams(params, game) {
        return this.apiCall(apiURL + this.gameSlug(game) + '/teams/', params);
    }

    async retrieveVideoGames() {
        return this.apiCall(apiURL + 'videogames/', []);
    }

    async retrieveSeries(params, game, state) {
        return this.apiCall(apiURL + this.gameSlug(game) + '/series/'+ this.statePrefix(state), params);
    }

    gameSlug(game) {
        return (game.slug && game.slug !== defaultGame.slug)?`${game.slug}`:"";
    }

    statePrefix(state) {
        return (state && state !== 'all')?`${state}`:"";
    }

    apiCall(url, params) {
        return axios.get(url, {
            headers: {
                'Authorization' : accessToken
            },
            params: params
        })
            .then((response) => {
                return response
            })
            .catch(error => console.error('Error: ${error}'));
    }
}
export default LeaguesService;