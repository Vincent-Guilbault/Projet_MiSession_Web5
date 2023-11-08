import React from 'react';
import './StarRating.css';

const StarRating = ({ rating }) => {
    const widthPercentage = (rating / 5) * 100;
    console.log(widthPercentage);

    return (
        <div className="star-rating">
            <div className="empty-stars" >
                {[...Array(5)].map((_, i) => (
                    <i key={i} className="star">☆</i>
                ))}
            </div>
            <div className="full-stars" style={{ width: `${widthPercentage}%` }}>
                {[...Array(5)].map((_, i) => (
                    <i key={i} className="star">★</i>
                ))}
            </div>
        </div>
    );
};

export default StarRating;
