import React, {useContext, useEffect, useState} from "react";
import {Pagination} from "@mui/material";
import {GameContext} from "../common/context/GameContext";
import LeaguesService from "../../services/LeaguesService";
import {SearchContext} from "../common/context/SearchContext";
import Serie from "./Serie";
import {FormControl, MenuItem, OutlinedInput, Select} from "@material-ui/core";


const Series = () => {
    const [series,setSeries] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [etat, setEtat] = useState("");
    const perPage = 5
    const game = useContext(GameContext)[0];
    const search = useContext(SearchContext)[0];
    let leaguesService = new LeaguesService();

    useEffect(() => {
        getSeries();
    },[game,page,search,etat])


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

    function getSeries() {
        const params = getRequestParamsPage(page);
        leaguesService.retrieveSeries(params, game, etat).then(series => {
                let total = parseInt(parseInt(series.headers["x-total"]) / perPage);
                setSeries(series.data);
                setCount(total);
            }
        );
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleStateChange = (event, value) => {
        setEtat(event.target.value);
        setPage(1);
    };

    return (
        <div>
            <h1>Series</h1>
            <span id="seriesStateLabel">State : </span>
            <FormControl variant="filled" id="seriesState">
                <Select
                    onChange={handleStateChange}
                    input={<OutlinedInput margin='dense'/>}
                    >
                    <MenuItem value="upcoming">Upcoming</MenuItem>
                    <MenuItem value="running">Running</MenuItem>
                    <MenuItem value="past">Past</MenuItem>
                    <MenuItem value="all">All</MenuItem>
                </Select>
            </FormControl>
            {series.map(serie =>
                <Serie key={serie.id} serie={serie}/>
            )}
            {series.length ?
            <Pagination
                className="pagination"
                count={count}
                page={page}
                onChange={handlePageChange}
            /> : <i>No Results</i>}
        </div>
    );

}

export default Series;