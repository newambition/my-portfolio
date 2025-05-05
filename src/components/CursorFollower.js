import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useMousePosition from '../hooks/useMousePosition';

const CursorFollower = () => {
  const { x, y } = useMousePosition();
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isPointer, setIsPointer] = useState(false); // Track if over text input etc.

  useEffect(() => {
    const handleMouseEnterInteractive = () => setIsHoveringInteractive(true);
    const handleMouseLeaveInteractive = () => setIsHoveringInteractive(false);
    const handleMouseEnterPointer = () => setIsPointer(true);
    const handleMouseLeavePointer = () => setIsPointer(false);

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    const pointerElements = document.querySelectorAll('input[type="text"], textarea, input[type="email"]'); // Add more as needed

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });
    pointerElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnterPointer);
        el.addEventListener('mouseleave', handleMouseLeavePointer);
      });

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
       pointerElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterPointer);
        el.removeEventListener('mouseleave', handleMouseLeavePointer);
      });
    };
  }, []);

  const cursorSize = isHoveringInteractive ? 24 : (isPointer ? 8 : 16);

  const cursorVariants = {
    default: {
      x: x - cursorSize / 2,
      y: y - cursorSize / 2,
      width: `${cursorSize}px`,
      height: `${cursorSize}px`,
      // Use interactive color for the cursor follower - should contrast well on both themes
      // Using HSL directly as it's simpler here than rgb() for a solid color
      backgroundColor: 'hsl(var(--color-interactive-hsl))',
      opacity: isPointer ? 1 : 0.7,
      scale: 1,
      mixBlendMode: 'difference', // Keep difference blend mode
      transition: { type: 'spring', stiffness: 500, damping: 30, mass: 0.1 }
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
      variants={cursorVariants}
      animate="default"
      initial={false}
    />
  );
};

const ClientOnlyCursorFollower = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) {
      return null;
  }

  return <CursorFollower />;
};

export default ClientOnlyCursorFollower;