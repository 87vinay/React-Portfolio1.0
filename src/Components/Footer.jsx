import React from "react";
import "../styles/Footer.css";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h1 className="footer-title">Devfolio</h1>
        <div className="social-icons">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/your-number"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
      <div className="footer-left">
        <p>If at first you don’t succeed, call it version 1.0</p>
      </div>
      <div className="footer-bottom">
        <p>Thank you for visiting my portfolio!</p>
        <p>This site is designed to be responsive.</p>
        <p>Designed and coded with passion and dedication.</p>
      </div>
    </footer>
  );
};

export default Footer;
