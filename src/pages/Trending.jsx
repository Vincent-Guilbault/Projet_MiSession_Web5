import React from "react";
import ListeSeries from "./ListeSeries";
import './Trending.css';


const Trending = ({data}) => {
    if (!data.series) {
        return <div>Chargement des séries...</div>;
    }

    return (
        <div className="trending">
            <h1 className="title-trending">Nos séries populaires</h1>
            <ListeSeries data={data.series} sourcePage="trending" />
        </div>
    );
};

export default Trending;