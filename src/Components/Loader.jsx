import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import "../styles/Loader.css";

const Loader = ({ onComplete }) => {
  const [loadingPhase, setLoadingPhase] = useState("loading");
  const countdownValues = [10, 30, 60, 100];
  const [showCountdown, setShowCountdown] = useState(false);
  const loadingRef = useRef(null);
  const loadingTextRef = useRef(null);
  const numberContainerRef = useRef(null);
  const initialsRef = useRef(null);
  const visitWebsiteRef = useRef(null);

  useEffect(() => {
    const text = "LOADING";
    loadingTextRef.current.innerHTML = text
      .split("")
      .map((char) => `<span class="char">${char}</span>`)
      .join("");

    const chars = loadingTextRef.current.querySelectorAll(".char");
    const loadingAnimation = gsap.to(chars, {
      y: -20,
      stagger: { each: 0.1, yoyo: true },
      ease: "back.inOut(1.7)",
      duration: 0.6,
    });

    const startCountdownTimer = setTimeout(() => {
      setShowCountdown(true);
      let index = 0;

      gsap.from(numberContainerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      });

      const interval = setInterval(() => {
        if (index < countdownValues.length - 1) {
          index += 1;
          gsap.to(numberContainerRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              numberContainerRef.current.textContent = countdownValues[index];
              gsap.fromTo(
                numberContainerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
              );
            },
          });
        } else {
          clearInterval(interval);
          loadingAnimation.kill();
          gsap.to(chars, {
            y: 0,
            stagger: { each: 0.05, from: "start" },
            ease: "back.inOut(1.7)",
            duration: 0.3,
            onComplete: () => {
              setTimeout(() => setLoadingPhase("complete"), 200);
            },
          });
        }
      }, 1000);

      return () => clearInterval(interval);
    }, 2000);

    return () => {
      clearTimeout(startCountdownTimer);
      loadingAnimation?.kill();
    };
  }, []);

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
      {loadingPhase !== "complete" && (
        <div className="loader-bottom">
          <div ref={loadingTextRef}>LOADING</div>
        </div>
      )}

      {showCountdown && loadingPhase !== "complete" && (
        <div className="loader-progress">
          <div className="number-wrapper">
            <div ref={numberContainerRef} className="number current">
              {countdownValues[0]}
            </div>
          </div>
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
