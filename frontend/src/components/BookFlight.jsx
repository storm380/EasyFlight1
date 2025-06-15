// RebookFlight.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "../styles/BookFlight.css";

const RebookFlight = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlightId, setSelectedFlightId] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
    useEffect(()=> {
      document.title='book flight';
    },[])
  

  const navigate = useNavigate();

  // Charger les vols
  useEffect(() => {
    const fetchAvailableFlights = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/flights");
        if (!response.ok) throw new Error("Failed to fetch flights");

        const data = await response.json();
        if (data.success) setFlights(data.data);
      } catch (error) {
        alert("Could not load flights. Please try again later.");
        console.error(error);
      }
    };

    fetchAvailableFlights();
  }, []);

  // Gérer les changements du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Trouver le vol sélectionné
  const selectedFlight = flights.find((f) => f._id === selectedFlightId);

  // Soumettre la réservation
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!selectedFlightId || !formData.name || !formData.email) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/flights/book/${selectedFlightId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Booking failed");
      }

      const result = await response.json();
      if (result.success) {
        generateTicketPDF(selectedFlight, formData, result.bookingId); // Génère le PDF
        setBookingSuccess(true);
        setTimeout(() => navigate("/"), 4000); // Redirige après 4s
      }
    } catch (error) {
      console.error("Error booking flight:", error);
      alert(error.message || "Something went wrong!");
    }
  };

  // Fonction pour générer le PDF
  const generateTicketPDF = (flight, user, bookingId) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("✈️ Boarding Pass", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${user.name}`, 20, 40);
    doc.text(`Email: ${user.email}`, 20, 50);
    doc.text(`Booking ID: ${bookingId}`, 20, 60);

    doc.text(`Flight: ${flight.departure} → ${flight.destination}`, 20, 80);
    doc.text(`Date: ${new Date(flight.date).toLocaleDateString()}`, 20, 90);
    doc.text(`Time: ${flight.time}`, 20, 100);
    doc.text(`Price: $${flight.price}`, 20, 110);

    doc.setDrawColor(0);
    doc.line(20, 120, 190, 120); // Ligne de séparation

    doc.setFont("courier", "bold");
    doc.text("Have a great trip!", 20, 135);

    // Télécharger le PDF automatiquement
    doc.save(`BoardingPass-${bookingId}.pdf`);
  };

  return (
    <div className="rebook-flight-container">
      <h2>Rebook a Flight</h2>

      {!bookingSuccess ? (
        <form onSubmit={handleBooking} className="rebook-form">
          <div className="form-field">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="flight-select">Select a Flight:</label>
            <select
              id="flight-select"
              value={selectedFlightId}
              onChange={(e) => setSelectedFlightId(e.target.value)}
              required
            >
              <option value="">Choose a flight</option>
              {flights.map((flight) => (
                <option key={flight._id} value={flight._id}>
                  {flight.departure} → {flight.destination} |{" "}
                  {new Date(flight.date).toLocaleDateString()} | ${flight.price} | Seats: {flight.availableSeats}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Confirm Booking
            </button>
            <Link to="/">
              <button type="button" className="back-button">
                Back to Home
              </button>
            </Link>
          </div>
        </form>
      ) : (
        <div className="success-message">
          <p>✅ Your flight has been booked successfully!</p>
          <p>📄 The boarding pass has been downloaded automatically.</p>
          <p>🔁 You will be redirected to the home page shortly...</p>
        </div>
      )}
    </div>
  );
};

export default RebookFlight;