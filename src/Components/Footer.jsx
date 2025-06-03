import React, { useState, useEffect } from "react";
import "../styles/Footer.css";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaCode,
} from "react-icons/fa";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className={`footer ${isVisible ? "footer-visible" : ""}`}>
      <div className="footer-background-overlay"></div>

      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <h1 className="footer-title">
              <span className="title-char">D</span>
              <span className="title-char">e</span>
              <span className="title-char">v</span>
              <span className="title-char">f</span>
              <span className="title-char">o</span>
              <span className="title-char">l</span>
              <span className="title-char">i</span>
              <span className="title-char">o</span>
            </h1>
            <div className="brand-underline"></div>
          </div>

          <div className="social-section">
            <div className="social-icons">
              <a
                href="https://github.com/87vinay"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link github"
                title="GitHub"
              >
                <FaGithub />
                <span className="social-tooltip">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/vinay-sharma08"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
                title="LinkedIn"
              >
                <FaLinkedin />
                <span className="social-tooltip">LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram"
                title="Instagram"
              >
                <FaInstagram />
                <span className="social-tooltip">Instagram</span>
              </a>
              <a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link whatsapp"
                title="WhatsApp"
              >
                <FaWhatsapp />
                <span className="social-tooltip">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-middle">
          <div className="footer-left">
            <div className="quote-container">
              <FaCode className="quote-icon" />
              <p className="footer-quote">
                If at first you don't succeed, call it version 1.0
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-messages">
            <p className="message-item">
              Thank you for visiting my portfolio!
            </p>
            <p className="message-item">
              This site is designed to be responsive.
            </p>
            <p className="message-item">
              Designed and coded with passion and dedication.
            </p>
          </div>

          <div className="footer-signature">
            <div className="signature-line"></div>
            <span className="signature-text">Made with ❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
