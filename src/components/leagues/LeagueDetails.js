import {useEffect, useState} from "react";
import LeaguesService from "../../services/LeaguesService";
import {Card, CardContent, Link, Typography} from "@mui/material";
import Serie from "../series/Serie";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const LeagueDetails = ({ match }) => {
    const {
        params: { leagueID },
    } = match;
    const [league, setLeague] = useState({});
    const [leagueVG, setLeagueVG] = useState({});
    const [leagueSeries, setLeagueSeries] = useState([]);
    let leaguesService = new LeaguesService();


    useEffect(() => {
            getLeagueDetails(leagueID);
            getLeagueSeries(leagueID);
    },[])

    function getLeagueDetails(leagueid) {
        leaguesService.retrieveLeagueDetails(leagueid).then(league => {
          setLeague(league.data);
          setLeagueVG(league.data.videogame);
        });
    }

    function getLeagueSeries(leagueid) {
        leaguesService.retrieveLeagueSeries(leagueid).then(series => {
            setLeagueSeries(series.data);
        });
    }

    return (
        <div>
            <div className="leagueCardDetails">
                <Card className="cardDetails">
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div" fontWeight={600} color="#d1b719">
                            {league.name}
                        </Typography>
                        <img className="leagueImageDetails"
                             src={league.image_url}
                             alt={league.name}
                             loading="lazy"
                        />
                        <Link className="link" href={league.url} target={"_blank"} underline="hover" variant="h5" color="blue">League Website
                        <OpenInNewIcon/>
                        </Link>
                        <h4>Video Game : {leagueVG.name}</h4>
                    </CardContent>
                </Card>
            </div>
            <h1>Series</h1>
            {leagueSeries.map(serie =>
                <Serie key={serie.id} serie={serie}/>
            )}
        </div>
    );
};

export default LeagueDetails;