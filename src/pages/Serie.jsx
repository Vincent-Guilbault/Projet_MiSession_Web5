import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from './StarRating';
import UserRating from './UserRating';
import './Serie.css';

const Serie = ({ data }) => {
    const [serieDetails, setSerieDetails] = useState(null);

    const { id } = useParams();
    const basicInfo = data.find(s => s.id === parseInt(id));

    useEffect(() => {
        const fetchSerieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/series/${id}`);
                const data = await response.json();
                setSerieDetails(data);
            } catch (error) {
                console.error('Failed to fetch serie details:', error);
            }
        };

        if (id) {
            fetchSerieDetails();
        }
    }, [id]);

    if (!basicInfo) {
        return <div>Série non trouvée</div>;
    }

    let details, nbSeasons;
    let statusFrench = "";
    let genreFormatted = [];
    let videoId = "";
    let ratingOutOfFive = 0;

    if (serieDetails) {
        details = serieDetails.serie;
        nbSeasons = details.seasons;
        console.log(details);

        // Traduire le status en français
        const statusMapping = {
            "returning series": "Série en cours",
            "continuing": "En cours",
            "in production": "En production",
            "planned": "Planifiée",
            "upcoming": "À venir",
            "pilot": "Pilote",
            "canceled": "Annulée",
            "ended": "Terminée",
        };
        statusFrench = statusMapping[details.status.toLowerCase()] || "Statut inconnu";

        // Mettre la première lettre des genres en majuscule 
        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        };
        genreFormatted = details.genres.map(capitalizeFirstLetter).join(', ');

        // Extraire l'ID de la vidéo YouTube pour l'intégrer dans l'iframe
        videoId = extractVideoId(details.trailer);
        function extractVideoId(url) {
            const match = url.match(/(\?|&)v=([^&]+)/)
            return match ? match[2] : null;
        }

        ratingOutOfFive = details.rating / 2;
    }

    return (
        <div className='container-serie'>
            <div className="colonne titre-et-image">
                <h1>{basicInfo.title}</h1>
                {details && <p className="tagline">{details.tagline}</p>}
                <img src={basicInfo.poster} alt={basicInfo.title} />
            </div>
            <div className="colonne details">
                {details && (
                    <>
                        <p>{basicInfo.year}</p>
                        <p><a href={basicInfo.imdb}>Imdb</a></p>
                        <p>Nombre d'épisodes: {details.aired_episodes}</p>
                        <p>Nombre de saisons: {details.seasons.length}</p>
                        <p>Status: {statusFrench}</p>
                        <p>Genres: {genreFormatted}</p>
                        <p>Pays: {details.country.toUpperCase()}</p>
                        <p>Langue: {details.language.toUpperCase()}</p>
                        <p>Network: {details.network}</p>
                        <div>
                            <p>Note globale: </p>
                            <StarRating rating={ratingOutOfFive} />
                            <p>Votes: {details.votes}</p>
                            <p>Votre note: </p>
                            <UserRating />
                        </div>
                    </>
                )}
            </div>
            <div className="colonne synopsis-et-video">
                {details && (
                    <>
                        <div className="synopsis">
                            <p>Synopsis: {details.overview}</p>
                        </div>
                        {videoId && (
                            <div className="video-container">
                                <iframe
                                    width="340"
                                    height="190"
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    title={`${basicInfo.title} trailer`}
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Serie;
