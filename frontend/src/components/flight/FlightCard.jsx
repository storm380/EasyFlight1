import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../styles/FlightCard.css';

const FlightCard = ({ flight }) => {
  const {
    _id,
    departure,
    destination,
    date,
    time,
    price,
    availableSeats,
    image
  } = flight;

  return (
    <div className="flight-card">
      <div className="card-image-container">
        <img
          loading="lazy"
          src={image || 'https://via.placeholder.com/300x200?text=Flight+Image'}
          alt={`Flight from ${departure} to ${destination}`}
          className="flight-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Flight+Image';
          }}
        />
        <div className="price-badge">${price}</div>
      </div>
      
      <div className="card-content">
        <div className="route">
          <span className="departure">{departure}</span>
          <span className="arrow">→</span>
          <span className="destination">{destination}</span>
        </div>
        
        <div className="flight-meta">
          <div className="meta-item">
            <i className="far fa-calendar-alt"></i>
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="meta-item">
            <i className="far fa-clock"></i>
            <span>{time}</span>
          </div>
          <div className="meta-item">
            <i className="fas fa-chair"></i>
            <span>{availableSeats} seats left</span>
          </div>
        </div>

        <Link to="/book-flight" className="text-decoration-none">
          <button className="book-now-btn">BOOK A FLIGHT</button>
        </Link>
      </div>
    </div>
  );
};

FlightCard.propTypes = {
  flight: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    departure: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    availableSeats: PropTypes.number.isRequired,
    image: PropTypes.string
  }).isRequired
};

export default FlightCard; 