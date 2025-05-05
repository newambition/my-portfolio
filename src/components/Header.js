import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDownCircle } from "react-icons/fi";

const phrases = [
  "Python Developer.",
  "AI Enthusiast.",
  "Problem Solver.",
  "Your Next Hire.",
  "Hidden Tiny Terminal."
];

const wordContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};
const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12, duration: 0.8 }
  }
};


const Header = () => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const TYPING_SPEED = 85;
  const DELETING_SPEED = 50;
  const PAUSE_DURATION = 1500;

  useEffect(() => {
    let timer;
    const currentPhrase = phrases[phraseIndex];

    const handleTyping = () => {
      setText(
        isDeleting
          ? currentPhrase.substring(0, text.length - 1)
          : currentPhrase.substring(0, text.length + 1)
      );

      if (!isDeleting && text === currentPhrase) {
        timer = setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    };

    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);

  }, [text, isDeleting, phraseIndex]);

  const headingText = "Hello, I'm Tom Green,";
  const headingWords = headingText.split(' ');


  return (
    // Updated main text color (should inherit from body via App.js)
    <header className="relative h-screen flex items-center justify-center text-center text-text-primary overflow-hidden px-4">
      <div className="container mx-auto max-w-4xl">

        {/* H1 uses text-primary implicitly */}
        <motion.h1
          className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold mb-6 md:mb-8"
          variants={wordContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {headingWords.map((word, index) => (
            <motion.span key={`${word}-${index}`} variants={wordVariants} style={{ display: 'inline-block', marginRight: '0.25em' }}>
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Updated paragraph text color, caret border color */}
        <p className="font-mono text-xl md:text-2xl lg:text-3xl text-text-secondary min-h-[1.5em] mb-12 md:mb-16">
          {/* Use interactive color for the caret */}
          <span className="border-r-2 border-interactive pr-1 animate-blink-caret"> {/* Added animation class */}
            {text}
          </span>
        </p>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <a
            href="#about"
            aria-label="Scroll down to About section"
             // Updated arrow base color, hover color, icon color
            className="text-text-muted hover:text-interactive transition-colors duration-300 text-3xl md:text-4xl animate-bounce p-4"
          >
             {/* Use interactive accent color for the arrow icon itself */}
            <FiArrowDownCircle className="w-10 h-10 text-interactive-accent"/>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;