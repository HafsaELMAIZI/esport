import React, {useContext} from 'react';
import {SearchContext} from './context/SearchContext';

import './Navbar.css';

const SearchBar = () => {

    const [filter, setFilter] = useContext(SearchContext);

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <>
            <input
                type="text"
                id="searchInput"
                placeholder="Search"
                name="s"
                value={filter}
                onChange={handleChange}
            />
        </>
    );
}
export default SearchBar;