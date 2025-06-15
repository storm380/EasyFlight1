import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authcont";
import logo from "../../assets/logo3.png";
import "../../styles/Header.css";

// Icons
import { FaHome, FaCar, FaPlaneDeparture, FaEnvelope, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaChevronDown, FaTachometerAlt, FaHotel } from "react-icons/fa";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);

  const logout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => setUser(null))
      .catch((err) => console.log(err));
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <FaHome style={{ marginRight: "8px" }} /> Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/car-rental" className="nav-link">
            <FaCar style={{ marginRight: "8px" }} /> Car Rental
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/hotels" className="nav-link">
            <FaHotel style={{ marginRight: "8px" }} /> Hotels
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/airport-transfer" className="nav-link">
            <FaPlaneDeparture style={{ marginRight: "8px" }} /> Flights
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">
            <FaEnvelope style={{ marginRight: "8px" }} /> Contact
          </Link>
        </li>

        {user ? (
          <li className="nav-item dropdown">
            <button className="b dropdown-toggle">
              <FaUser style={{ marginRight: "6px" }} />
              Account <FaChevronDown style={{ marginLeft: "6px" }} />
            </button>
            <ul className="dropdown-menu">
              {user.role === "admin" && (
                <li>
                  <Link to="/dashboard" className="dropdown-item">
                    <FaTachometerAlt style={{ marginRight: "8px" }} /> Dashboard
                  </Link>
                </li>
              )}
              <li>
                <button className="dropdown-item logout-btn" onClick={logout}>
                  <FaSignOutAlt style={{ marginRight: "8px" }} /> Logout
                </button>
              </li>
            </ul>
          </li>
        ) : (
          <li className="nav-item dropdown">
            <button className="b dropdown-toggle">
              <FaUser style={{ marginRight: "6px" }} />
              Account <FaChevronDown style={{ marginLeft: "6px" }} />
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link to="/login" className="dropdown-item">
                  <FaSignInAlt style={{ marginRight: "8px" }} /> Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="dropdown-item">
                  <FaUserPlus style={{ marginRight: "8px" }} /> Register
                </Link>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header; 