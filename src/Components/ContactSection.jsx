import React, { useState, useEffect } from "react";
import Particles from "../threejs/Particles";
import MagneticButton from "./MagneticButton";
import "../styles/ContactSection.css";

const ContactSection = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isSmallScreen = windowWidth <= 768;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return (
    <div className="contact-section">
      <h1 className="contact-title">Get in Touch</h1>
      <div className="contact-content">
        <div className="particle-wrapper">
          <Particles />
        </div>
        <div className="form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                autoComplete="name"
                inputMode="text"
              />
              <label htmlFor="name" className="form-label">
                Your name *
              </label>
              <div className="form-line"></div>
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                autoComplete="email"
                inputMode="email"
              />
              <label htmlFor="email" className="form-label">
                Your email *
              </label>
              <div className="form-line"></div>
            </div>
            <div className="form-group">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="form-input"
                rows="1"
              ></textarea>
              <label htmlFor="message" className="form-label">
                Your message *
              </label>
              <div className="form-line"></div>
            </div>
            {/* <MagneticButton type="submit" className="submit-btn">
              Send it
            </MagneticButton> */}
            {isSmallScreen ? (
              <button type="submit" className="submit-btn">
                Send it
              </button>
            ) : (
              <MagneticButton type="submit" className="submit-btn">
                Send it
              </MagneticButton>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
