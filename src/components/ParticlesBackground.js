import React, { useEffect, useRef, useMemo } from "react";

// Helper function to determine particle color based on the theme setting (unchanged)
const getColorBasedOnTheme = (theme) => {
  switch (theme) {
    case 'pastel':
      return `hsl(${Math.random() * 360}, 70%, 80%)`;
    case 'monochrome':
      return `hsl(0, 0%, ${Math.random() * 80 + 20}%)`;
    case 'bright':
    default:
      return `hsl(${Math.random() * 360}, 80%, 65%)`;
  }
};

const ParticlesBackground = ({ settings }) => {
  const canvasRef = useRef(null);
  const { numberOfParticles, speed, colorTheme } = settings;

  const particleConfig = useMemo(() => ({
    numberOfParticles,
    minSize: 0.3,
    maxSize: 7,
    minSpeed: -speed,
    maxSpeed: speed,
    colorTheme,
  }), [numberOfParticles, speed, colorTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const {
        numberOfParticles: numParticles,
        minSize,
        maxSize,
        minSpeed,
        maxSpeed,
        colorTheme: theme
    } = particleConfig;

    const particlesArray = [];

    class Particle {
      // ... (constructor and update methods unchanged)
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (maxSize - minSize) + minSize;
        this.speedX = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        this.speedY = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        this.color = getColorBasedOnTheme(theme);
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
          this.speedX = -this.speedX;
          this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x));
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
          this.speedY = -this.speedY;
          this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y));
        }
      }


      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
        particlesArray.length = 0;
        for (let i = 0; i < numParticles; i++) {
            particlesArray.push(new Particle());
        }
    };

    initParticles();

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleConfig]);

  return (
    <>
      {/* Debug indicator can be re-enabled if needed */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1, // <--- CHANGED zIndex to -1
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default ParticlesBackground;