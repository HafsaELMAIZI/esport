import {useContext, useEffect, useState} from "react";
import {Pagination} from "@mui/material";
import {GameContext} from "../common/context/GameContext";
import LeaguesService from "../../services/LeaguesService";
import ItemCard from "../common/ItemCard";
import {SearchContext} from "../common/context/SearchContext";


const Leagues = () => {
    const [leagues,setLeagues] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const perPage = 5
    const game = useContext(GameContext)[0];
    const search = useContext(SearchContext)[0];
    let leaguesService = new LeaguesService();

    useEffect(() => {
        getLeagues();
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

    function getLeagues() {
        const params = getRequestParamsPage(page);
        leaguesService.retrieveLeagues(params, game).then(leagues => {
                let total = parseInt(parseInt(leagues.headers["x-total"]) / perPage) + 1;
                setLeagues(leagues.data);
                setCount(total);
            }
        );
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div>
            <h1>Leagues</h1>
            {leagues.map(league =>
                <ItemCard key={league.id} item={league} url={'/leagues'}/>
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

export default Leagues;