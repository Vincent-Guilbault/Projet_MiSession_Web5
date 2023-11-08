import React, { useState } from 'react';
import ListeSeries from './ListeSeries';
import './Recherche.css';

const Recherche = () => {
    const [requete, setRequete] = useState('');
    const [resultats, setResultats] = useState([]);
    const [rechercheEffectuee, setRechercheEffectuee] = useState(false);

    const formatRequete = (str) => {
        return str.trim().toLowerCase().replace(/ /g, '%20');
    };

    const handleSearch = async (e) => {
        e.preventDefault(); 

        const requeteFormatee = formatRequete(requete);

        const reponseMinuscule = await fetch(`http://localhost:3000/api/series/search?q=${requeteFormatee.toLowerCase()}`);
        const dataMinuscule = await reponseMinuscule.json();
    
        const reponseMajuscule = await fetch(`http://localhost:3000/api/series/search?q=${requeteFormatee.toUpperCase()}`);
        const dataMajuscule = await reponseMajuscule.json();

        // Fusionner les résultats des deux requêtes
        const allResults = [...dataMinuscule.series, ...dataMajuscule.series];

        // Filtrer les doublons
        const seriesFiltered = [];
        const seriesIds = new Set(); // Pour garder une trace des IDs de série déjà ajoutés

        allResults.forEach(serie => {
            if (!seriesIds.has(serie.id)) {
                seriesIds.add(serie.id);
                seriesFiltered.push(serie);
            }
        });

        setRechercheEffectuee(true);

        // Mettre à jour l'état avec les séries filtrées
        setResultats(seriesFiltered);
        };

    return (
        <div className='container-recherche'>
            <h2 className='title-recherche'>Recherche</h2>
            <form onSubmit={handleSearch}>
                <input 
                    data-cy="fld_Rechercher"
                    className='input-recherche'
                    type="text" 
                    value={requete} 
                    onChange={(e) => setRequete(e.target.value)} 
                    placeholder="Chercher une série..."
                />
                <button type="submit" data-cy="btn_Rechercher">Chercher <box-icon name='search'></box-icon></button>
            </form>
            <ListeSeries data={resultats} sourcePage="recherche"/>
            {
                rechercheEffectuee && resultats.length === 0 && 
                <h2 className='message-erreur'>Désolé, aucune série ne semble correspondre à votre recherche...</h2>
            }
        </div>
    )
};

export default Recherche;
