import React, { useEffect } from 'react';
import { FaHeart } from 'react-icons/fa'; 
import { useState } from 'react';
import { useStorage } from '../hooks/useStorage';
import { Outlet, useNavigate } from 'react-router-dom';
import Serie from './Serie';
import './ListeSeries.css'


const ListeSeries = ({data, sourcePage}) => {
    const navigate = useNavigate();
    const {saveToStorage, getFromStorage} = useStorage('storage-');
    const [favorites, setFavorites] = useState([]);  
    const [serieSelected, setSerieSelected] = useState(null);

    useEffect(() => {
        const storedFavorites = getFromStorage('favorites');
        if (storedFavorites && Array.isArray(storedFavorites)) { // Vérifie si storedFavorites est un tableau
            setFavorites(storedFavorites);
        }
    }, []);

    useEffect(() => {
        saveToStorage('favorites', favorites);
    }, [favorites]);

    const handleFavoriteClick = (e, serie) => {
        e.stopPropagation(); 

        if (favorites.some(fav => fav.id === serie.id)) {
            // Si la série est déjà dans les favoris, la supprimer
            setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== serie.id));
        } else {
            // Sinon, ajouter la série aux favoris
            setFavorites(prevFavorites => [...prevFavorites, serie]);
        }
    };


    const handleSerieClick = (e, serie) => {
        setSerieSelected(serie);
        navigate(`/${sourcePage}/${serie.id}`);
    };
    
    return (
        <div>
            <div>
                <Outlet />
            </div>
            <div className="liste-series">
                <ul className='series'>
                    {data.map((serie) => (
                        <li 
                            key={serie.id} 
                            onClick={(e) => handleSerieClick(e, serie)}
                            className={serieSelected && serieSelected.id === serie.id ? 'selected' : ''}
                            >
                            <img src={serie.poster} alt={serie.title} />
                            <h2 className='serie-title'>{serie.title}</h2>
                            <p className='serie-annee'>{serie.year}</p>
                            <div className='favoris-bouton' onClick={(e) => handleFavoriteClick(e, serie)}>
                                <FaHeart data-cy="favoris_btn" style={favorites.some(fav => fav.id === serie.id) ? {color: 'red', opacity: 1} : {color: 'gray', opacity: 0.5}} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


export default ListeSeries;

    