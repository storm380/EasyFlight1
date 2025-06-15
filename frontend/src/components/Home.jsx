import "../styles/Home.css";
import background from "../assets/home.jpg";
import { useEffect } from "react";
import { FaPlane, FaCar, FaShuttleVan, FaSearch, FaMoneyBillWave, FaHeadset } from "react-icons/fa";

const Home = ({children}) => {
  useEffect(()=> {
    document.title='home';
  },[])

  return (
    <div className="home-page">
      <div
        className="home-container"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="home-content">
          <h2 className="subtitle"><strong>Explore The Colorful World</strong></h2>
          <hr className="title-underline" />
          <h1>
            FIND YOUR IDEAL <br /> HOLIDAY
          </h1>
          <button className="hotel-btn">BOOK FLIGHT</button>
        </div>
      </div>
      {children}
      {/* Services Section */}
      <section className="services-section">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <FaPlane />
            </div>
            <h3>Flight Booking</h3>
            <p>
              Book your flights with ease and confidence. We offer competitive prices
              and a wide range of destinations to choose from.
            </p>
            <ul className="service-features">
              <li><FaSearch /> Easy Search & Booking</li>
              <li><FaMoneyBillWave /> Best Price Guarantee</li>
              <li><FaHeadset /> 24/7 Support</li>
            </ul>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaCar />
            </div>
            <h3>Car Rental</h3>
            <p>
              Explore your destination with our premium car rental service. Choose from
              a variety of vehicles to suit your needs.
            </p>
            <ul className="service-features">
              <li><FaSearch /> Wide Vehicle Selection</li>
              <li><FaMoneyBillWave /> Flexible Pricing</li>
              <li><FaHeadset /> Roadside Assistance</li>
            </ul>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaShuttleVan />
            </div>
            <h3>Airport Transfer</h3>
            <p>
              Enjoy hassle-free airport transfers with our reliable and comfortable
              transportation service.
            </p>
            <ul className="service-features">
              <li><FaSearch /> Door-to-Door Service</li>
              <li><FaMoneyBillWave /> Fixed Rates</li>
              <li><FaHeadset /> Flight Tracking</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2 className="section-title">Why Choose EasyFlight?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaSearch />
            </div>
            <h3>Easy Booking</h3>
            <p>Simple and intuitive booking process for all our services.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaMoneyBillWave />
            </div>
            <h3>Best Prices</h3>
            <p>Competitive prices and special deals for our customers.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaHeadset />
            </div>
            <h3>24/7 Support</h3>
            <p>Round-the-clock customer support for all your needs.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
