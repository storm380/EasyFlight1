import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Register.css";
import { toast } from "react-hot-toast"; // Import toast for notifications
import { AuthContext } from "../../context/authcont";

const Register = () => {
  const {setUser}=useContext(AuthContext) 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error for the current field when the user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Reset errors
    setErrors({ name: "", email: "", password: "" });

    // Validate form data
    const { name, email, password } = formData;
    let hasError = false;

    if (!name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Name is required." }));
      hasError = true;
    }

    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email is required." }));
      hasError = true;
    } else {
      // Simple email validation using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrors((prev) => ({ ...prev, email: "Please enter a valid email address." }));
        hasError = true;
      }
    }

    if (!password.trim()) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
      hasError = true;
    } else if (password.length < 6) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters long." }));
      hasError = true;
    }

    if (hasError) {
      setIsLoading(false);
      return;
    }

    try {
      // Send the registration request
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        credentials: "include",  
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setUser(data.user); 
      if (!res.ok) throw new Error(data.message);

      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      setErrors((prev) => ({ ...prev, general: err.message })); // Optional: Add a general error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
      <div className="go-home">
    <Link to="/" aria-label="Close" title="Close">
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    </Link>
</div>
        <h2 className="auth-title">Create Account</h2>

        <form onSubmit={handleRegister} className="auth-form">
          {/* Name Input */}
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
              className="form-input"
              value={formData.name}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          {/* Email Input */}
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
             
              className="form-input"
              value={formData.email}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            
              className="form-input"
              value={formData.password}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          {/* General Error (Optional) */}
          {errors.general && <p className="error-message">{errors.general}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              "Register"
            )}
          </button>
             <div className="auth-footer text-center">
             Do you have an account?
        <Link to="/login" className="ms-3 text-start">
          Login
        </Link>
             </div>
        </form>
      </div>
    </div>
  );
};

export default Register;