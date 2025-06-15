import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaCar, FaFilter, FaStar, FaGasPump, FaSnowflake, FaWifi, FaParking, FaCog } from "react-icons/fa";
import "../../styles/CarRental.css";

const CarRental = () => {
  const [searchParams, setSearchParams] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    dropoffDate: "",
    pickupTime: "10:00",
    dropoffTime: "10:00"
  });

  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: "",
    carType: "",
    transmission: "",
    features: []
  });

  const navigate = useNavigate();

  // Mock data for demonstration
  const mockCars = [
    {
      id: 1,
      name: "Toyota Corolla",
      type: "Economy",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3",
      price: 50,
      location: "New York Airport Terminal 1",
      rating: 4.5,
      reviews: 1200,
      features: ["Air Conditioning", "Bluetooth", "Cruise Control", "GPS"],
      providers: [
        { name: "Hertz", price: 45, rating: 4.5 },
        { name: "Avis", price: 48, rating: 4.3 },
        { name: "Enterprise", price: 42, rating: 4.7 }
      ]
    },
    {
      id: 2,
      name: "BMW 3 Series",
      type: "Luxury",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3",
      price: 100,
      location: "New York Downtown Office",
      rating: 4.8,
      reviews: 980,
      features: ["Air Conditioning", "Bluetooth", "Leather Seats", "Parking Sensors"],
      providers: [
        { name: "Hertz", price: 95, rating: 4.6 },
        { name: "Avis", price: 98, rating: 4.4 },
        { name: "Enterprise", price: 92, rating: 4.8 }
      ]
    },
    {
      id: 3,
      name: "Ford Explorer",
      type: "SUV",
      transmission: "Automatic",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3",
      price: 80,
      location: "New York Central Station",
      rating: 4.6,
      reviews: 750,
      features: ["Air Conditioning", "Bluetooth", "Third Row Seating", "All-Wheel Drive"],
      providers: [
        { name: "Hertz", price: 78, rating: 4.5 },
        { name: "Avis", price: 82, rating: 4.4 },
        { name: "Enterprise", price: 75, rating: 4.7 }
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAllCars(mockCars);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter cars based on search params and filters
  const filteredCars = useMemo(() => {
    return allCars.filter(car => {
      // Filter by location
      if (searchParams.pickupLocation && !car.location.toLowerCase().includes(searchParams.pickupLocation.toLowerCase())) {
        return false;
      }

      // Filter by price range
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (max && (car.price < min || car.price > max)) {
          return false;
        }
        if (!max && car.price < min) {
          return false;
        }
      }

      // Filter by car type
      if (filters.carType && car.type !== filters.carType) {
        return false;
      }

      // Filter by transmission
      if (filters.transmission && car.transmission !== filters.transmission) {
        return false;
      }

      // Filter by features
      if (filters.features.length > 0) {
        const featureMap = {
          'ac': 'Air Conditioning',
          'bluetooth': 'Bluetooth',
          'gps': 'GPS',
          'parking': 'Parking Sensors'
        };
        
        const requiredFeatures = filters.features.map(f => featureMap[f]);
        if (!requiredFeatures.every(feature => car.features.includes(feature))) {
          return false;
        }
      }

      return true;
    });
  }, [allCars, searchParams.pickupLocation, filters]);

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
        features: checked 
          ? [...prev.features, value]
          : prev.features.filter(feature => feature !== value)
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

  const handleCarSelect = (carId) => {
    navigate(`/car-rental/offers/${carId}`);
  };

  return (
    <div className="car-rental-container">
      <div className="search-section">
        <h1>Find Your Perfect Car</h1>
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <FaMapMarkerAlt />
            <input
              type="text"
              name="pickupLocation"
              value={searchParams.pickupLocation}
              onChange={handleSearchChange}
              placeholder="Pick-up location"
              required
            />
          </div>

          <div className="form-group">
            <FaMapMarkerAlt />
            <input
              type="text"
              name="dropoffLocation"
              value={searchParams.dropoffLocation}
              onChange={handleSearchChange}
              placeholder="Drop-off location (optional)"
            />
          </div>

          <div className="form-group">
            <FaCalendarAlt />
            <input
              type="date"
              name="pickupDate"
              value={searchParams.pickupDate}
              onChange={handleSearchChange}
              required
            />
          </div>

          <div className="form-group">
            <FaCalendarAlt />
            <input
              type="time"
              name="pickupTime"
              value={searchParams.pickupTime}
              onChange={handleSearchChange}
              required
            />
          </div>

          <div className="form-group">
            <FaCalendarAlt />
            <input
              type="date"
              name="dropoffDate"
              value={searchParams.dropoffDate}
              onChange={handleSearchChange}
              required
            />
          </div>

          <div className="form-group">
            <FaCalendarAlt />
            <input
              type="time"
              name="dropoffTime"
              value={searchParams.dropoffTime}
              onChange={handleSearchChange}
              required
            />
          </div>

          <button type="submit" className="search-button">
            <FaSearch /> Search Cars
          </button>
        </form>
      </div>

      <div className="cars-content">
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
              <option value="0-50">$0 - $50</option>
              <option value="51-100">$51 - $100</option>
              <option value="101-200">$101 - $200</option>
              <option value="201-999999">$201+</option>
            </select>
          </div>

          <div className="filter-group">
            <h4>Car Type</h4>
            <select
              name="carType"
              value={filters.carType}
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              <option value="Economy">Economy</option>
              <option value="Compact">Compact</option>
              <option value="Midsize">Midsize</option>
              <option value="Luxury">Luxury</option>
              <option value="SUV">SUV</option>
            </select>
          </div>

          <div className="filter-group">
            <h4>Transmission</h4>
            <select
              name="transmission"
              value={filters.transmission}
              onChange={handleFilterChange}
            >
              <option value="">Any</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div className="filter-group">
            <h4>Features</h4>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="features"
                value="ac"
                checked={filters.features.includes('ac')}
                onChange={handleFilterChange}
              />
              <FaSnowflake /> Air Conditioning
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="features"
                value="bluetooth"
                checked={filters.features.includes('bluetooth')}
                onChange={handleFilterChange}
              />
              <FaWifi /> Bluetooth
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="features"
                value="gps"
                checked={filters.features.includes('gps')}
                onChange={handleFilterChange}
              />
              <FaMapMarkerAlt /> GPS
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="features"
                value="parking"
                checked={filters.features.includes('parking')}
                onChange={handleFilterChange}
              />
              <FaParking /> Parking Sensors
            </label>
          </div>
        </div>

        <div className="cars-list">
          {isLoading ? (
            <div className="loading">Loading cars...</div>
          ) : filteredCars.length === 0 ? (
            <div className="no-results">No cars found matching your criteria</div>
          ) : (
            filteredCars.map(car => (
              <div key={car.id} className="car-card" onClick={() => handleCarSelect(car.id)}>
                <div className="car-image">
                  <img src={car.image} alt={car.name} />
                  <div className="car-type">{car.type}</div>
                </div>
                <div className="car-details">
                  <div className="car-header">
                    <h3>{car.name}</h3>
                    <div className="car-rating">
                      <FaStar /> {car.rating}
                      <span className="reviews">({car.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="car-location">
                    <FaMapMarkerAlt /> {car.location}
                  </div>

                  <div className="car-features">
                    {car.features.map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>

                  <div className="car-providers">
                    <h4>Available from:</h4>
                    <div className="providers-list">
                      {car.providers.map((provider, index) => (
                        <div key={index} className="provider-item">
                          <span className="provider-name">{provider.name}</span>
                          <span className="provider-price">${provider.price}/day</span>
                          <span className="provider-rating">
                            <FaStar /> {provider.rating}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="car-price">
                    <div className="price-amount">From ${car.price}</div>
                    <div className="price-period">per day</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CarRental; 