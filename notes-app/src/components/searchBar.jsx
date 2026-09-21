import React from "react";

export default function SearchBar({setItem, setSearchItem}){

    return (
    <div className="search-filter">
        <input
            
            placeholder="Filter Notes"
            value={setItem}
            onChange={(e)=> setSearchItem(e.target.value)}
        />
    </div>
    )

}