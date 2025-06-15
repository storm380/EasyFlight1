import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About EasyFlight</h3>
          <p>
            Your trusted partner for seamless travel experiences. We provide the best
            flight booking services, car rentals, and airport transfers to make your
            journey comfortable and memorable.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/car-rental">Car Rental</Link>
            </li>
            <li>
              <Link to="/airport-transfer">Airport Transfer</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Info</h3>
          <ul>
            <li>
              <FaPhone /> +1 234 567 890
            </li>
            <li>
              <FaEnvelope /> info@easyflight.com
            </li>
            <li>
              <FaMapMarkerAlt /> 123 Travel Street, City, Country
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} EasyFlight. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 