import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaVenusMars, FaCreditCard, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import "../../styles/BookFlight.css";

const BookFlight = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Passenger Info, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    email: "",
    phone: "",
    // Payment form data
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Set document title
    document.title = "Book Flight - EasyFlight";
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.gender) newErrors.gender = "Please select your gender";
      if (!formData.birthDate) newErrors.birthDate = "Birth date is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
        newErrors.phone = "Phone number is invalid";
      }
    } else if (step === 2) {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = "Card number must be 16 digits";
      }
      if (!formData.cardName.trim()) newErrors.cardName = "Cardholder name is required";
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = "Expiry date is required";
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = "Use MM/YY format";
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "CVV must be 3 or 4 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
    }
    // Format expiry date
    else if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1/$2")
        .substr(0, 5);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        // Simulate payment processing
        setTimeout(() => {
          setStep(3);
          toast.success("Payment successful! Check your email for your e-ticket.", {
            duration: 5000,
            position: "top-center",
          });
        }, 1500);
      }
    }
  };

  const renderPassengerForm = () => (
    <div className="booking-form">
      <h2>Passenger Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>
              <FaUser /> First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label>
              <FaUser /> Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              <FaVenusMars /> Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>

          <div className="form-group">
            <label>
              <FaCalendarAlt /> Birth Date
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
            />
            {errors.birthDate && <span className="error">{errors.birthDate}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>
              <FaPhone /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
        </div>

        <button type="submit" className="submit-button">
          Proceed to Payment
        </button>
      </form>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="booking-form">
      <h2>Payment Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <FaCreditCard /> Card Number
          </label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
          />
          {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
        </div>

        <div className="form-group">
          <label>
            <FaUser /> Cardholder Name
          </label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleInputChange}
            placeholder="Name on card"
          />
          {errors.cardName && <span className="error">{errors.cardName}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              <FaCalendarAlt /> Expiry Date
            </label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              maxLength="5"
            />
            {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
          </div>

          <div className="form-group">
            <label>
              <FaLock /> CVV
            </label>
            <input
              type="password"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              placeholder="123"
              maxLength="4"
            />
            {errors.cvv && <span className="error">{errors.cvv}</span>}
          </div>
        </div>

        <div className="payment-summary">
          <h3>Payment Summary</h3>
          <div className="summary-item">
            <span>Flight Price:</span>
            <span>$299.99</span>
          </div>
          <div className="summary-item">
            <span>Taxes & Fees:</span>
            <span>$50.00</span>
          </div>
          <div className="summary-item total">
            <span>Total:</span>
            <span>$349.99</span>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Pay Now
        </button>
      </form>
    </div>
  );

  const renderSuccess = () => (
    <div className="success-container">
      <div className="success-content">
        <h2>Booking Confirmed!</h2>
        <p>Thank you for choosing EasyFlight for your travel needs.</p>
        <p>We&apos;ve sent your e-ticket to your email address.</p>
        <p>Please check your inbox for the confirmation email.</p>
        <button 
          className="submit-button"
          onClick={() => navigate("/")}
        >
          Return to Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="booking-container">
      {step === 1 && renderPassengerForm()}
      {step === 2 && renderPaymentForm()}
      {step === 3 && renderSuccess()}
    </div>
  );
};

export default BookFlight; 