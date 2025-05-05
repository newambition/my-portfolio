import React from 'react';
import { FiX } from 'react-icons/fi'; // Close icon

const ParticleControlsPopover = ({ settings, onSettingsChange, onClose }) => {

  const handleRangeChange = (event) => {
    const { name, value } = event.target;
    onSettingsChange({ [name]: parseFloat(value) });
  };

  const handleThemeChange = (event) => {
    onSettingsChange({ colorTheme: event.target.value });
  };

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div
      // Updated popover styles: bg, border, text
      className="absolute top-full right-0 mt-2 w-auto bg-card-bg rounded-lg shadow-xl border border-border-color p-6 z-60 text-text-secondary text-sm" // Base text secondary
      onClick={stopPropagation}
      role="dialog"
      aria-label="Particle Settings Controls"
    >
      {/* Popover Header - Updated border, heading text, button colors */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-border-color/30">
        <h4 className="font-semibold font-body text-md text-text-primary">Particle Controls</h4>
        <button
          onClick={onClose}
          aria-label="Close particle settings"
           // Updated button colors
          className="text-text-muted hover:text-interactive transition-colors duration-300"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Number of Particles Control */}
        <div>
           {/* Updated label color */}
          <label htmlFor="numberOfParticles" className="block mb-1 font-medium text-text-secondary">
            Number ({settings.numberOfParticles})
          </label>
           {/* Updated range input styles: bg, accent */}
          <input
            type="range"
            id="numberOfParticles"
            name="numberOfParticles"
            min="10"
            max="300"
            step="5"
            value={settings.numberOfParticles}
            onChange={handleRangeChange}
            className="w-full h-2 bg-slider-bg rounded-lg appearance-none cursor-pointer" // Use accent color
          />
        </div>

        {/* Speed Control */}
        <div>
           {/* Updated label color */}
          <label htmlFor="speed" className="block mb-1 font-medium text-text-secondary">
            Speed ({settings.speed.toFixed(1)})
          </label>
           {/* Updated range input styles: bg, accent */}
          <input
            type="range"
            id="speed"
            name="speed"
            min="0.1"
            max="5.0"
            step="0.1"
            value={settings.speed}
            onChange={handleRangeChange}
            className="w-full h-2 bg-slider-bg rounded-lg appearance-none cursor-pointer" // Use accent color
          />
        </div>

        {/* Color Theme Control */}
        <div>
           {/* Updated label color */}
          <label className="block mb-2 font-medium text-text-secondary">Color Theme</label>
          <div className="particle-radio-group">
            {['bright', 'pastel', 'monochrome'].map(theme => (
              <label key={theme} className="particle-radio-label cursor-pointer">
                <input
                  type="radio"
                  name="colorTheme"
                  value={theme}
                  checked={settings.colorTheme === theme}
                  onChange={handleThemeChange}
                  className="particle-radio-input form-radio h-4 w-4 text-interactive-accent bg-card-bg border-border-color/80 focus:ring-interactive-accent focus:ring-offset-card-bg transition duration-150 ease-in-out accent-interactive-accent"
                />
                <span className="capitalize text-text-secondary">{theme}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticleControlsPopover;