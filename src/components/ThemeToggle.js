import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi'; // Icons for light/dark

// Removed the entire unused 'ThemeToggle' component definition that was here.

// More robust Framer Motion Toggle (using layout prop)
const FramerThemeToggle = ({ theme, toggleTheme }) => {
    const isLight = theme === 'light';

    // Spring animation for the handle (used in motion.div)
    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
      };

    return (
        // The switch container div
        <div
            // Dynamic background color based on theme state
            className={`flex h-6 w-11 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-300 ease-in-out ${
                isLight ? 'justify-end bg-interactive-accent' : 'justify-start bg-border-color'
            }`}
            onClick={toggleTheme}
            aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            role="switch"
            aria-checked={isLight}
            tabIndex={0} // Make it keyboard focusable
            onKeyPress={(e) => { // Allow activation with Enter key
                if (e.key === 'Enter' || e.key === ' ') {
                    toggleTheme();
                }
            }}
        >
            {/* The animated handle */}
            <motion.div
                className="flex h-5 w-5 items-center justify-center rounded-full bg-bg-main shadow-md"
                layout // Enable smooth layout animation when position changes
                transition={spring} // Apply the spring physics
            >
                 {/* Icon inside handle, changes based on theme */}
                {isLight
                    ? <FiSun className="h-3 w-3 text-text-primary" />
                    : <FiMoon className="h-3 w-3 text-text-primary" />
                }
            </motion.div>
        </div>
    );
};


export default FramerThemeToggle; // Export the used component