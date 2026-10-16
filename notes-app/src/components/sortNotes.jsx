import { useState } from "react";


export default function SortNotes({ sortNotes, setSortNotes}) {

    return (

        <>
        <div className="sort-dropdown">
            <select 
                value={sortNotes}
                onChange={(e) => setSortNotes(e.target.value)}
            >
                <option value={"newest"}>newest</option>
                <option value={"oldest"}>oldest</option>
                <option value={"az"}>A-Z</option>
                <option value={"za"}>Z-A</option>
            </select>


        </div>
        </>


    )

}