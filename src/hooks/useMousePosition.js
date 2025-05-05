import { useState, useEffect } from 'react';

// Optimized hook to get mouse position using requestAnimationFrame
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId = null;
    let lastKnownPosition = { x: 0, y: 0 };
    let ticking = false;

    const handleMouseMove = (event) => {
      lastKnownPosition = { x: event.clientX, y: event.clientY };
      if (!ticking) {
        animationFrameId = requestAnimationFrame(() => {
          setPosition(lastKnownPosition);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return position;
};

export default useMousePosition;