import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import "../styles/Loader.css";

const Loader = ({ onComplete }) => {
  const [loadingPhase, setLoadingPhase] = useState("line");
  const loadingRef = useRef(null);
  const lineRef = useRef(null);
  const initialsRef = useRef(null);
  const visitWebsiteRef = useRef(null);

  useEffect(() => {
    const masterTimeline = gsap.timeline();

    masterTimeline
      .fromTo(
        lineRef.current,
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 2,
          ease: "power2.inOut",
        }
      )
      .to(
        lineRef.current,
        {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            setLoadingPhase("complete");
          },
        },
        "+=0.3"
      ); 

    return () => {
      masterTimeline.kill();
    };
  }, []);
  useEffect(() => {
    if (loadingPhase === "complete") {
      const completionTimeline = gsap.timeline();

      completionTimeline
        .fromTo(
          initialsRef.current,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          }
        )
        .fromTo(
          visitWebsiteRef.current,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.3" 
        );
    }
  }, [loadingPhase]);

  const handleVisitWebsiteClick = () => {
    const timeline = gsap.timeline({
      onComplete: onComplete,
    });

    timeline
      .to(initialsRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      })
      .to(
        visitWebsiteRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "<"
      );
  };

  return (
    <div className="loader" ref={loadingRef}>
      {loadingPhase === "line" && (
        <div className="loader-line-container">
          <div ref={lineRef} className="loader-line"></div>
        </div>
      )}

      {loadingPhase === "complete" && (
        <div className="loader-container">
          <div className="initials" ref={initialsRef}>
            VS
          </div>
          <button
            className="visit-website"
            ref={visitWebsiteRef}
            onClick={handleVisitWebsiteClick}
          >
            Visit Website
          </button>
        </div>
      )}
    </div>
  );
};

export default Loader;
