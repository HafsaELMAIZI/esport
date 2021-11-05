import {useEffect, useState} from "react";
import LeaguesService from "../../services/LeaguesService";
import {Typography} from "@mui/material";
import {Card, CardContent} from "@material-ui/core";


const TeamDetails = ({ match }) => {
    const {
        params: { teamID },
    } = match;
    const [team, setTeam] = useState({});
    const [teamVG, setTeamVG] = useState({});
    const [teamMembers, setTeamMembers] = useState([]);
    let leaguesService = new LeaguesService();


    useEffect(() => {
        getTeamDetails(teamID);
    },[teamID])

    function getTeamDetails(winnerid) {
        leaguesService.retrieveTeamDetails(winnerid).then(team => {
            setTeam(team.data);
            setTeamVG(team.data.current_videogame);
            setTeamMembers(team.data.players);
        });
    }

    return (
        <div>
            <div className="leagueCardDetails">
                <Card className="cardDetails">
                    <CardContent>
                            <Typography gutterBottom variant="h4" component="div" fontWeight={600} color="#d1b719">
                                {team.name}
                            </Typography>
                            {team.image_url?
                            <img className="leagueImageDetails"
                                 src={team.image_url}
                                 alt={team.name}
                                 loading="lazy"
                            />:<i>No image</i>}

                            <h4>Current Video Game : {teamVG.name}</h4>
                    </CardContent>
                </Card>
                    {teamMembers.length?
                        <div>
                            <h4>Team Players : </h4>
                            {teamMembers.map(member =>
                                <span id="teammember" key={member.id}>{member.slug}</span>
                            )}
                        </div>
                    :""}

            </div>
        </div>
    );
};

export default TeamDetails;