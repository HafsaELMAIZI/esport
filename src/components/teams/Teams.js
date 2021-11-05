import {useContext, useEffect, useState} from "react";
import {Pagination} from "@mui/material";
import LeaguesService from "../../services/LeaguesService";
import ItemCard from "../common/ItemCard";
import {GameContext} from "../common/context/GameContext";
import {SearchContext} from "../common/context/SearchContext";

const Teams = () => {
    const [teams,setTeams] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const perPage = 5
    const game = useContext(GameContext)[0];
    const search = useContext(SearchContext)[0];
    let leaguesService = new LeaguesService();


    useEffect(() => {
        getTeams();
    },[game,page,search])

    function getRequestParamsPage(page) {
        let params = {};
        params["per_page"] = perPage;
        if (page) {
            params["page"] = page;
        }
        if (search) {
            params["search[name]"] = search;
        }
        return params;
    }

    function getTeams() {
        const params = getRequestParamsPage(page);
        leaguesService.retrieveTeams(params, game).then(teams => {
                let total = parseInt(parseInt(teams.headers["x-total"]) / perPage) + 1;
                setTeams(teams.data);
                setCount(total);
            }
        );
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };


    return (
        <div>
            <h1>Teams</h1>
            {teams.map(team =>
                <ItemCard key={team.id} item={team} url={'/teams'}/>
            )}
            <Pagination
                className="pagination"
                count={count}
                page={page}
                onChange={handlePageChange}
            />
        </div>
    );

}

export default Teams;