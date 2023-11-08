import React, { useState, useEffect } from 'react';
import { useStorage } from '../hooks/useStorage';
import { FaHeart } from 'react-icons/fa'; 
import ListeSeries from './ListeSeries';
import './Favoris.css';

const Favoris = () => {
    const { getFromStorage } = useStorage('storage-');
    const [favoriteSeries, setFavoriteSeries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedFavorites = getFromStorage('favorites');
        if (storedFavorites && Array.isArray(storedFavorites)) {
            if (JSON.stringify(storedFavorites) !== JSON.stringify(favoriteSeries)) {
                setFavoriteSeries(storedFavorites);
            }
        }
        setIsLoading(false);
    }, []);

    return (
        <div className="favoris-container">
            <h2 className='title-fav'>Vos séries favorites</h2>
            {isLoading ? ( <p>Chargement des favoris...</p>) : 
            (
                <ListeSeries data={favoriteSeries} sourcePage="favoris"/>
            )}
            {favoriteSeries.length === 0 && ( 
                <h2 className='message-erreur'>Vous avez aucune série en favoris...</h2>
            )}
        </div>
    );
};

export default Favoris;
