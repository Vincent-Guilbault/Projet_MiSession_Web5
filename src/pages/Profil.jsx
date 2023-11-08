import React from 'react';
import { Link, Navigate } from "react-router-dom";
import { FaHeart, FaUser } from 'react-icons/fa'; 
import { useStorage } from '../hooks/useStorage';
import { useState, useEffect } from 'react';
import './Profil.css';

const Profil = ({ username, profileImageUrl, logoutHandler}) => {
    const { removeFromStorage } = useStorage('storage-');
    const { getFromStorage } = useStorage('storage-');
    const [isLoading, setIsLoading] = useState(true);
    const [favoriteSeries, setFavoriteSeries] = useState([]);

    useEffect(() => {
        const storedFavorites = getFromStorage('favorites');
        if (storedFavorites && Array.isArray(storedFavorites)) {
            if (JSON.stringify(storedFavorites) !== JSON.stringify(favoriteSeries)) {
                setFavoriteSeries(storedFavorites);
            }
        }
        setIsLoading(false);
    }, []);

    const numberOfFavorites = favoriteSeries.length;

    const handleLogout = () => {
        logoutHandler();
    }

    return (
        <div className='container-profil'>
            <h2 className='title-profil'>Votre profil</h2>
            <div className="user-profile">
                <h2>{username}</h2>
                <img src={`../../public${profileImageUrl}`} alt={`${username}'s Profile`} />
                <p>
                    Vous avez {numberOfFavorites} séries favorites! <FaHeart /> 
                </p>
            </div>
            <button data-cy="btn_deco" className="btn_deco" onClick={handleLogout}>Déconnexion</button>
        </div>
    );
};

export default Profil;
