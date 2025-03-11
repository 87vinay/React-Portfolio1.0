import React, { useRef, useEffect } from 'react';
import '../styles/MagneticButton.css';

const MagneticButton = ({ children, className }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 100; 
      const strength = 0.2;

      if (distance < maxDistance) {
        const translateX = deltaX * strength;
        const translateY = deltaY * strength;
        button.style.transform = `translate(${translateX}px, ${translateY}px)`;
      } else {
        button.style.transform = 'translate(0, 0)';
      }
    };

    const handleMouseLeave = () => {
      button.style.transform = 'translate(0, 0)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button ref={buttonRef} className={`magnetic-button ${className}`}>
      {children}
    </button>
  );
};

export default MagneticButton;