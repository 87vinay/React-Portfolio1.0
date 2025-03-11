import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import "../styles/AboutSection.css";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRefs = useRef([]);
  const buttonRef = useRef(null);
  const [isTouched, setIsTouched] = useState(false);

  const letters = "HELLOOOO".split("");
  const descriptions = [
    "My name is Vinay, and I'm a front-end developer, who creates websites with a special focus on animations and user interaction.",
    "I'm ready to bring your ideas to life and add a touch of originality to the online space.",
  ];

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;

    gsap.set(title.children, { y: 100, opacity: 0 });
    gsap.set(descriptionRefs.current, { y: 180 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 60%",
        end: "bottom center",
        onLeaveBack: () => tl.reverse(),
      },
    });

    tl.to(title.children, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      transform: (index) => `translate3d(0, ${index * 15}px, 0)`,
    }).to(
      descriptionRefs.current,
      {
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const handleTouchStart = () => {
      setIsTouched(true);
    };
    const handleTouchEnd = () => {
      setIsTouched(false);
    };
    const buttonElement = buttonRef.current;
    if (buttonElement) {
      buttonElement.addEventListener("touchstart", handleTouchStart);
      buttonElement.addEventListener("touchend", handleTouchEnd);
      return () => {
        buttonElement.removeEventListener("touchstart", handleTouchStart);
        buttonElement.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, []);

  return (
    <div className="about-container" ref={containerRef}>
      <div className="about-wrapper">
        <div className="about-title">
          <h1 className="about-title-text" ref={titleRef}>
            {letters.map((letter, index) => (
              <span key={index} className="about-title-letter-wrapper">
                <span>{letter}</span>
              </span>
            ))}
          </h1>
        </div>
        <div className="about-content">
          <div className="about-descriptions">
            {descriptions.map((desc, index) => (
              <div key={index} className="about-description-wrapper">
                <span
                  className="about-description-text"
                  ref={(el) => (descriptionRefs.current[index] = el)}
                >
                  {desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        ref={buttonRef}
        className={`about-more-button ${isTouched ? "touched" : ""}`}
      >
         <Link to="/aboutme">more about me</Link> 
      </div>
    </div>
  );
};

export default AboutSection;
