import React from 'react';
import { FiTerminal } from 'react-icons/fi'; // Import a terminal icon

// Add onToggleTerminal prop
const Footer = ({ onToggleTerminal }) => {

  const handleToggleClick = () => {
    // --- DEBUG LOG 4 ---
    console.log("Footer.js: Toggle button clicked. Calling onToggleTerminal.");
    if (typeof onToggleTerminal === 'function') {
        onToggleTerminal(); // Call the passed function
    } else {
        console.error("Footer.js: onToggleTerminal is not a function!", onToggleTerminal);
    }
  };

  return (
    // Updated background, border color
    <footer className="py-12 md:py-16 bg-card-bg border-t border-border-color/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          {/* Updated text color and add terminal toggle */}
          <div className="flex items-center gap-2 text-text-muted text-sm text-center md:text-left">
            <span>© {new Date().getFullYear()} Tom Green. All rights reserved.</span>
            {/* Terminal Toggle Button */}
            <button
              onClick={handleToggleClick} // Use the handler function
              aria-label="Toggle Terminal"
              title="Toggle Terminal"
              data-terminal-toggle // Add attribute to identify the button
              className="ml-2 text-text-muted  hover:text-interactive-accent animate-pulse"
            >
               <FiTerminal className="w-4 h-4 animate-pulse" />
            </button>
          </div>
          <div className="flex space-x-6">
            {/* Links... */}
            <a
              href="https://github.com/yourusername" // Replace
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-interactive transition-colors duration-300 text-sm"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/tomgreen33" // Replace
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-interactive transition-colors duration-300 text-sm"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;