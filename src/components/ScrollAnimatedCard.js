import React, { useRef, useState, useEffect, useCallback } from 'react';
import _throttle from 'lodash/throttle'; // Using lodash for throttling

// ScrollAnimatedCard Component: Applies a scaling animation based on scroll position
// Optimized for performance using IntersectionObserver, throttling, and requestAnimationFrame
function ScrollAnimatedCard({ children, className = '', style = {}, ...props }) {
  // Ref to the card element
  const cardRef = useRef(null);
  // State to track if the element is currently intersecting the viewport
  const [isIntersecting, setIsIntersecting] = useState(false);
  // State to store the calculated scale value
  const [scale, setScale] = useState(1); // Start at full scale

  // --- Intersection Observer Setup ---
  // This observer watches the card element and updates the `isIntersecting` state.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update intersecting state based on whether the element is in the viewport
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin
        threshold: 0, // Trigger as soon as any part of the element enters/leaves
      }
    );

    const currentCardRef = cardRef.current; // Capture ref value

    // Start observing the card element if it exists
    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    // Cleanup function: Stop observing when the component unmounts or ref changes
    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // --- Scroll Handler Logic ---
  // This function calculates the scale based on the element's position in the viewport.
  // It's wrapped in useCallback and throttled to improve performance.
  const handleScroll = useCallback(() => {
    if (!cardRef.current) return; // Exit if the ref is not set

    // Get viewport height and the element's bounding rectangle
    const viewportHeight = window.innerHeight;
    const rect = cardRef.current.getBoundingClientRect();
    const elementTop = rect.top;
    const elementHeight = rect.height;

    // Calculate the vertical center of the element relative to the viewport top
    const elementCenter = elementTop + elementHeight / 2;

    // Calculate the distance of the element's center from the viewport's center
    // Normalize this distance to a value between -1 (top edge) and 1 (bottom edge)
    const distanceFromCenter = (elementCenter - viewportHeight / 2) / (viewportHeight / 2);

    // Calculate scale:
    // - Max scale (1) when the element is near the center of the viewport.
    // - Min scale (e.g., 0.8) when the element is at the top or bottom edge.
    // `Math.abs(distanceFromCenter)` gives a value from 0 (center) to 1 (edge).
    // We subtract this from 1 to get the inverse (1 at center, 0 at edge).
    // We scale this result (e.g., multiply by 0.2) and add the minimum scale (0.8).
    const minScale = 0.8; // Minimum scale factor
    const scaleRange = 1 - minScale; // The range of scaling (e.g., 1 - 0.8 = 0.2)
    const calculatedScale = minScale + (1 - Math.abs(distanceFromCenter)) * scaleRange;

    // Clamp the scale between minScale and 1 to prevent unexpected values
    const clampedScale = Math.max(minScale, Math.min(1, calculatedScale));

    // Use requestAnimationFrame to schedule the state update for the next paint cycle.
    // This prevents layout thrashing and ensures smoother updates.
    window.requestAnimationFrame(() => {
      setScale(clampedScale);
    });
  }, []); // No dependencies needed for useCallback here as it only uses refs and window properties

  // --- Throttled Scroll Handler ---
  // Create a throttled version of handleScroll.
  // It will execute at most once every 16ms (roughly 60 FPS).
  const throttledScrollHandler = useRef(_throttle(handleScroll, 16)).current;

  // --- Effect to Add/Remove Scroll Listener ---
  // This effect runs when the `isIntersecting` state changes.
  useEffect(() => {
    // If the element is intersecting, add the throttled scroll listener.
    if (isIntersecting) {
      window.addEventListener('scroll', throttledScrollHandler, { passive: true });
      // Run handler once immediately when it becomes intersecting to set initial scale
      handleScroll();
    } else {
      // If the element is not intersecting, remove the listener.
      window.removeEventListener('scroll', throttledScrollHandler);
      // Optionally reset scale when not visible (or keep last state)
      // requestAnimationFrame(() => setScale(1)); // Reset to 1 if desired
    }

    // Cleanup function: Remove the listener when the component unmounts
    // or when `isIntersecting` changes again.
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, [isIntersecting, throttledScrollHandler, handleScroll]); // Dependencies: run if intersection status or handlers change

  // --- Render ---
  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-100 ease-out ${className}`} // Keep existing transition classes if needed, or adjust
      style={{
        ...style, // Spread any existing inline styles
        transform: `scale(${scale})`, // Apply the calculated scale
        willChange: 'transform', // Hint to the browser for optimization
      }}
      {...props} // Spread any other props
    >
      {children}
    </div>
  );
}

export default ScrollAnimatedCard;