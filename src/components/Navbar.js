import React, { useState, useRef, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';
import ParticleControlsPopover from './ParticleControlsPopover';
import ThemeToggle from './ThemeToggle'; // Import the ThemeToggle

// Added theme and toggleTheme props
const Navbar = ({ particleSettings, onSettingsChange, theme, toggleTheme }) => {
  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ];

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  const togglePopover = () => setIsPopoverOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isPopoverOpen &&
        popoverRef.current && !popoverRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPopoverOpen]);

  return (
    // Uses bg-main and border-color vars, applied opacity
    <nav className="fixed top-0 left-0 right-0 bg-nav-bg backdrop-blur-4xl z-50">
      <div className="container mx-auto relative flex items-center h-16 px-4">

        {/* Centered Navigation Links - Absolutely centered */}
        <ul className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-6 md:space-x-10">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-text-secondary hover:text-text-primary px-2 py-2 text-sm rounded-md transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-interactive scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Right side Controls */}
        <div className="ml-auto flex items-center gap-4">
            {/* Theme Toggle uses props */}
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {/* Particle Settings Control */}
            <div className="relative">
            <button
                ref={buttonRef}
                onClick={togglePopover}
                aria-label="Particle Settings"
                aria-haspopup="true"
                aria-expanded={isPopoverOpen}
                 // Uses text-secondary, hover:text-primary, hover:bg-border-color
                className="text-text-secondary hover:text-text-primary p-2 rounded-full hover:bg-border-color/30 transition-colors duration-300"
            >
                <FiMenu className="w-5 h-5" />
            </button>

            {/* Popover component needs its own internal refactoring */}
            {isPopoverOpen && (
                <div ref={popoverRef}>
                    <ParticleControlsPopover
                    settings={particleSettings}
                    onSettingsChange={onSettingsChange}
                    onClose={() => setIsPopoverOpen(false)}
                    />
                </div>
            )}
            </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;