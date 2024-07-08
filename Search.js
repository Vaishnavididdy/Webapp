/*src/components/Search.js
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />
            <FaSearch className="search-icon" />
        </div>
    );
};

export default Search;*/
// src/components/Search.js
import React from 'react';

const Search = () => {
    return (
        <div>
            Search Component
        </div>
    );
};

export default Search;


