import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaCheck, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import "../../styles/CarOffers.css";

const CarOffers = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  const mockCar = {
    id: carId,
    name: "Toyota Corolla",
    type: "Economy",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3",
    features: ["Automatic", "4 Doors", "5 Seats", "Air Conditioning"],
    description: "The Toyota Corolla is a reliable and fuel-efficient compact car, perfect for city driving and long trips alike."
  };

  const mockOffers = [
    {
      id: 1,
      company: "Hertz",
      price: 45,
      rating: 4.5,
      reviews: 1200,
      pickupLocation: "New York Airport Terminal 1",
      returnLocation: "New York Airport Terminal 1",
      includedFeatures: ["Unlimited Mileage", "Collision Damage Waiver", "Theft Protection"],
      externalLink: "https://www.hertz.com"
    },
    {
      id: 2,
      company: "Avis",
      price: 48,
      rating: 4.3,
      reviews: 980,
      pickupLocation: "New York Downtown Office",
      returnLocation: "New York Downtown Office",
      includedFeatures: ["Unlimited Mileage", "Roadside Assistance", "GPS Navigation"],
      externalLink: "https://www.avis.com"
    },
    {
      id: 3,
      company: "Enterprise",
      price: 42,
      rating: 4.7,
      reviews: 1500,
      pickupLocation: "New York Central Station",
      returnLocation: "New York Central Station",
      includedFeatures: ["Unlimited Mileage", "24/7 Customer Support", "Free Cancellation"],
      externalLink: "https://www.enterprise.com"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCar(mockCar);
      setOffers(mockOffers);
      setIsLoading(false);
    }, 1000);
  }, [carId]);

  const handleOfferSelect = (externalLink) => {
    window.open(externalLink, '_blank');
  };

  if (isLoading) {
    return <div className="loading">Loading offers...</div>;
  }

  return (
    <div className="car-offers-container">
      <button className="back-button" onClick={() => navigate('/car-rental')}>
        <FaArrowLeft /> Back to Search
      </button>

      <div className="car-details-section">
        <div className="car-image">
          <img src={car.image} alt={car.name} />
        </div>
        <div className="car-info">
          <h1>{car.name}</h1>
          <div className="car-type">{car.type}</div>
          <p className="car-description">{car.description}</p>
          <div className="car-features">
            {car.features.map((feature, index) => (
              <span key={index} className="feature-tag">{feature}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="offers-section">
        <h2>Available Offers</h2>
        <div className="offers-grid">
          {offers.map(offer => (
            <div key={offer.id} className="offer-card">
              <div className="offer-header">
                <h3>{offer.company}</h3>
                <div className="offer-rating">
                  <FaStar /> {offer.rating}
                  <span className="reviews">({offer.reviews} reviews)</span>
                </div>
              </div>

              <div className="offer-price">
                <span className="price">${offer.price}</span>
                <span className="per-day">per day</span>
              </div>

              <div className="offer-locations">
                <div className="location">
                  <strong>Pickup:</strong> {offer.pickupLocation}
                </div>
                <div className="location">
                  <strong>Return:</strong> {offer.returnLocation}
                </div>
              </div>

              <div className="included-features">
                <h4>Included Features:</h4>
                <ul>
                  {offer.includedFeatures.map((feature, index) => (
                    <li key={index}>
                      <FaCheck /> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                className="select-offer-button"
                onClick={() => handleOfferSelect(offer.externalLink)}
              >
                <FaExternalLinkAlt /> Book on {offer.company}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarOffers; 