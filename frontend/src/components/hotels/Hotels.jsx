import { useState, useEffect, useMemo } from "react";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaStar, FaWifi, FaSwimmingPool, FaParking, FaUtensils, FaSnowflake } from "react-icons/fa";
import "../../styles/Hotels.css";

const Hotels = () => {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    rooms: 1
  });

  const [allHotels, setAllHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: "",
    starRating: "",
    amenities: []
  });

  // Mock data for demonstration
  const mockHotels = [
    {
      id: 1,
      name: "Grand Luxury Hotel",
      location: "New York, USA",
      rating: 4.5,
      stars: 5,
      price: 299,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3",
      amenities: ["Free WiFi", "Swimming Pool", "Parking", "Restaurant", "Air Conditioning"],
      description: "Luxury hotel in the heart of Manhattan with stunning city views and premium amenities.",
      reviews: 1245,
      distance: "0.5 km from city center"
    },
    {
      id: 2,
      name: "Comfort Inn",
      location: "New York, USA",
      rating: 4.2,
      stars: 3,
      price: 149,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3",
      amenities: ["Free WiFi", "Parking", "Air Conditioning"],
      description: "Comfortable and affordable hotel with great service and convenient location.",
      reviews: 856,
      distance: "1.2 km from city center"
    },
    {
      id: 3,
      name: "Seaside Resort",
      location: "New York, USA",
      rating: 4.7,
      stars: 4,
      price: 199,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3",
      amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Air Conditioning", "Beach Access"],
      description: "Beautiful resort with ocean views and premium amenities for a perfect vacation.",
      reviews: 932,
      distance: "2.5 km from city center"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAllHotels(mockHotels);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter hotels based on search params and filters
  const filteredHotels = useMemo(() => {
    return allHotels.filter(hotel => {
      // Filter by destination
      if (searchParams.destination && !hotel.location.toLowerCase().includes(searchParams.destination.toLowerCase())) {
        return false;
      }

      // Filter by price range
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (max && (hotel.price < min || hotel.price > max)) {
          return false;
        }
        if (!max && hotel.price < min) {
          return false;
        }
      }

      // Filter by star rating
      if (filters.starRating && hotel.stars < parseInt(filters.starRating)) {
        return false;
      }

      // Filter by amenities
      if (filters.amenities.length > 0) {
        const amenityMap = {
          'wifi': 'Free WiFi',
          'pool': 'Swimming Pool',
          'parking': 'Parking',
          'restaurant': 'Restaurant',
          'ac': 'Air Conditioning'
        };
        
        const requiredAmenities = filters.amenities.map(a => amenityMap[a]);
        if (!requiredAmenities.every(amenity => hotel.amenities.includes(amenity))) {
          return false;
        }
      }

      return true;
    });
  }, [allHotels, searchParams.destination, filters]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFilters(prev => ({
        ...prev,
        amenities: checked 
          ? [...prev.amenities, value]
          : prev.amenities.filter(amenity => amenity !== value)
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Searching with params:", searchParams);
    console.log("Filters:", filters);
  };

  const renderStars = (stars) => {
    return Array(stars).fill().map((_, i) => (
      <FaStar key={i} className="star-icon" />
    ));
  };

  return (
    <div className="hotels-container">
      <div className="search-section">
        <h1>Find Your Perfect Stay</h1>
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <FaMapMarkerAlt />
            <input
              type="text"
              name="destination"
              value={searchParams.destination}
              onChange={handleSearchChange}
              placeholder="Where are you going?"
              required
            />
          </div>

          <div className="form-group">
            <FaCalendarAlt />
            <input
              type="date"
              name="checkIn"
              value={searchParams.checkIn}
              onChange={handleSearchChange}
              required
            />
          </div>

          <div className="form-group">
            <FaCalendarAlt />
            <input
              type="date"
              name="checkOut"
              value={searchParams.checkOut}
              onChange={handleSearchChange}
              required
            />
          </div>

          <div className="form-group">
            <FaUsers />
            <select
              name="guests"
              value={searchParams.guests}
              onChange={handleSearchChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <FaUsers />
            <select
              name="rooms"
              value={searchParams.rooms}
              onChange={handleSearchChange}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Room' : 'Rooms'}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="search-button">
            <FaSearch /> Search Hotels
          </button>
        </form>
      </div>

      <div className="hotels-content">
        <div className="filters-sidebar">
          <h3>Filters</h3>
          
          <div className="filter-group">
            <h4>Price Range</h4>
            <select
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
            >
              <option value="">Any Price</option>
              <option value="0-100">$0 - $100</option>
              <option value="101-200">$101 - $200</option>
              <option value="201-300">$201 - $300</option>
              <option value="301-999999">$301+</option>
            </select>
          </div>

          <div className="filter-group">
            <h4>Star Rating</h4>
            <select
              name="starRating"
              value={filters.starRating}
              onChange={handleFilterChange}
            >
              <option value="">Any Rating</option>
              <option value="5">5 Stars</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>
          </div>

          <div className="filter-group">
            <h4>Amenities</h4>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="amenities"
                value="wifi"
                checked={filters.amenities.includes('wifi')}
                onChange={handleFilterChange}
              />
              <FaWifi /> Free WiFi
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="amenities"
                value="pool"
                checked={filters.amenities.includes('pool')}
                onChange={handleFilterChange}
              />
              <FaSwimmingPool /> Swimming Pool
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="amenities"
                value="parking"
                checked={filters.amenities.includes('parking')}
                onChange={handleFilterChange}
              />
              <FaParking /> Free Parking
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="amenities"
                value="restaurant"
                checked={filters.amenities.includes('restaurant')}
                onChange={handleFilterChange}
              />
              <FaUtensils /> Restaurant
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="amenities"
                value="ac"
                checked={filters.amenities.includes('ac')}
                onChange={handleFilterChange}
              />
              <FaSnowflake /> Air Conditioning
            </label>
          </div>
        </div>

        <div className="hotels-list">
          {isLoading ? (
            <div className="loading">Loading hotels...</div>
          ) : filteredHotels.length === 0 ? (
            <div className="no-results">No hotels found matching your criteria</div>
          ) : (
            filteredHotels.map(hotel => (
              <div key={hotel.id} className="hotel-card">
                <div className="hotel-image">
                  <img src={hotel.image} alt={hotel.name} />
                  <div className="hotel-stars">
                    {renderStars(hotel.stars)}
                  </div>
                </div>
                <div className="hotel-details">
                  <h3>{hotel.name}</h3>
                  <div className="hotel-location">
                    <FaMapMarkerAlt /> {hotel.location}
                  </div>
                  <div className="hotel-distance">{hotel.distance}</div>
                  <p className="hotel-description">{hotel.description}</p>
                  <div className="hotel-amenities">
                    {hotel.amenities.map((amenity, index) => (
                      <span key={index} className="amenity-tag">{amenity}</span>
                    ))}
                  </div>
                  <div className="hotel-rating">
                    <div className="rating-score">{hotel.rating}</div>
                    <div className="rating-text">
                      <div>Excellent</div>
                      <div className="reviews-count">{hotel.reviews} reviews</div>
                    </div>
                  </div>
                  <div className="hotel-price">
                    <div className="price-amount">${hotel.price}</div>
                    <div className="price-period">per night</div>
                  </div>
                  <button className="book-button">Book Now</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Hotels; 