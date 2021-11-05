import './App.css';
import Leagues from "./components/leagues/Leagues";
import Navbar from "./components/common/NavBar";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import LeagueDetails from "./components/leagues/LeagueDetails";
import TeamDetails from "./components/teams/TeamDetails";
import Teams from "./components/teams/Teams";
import {useEffect, useState} from "react";
import {GameContext, defaultGame, findGameBySlug} from "./components/common/context/GameContext";
import {defaultFilter, SearchContext} from './components/common/context/SearchContext';
import Series from "./components/series/Series";

const NoMatchRoute = () => <div>404 Page</div>;

function App() {

    const gameSlug = localStorage.getItem('game');
    const [game, setGame] = useState(gameSlug?findGameBySlug(gameSlug):defaultGame);
    const [filter, setFilter] = useState(defaultFilter);

    useEffect(() => {
        localStorage.setItem('game', game.slug);
    }, [game.slug]);

    return (
        <GameContext.Provider value={[game, setGame]}>
            <SearchContext.Provider value={[filter, setFilter]}>
            <BrowserRouter>
            <div className="App">
                <Navbar/>
                <div className="content">
                    <Switch>
                        <Route path="/" exact component={Leagues} />
                        <Route path="/teams" exact component={Teams} />
                        <Route path="/leagues/:leagueID" exact component={LeagueDetails} />
                        <Route path="/teams/:teamID" exact component={TeamDetails} />
                        <Route path="/series" exact component={Series} />
                        <Route component={NoMatchRoute} />
                    </Switch>

                </div>
            </div>
            </BrowserRouter>
        </SearchContext.Provider>
        </GameContext.Provider>
  );
}

export default App;
