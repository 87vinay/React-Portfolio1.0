import React, { useEffect, useRef } from "react";
import "../styles/ScrollIndicator.css";

const ScrollIndicator = () => {
  const progressBarRef = useRef(null);
  const rafIdRef = useRef(null);
  useEffect(() => {
    let lastKnownScrollPosition = 0;
    let ticking = false;
    const updateProgressBar = () => {
      if (progressBarRef.current) {
        const totalHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (lastKnownScrollPosition / totalHeight) * 100;
        progressBarRef.current.style.height = `${scrolled}%`;
      }
      ticking = false;
    };
    const handleScroll = () => {
      lastKnownScrollPosition = window.scrollY;
      if (!ticking) {
        rafIdRef.current = window.requestAnimationFrame(() => {
          updateProgressBar();
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);
  return (
    <div className="progress-container">
      <div ref={progressBarRef} className="progress-bar" />
    </div>
  );
};

export default ScrollIndicator;
