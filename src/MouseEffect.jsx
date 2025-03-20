import React, { useRef, useEffect, useState } from "react";
import "../src/styles/MouseEffect.css";
const MouseEffect = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const config = {
    totalPoints: 15,
    lineWidthFactor: 0.2,
    springStrength: 0.5,
    damping: 0.4,
  };

  const trailPointsRef = useRef(
    Array.from({ length: config.totalPoints }, () => ({
      x: mousePosition.x,
      y: mousePosition.y,
      velocityX: 0,
      velocityY: 0,
    }))
  );

  useEffect(() => {
    if (window.innerWidth > 1100) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let animationFrameId;

      const handleMouseMove = (e) =>
        setMousePosition({ x: e.clientX, y: e.clientY });

      const initializeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawTrail();
      };

      const drawTrail = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const { springStrength, damping, lineWidthFactor, totalPoints } =
          config;
        const trailPoints = trailPointsRef.current;

        trailPoints.forEach((point, index) => {
          const previousPoint =
            index === 0 ? mousePosition : trailPoints[index - 1];
          const appliedSpring =
            index === 0 ? 0.4 * springStrength : springStrength;

          point.velocityX += (previousPoint.x - point.x) * appliedSpring;
          point.velocityY += (previousPoint.y - point.y) * appliedSpring;
          point.velocityX *= damping;
          point.velocityY *= damping;
          point.x += point.velocityX;
          point.y += point.velocityY;
        });

        ctx.strokeStyle = '#2c333350';
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(trailPoints[0].x, trailPoints[0].y);

        trailPoints.slice(1, -1).forEach((point, index) => {
          const nextPoint = trailPoints[index + 2];
          const midX = (point.x + nextPoint.x) / 2;
          const midY = (point.y + nextPoint.y) / 2;
          ctx.quadraticCurveTo(point.x, point.y, midX, midY);
          ctx.lineWidth = lineWidthFactor * (totalPoints - index);
          ctx.stroke();
        });

        ctx.lineTo(
          trailPoints[trailPoints.length - 1].x,
          trailPoints[trailPoints.length - 1].y
        );
        ctx.stroke();

        animationFrameId = requestAnimationFrame(drawTrail);
      };

      initializeCanvas();
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [mousePosition]);

  return <canvas className="mouse-trail" ref={canvasRef} />;
};

export default MouseEffect;
