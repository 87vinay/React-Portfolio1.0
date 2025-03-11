import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import AboutSection from "./AboutSection";
import ProjectSection from "./ProjectSection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import ScrollIndicator from "./ScrollIndicator";
import { Link } from "react-router-dom";
import "../styles/MainPage.css";

const MainPage = () => {
  const initialsRef = useRef(null);
  const fullNameRef = useRef(null);
  const menuIconRef = useRef(null);
  const menuBoxRef = useRef(null);
  const titleRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    if (
      initialsRef.current &&
      menuIconRef.current &&
      fullNameRef.current &&
      menuBoxRef.current &&
      titleRef.current
    ) {
      gsap.set(menuBoxRef.current, {
        visibility: "hidden",
        opacity: 0,
        y: "-10vh",
        transformOrigin: "top right",
        right: 0,
        top: 0,
        width: window.innerWidth <= 768 ? "100%" : "450px",
      });
      gsap.set(titleRef.current, { y: 50 });
      const tl = gsap.timeline();
      tl.fromTo(
        initialsRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
      )
        .fromTo(
          menuIconRef.current,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1.5, duration: 0.5, ease: "power4.out" }
        )
        .to(menuIconRef.current, {
          scale: 1,
          duration: 0.6,
          ease: "bounce.out",
        })
        .to(initialsRef.current, {
          duration: 1,
          x: 0,
          opacity: 0,
          ease: "power2.out",
        })
        .fromTo(
          fullNameRef.current,
          { opacity: 0, scaleX: 0 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 1,
            ease: "bounce.out",
          }
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "back.out(1.9)" }
        );
    }

    return () => clearInterval(timer);
  }, []);
  const toggleMenu = useCallback(() => {
    if (!menuIconRef.current || !menuBoxRef.current) return;
    const line1 = menuIconRef.current.querySelector(".line1");
    const line2 = menuIconRef.current.querySelector(".line2");
    const menuBox = menuBoxRef.current;
    if (!line1 || !line2) return;

    if (!menuOpen) {
      const isMobile = window.innerWidth <= 768;

      gsap.set(menuBox, {
        visibility: "visible",
        opacity: 0,
        y: "-10vh",
        right: 0,
        top: 0,
        width: isMobile ? "100%" : "450px",
      });

      gsap.to(menuBox, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        force3D: true,
      });
      gsap.to(line1, {
        rotation: 45,
        y: 4,
        duration: 0.3,
        transformOrigin: "center center",
        force3D: true,
      });
      gsap.to(line2, {
        rotation: -45,
        y: -4,
        duration: 0.3,
        transformOrigin: "center center",
        force3D: true,
      });
    } else {
      gsap.to(menuBox, {
        opacity: 0,
        y: "-10vh",
        duration: 0.3,
        ease: "power2.in",
        force3D: true,
        onComplete: () => {
          gsap.set(menuBox, { visibility: "hidden" });
        },
      });
      gsap.to([line1, line2], {
        rotation: 0,
        y: 0,
        duration: 0.3,
        transformOrigin: "center center",
        force3D: true,
        stagger: 0,
      });
    }
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  const formatDate = (date) => {
    return date
      .toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
      .toUpperCase();
  };

  return (
    <div className="main-page">
      <header>
        <div className="header-content">
          <div className="initials-top-left" ref={initialsRef}>
            VS
          </div>
          <div className="full-name" ref={fullNameRef}>
            Vinay Sharma
          </div>
          <button
            className="menu-icon"
            ref={menuIconRef}
            onClick={toggleMenu}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div className="line line1" />
            <div className="line line2" />
          </button>
        </div>
      </header>
      <div className="title-container">
        <h1 className="title" ref={titleRef}>
          frontend developer <br />& freelancer
        </h1>
      </div>
      <AboutSection />
      <ProjectSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
      <ScrollIndicator />
      <div className="menu-box" ref={menuBoxRef}>
        <nav className="menu-content">
          <ul className="main-nav">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/about">ABOUT</Link>
            </li>
            <li>
              <Link to="/project">PROJECTS</Link>
            </li>
          </ul>
          <div className="social-heading">
            <h5>socials</h5>
          </div>
          <div className="social-links">
            <a href="#linkedin">LinkedIn</a>
            <a href="#github">GitHub</a>
            <a href="#whatsapp">WhatsApp</a>
            <a href="#instagram">Instagram</a>
          </div>
          <div className="location-info">
            <p className="loc-txt">Located in India</p>
            <p className="date">{formatDate(currentTime)}</p>
            <p className="time">{formatTime(currentTime)}</p>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MainPage;
