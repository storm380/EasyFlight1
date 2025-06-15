// Contact.jsx

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/Contact.css";
import { Link } from "react-router-dom";

const Contact = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(()=> {
    document.title='contact';
  },[])

  const validate = (data) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.name.trim()) {
      errors.name = "Name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!data.message.trim()) {
      errors.message = "Message is required";
    } else if (data.message.trim().length < 10) {
      errors.message = "Message should be at least 10 characters";
    }

    return errors;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      name: form.current.name.value,
      email: form.current.email.value,
      message: form.current.message.value,
    };

    const validationErrors = validate(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    emailjs
      .sendForm(
        "service_r79ovdm",
        "template_age2w1e",
        form.current,
        "G1T_YQFURB82uD9n4"
      )
      .then(
        (result) => {
          console.log("Email sent", result.text);
          setSent(true);
          setError(false);
          setErrors({});
          form.current.reset();
          setIsSubmitting(false);
          setTimeout(() => setSent(false), 5000);
        },
        (error) => {
          console.error("Error sending email", error.text);
          setSent(false);
          setError(true);
          setIsSubmitting(false);
          setTimeout(() => setError(false), 5000);
        }
      );
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2>Get in Touch</h2>
        <p className="contact-subtitle">
          Have a question ? Send me a message.
        </p>

        <form ref={form} onSubmit={sendEmail} noValidate className="contact-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              className={`form-input ${errors.name ? "invalid" : ""}`}
              placeholder="Your Name"
              aria-label="Your Name"
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              className={`form-input ${errors.email ? "invalid" : ""}`}
              placeholder="Your Email"
              aria-label="Your Email"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <textarea
              name="message"
              className={`form-textarea ${errors.message ? "invalid" : ""}`}
              placeholder="Your Message"
              aria-label="Your Message"
              rows="5"
            ></textarea>
            {errors.message && (
              <span className="error-message">{errors.message}</span>
            )}
          </div>

          <div className="button-row">
  <button
    type="submit"
    className="submit-button"
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <>
        <span className="spinner"></span> Sending...
      </>
    ) : (
      "Send Message"
    )}
  </button>
</div>

        </form>


        {sent && (
          <div className="notification success">
            Message sent successfully! I ll get back to you soon.
          </div>
        )}
        {error && (
          <div className="notification error">
            Oops! Something went wrong. Please try again.
          </div>
        )}
      </div>

    </section>
    
  );
};

export default Contact;