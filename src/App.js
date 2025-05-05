import React, { Suspense, lazy, useState, useCallback, useEffect } from 'react';
import ClientOnlyCursorFollower from './components/CursorFollower';
import ParticlesBackground from './components/ParticlesBackground';
import Navbar from './components/Navbar';
// Lazy Load other Components
const Header = lazy(() => import('./components/Header'));
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const Certifications = lazy(() => import('./components/Certifications'));
const TinyTerminal = lazy(() => import('./components/TinyTerminal')); // Lazy load Terminal

// Section Configuration (Unchanged)
const sections = [
  { component: About, id: 'about' },
  { component: Certifications, id: 'certifications' },
  { component: Projects, id: 'projects' },
  { component: Contact, id: 'contact' }
];

// Loading Fallback Component (Unchanged)
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    color: 'hsl(var(--color-text-primary-hsl))',
    fontSize: '1.5rem',
    backgroundColor: 'rgb(var(--color-bg-main-rgb))'
   }}>
    Loading Portfolio...
  </div>
);

// Theme Hook (Unchanged)
function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return [theme, toggleTheme];
}


function App() {
  // Particle Settings State (Unchanged)
  const [particleSettings, setParticleSettings] = useState({
    numberOfParticles: 70,
    speed: 1.2,
    colorTheme: 'bright'
  });
  const handleParticleSettingsChange = useCallback((newSettings) => {
    setParticleSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
  }, []);

  // Use the Theme Hook (Unchanged)
  const [theme, toggleTheme] = useTheme();

  // --- Terminal Visibility State ---
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const toggleTerminal = useCallback(() => {
    // --- DEBUG LOG 1 ---
    console.log("App.js: toggleTerminal called");
    setIsTerminalVisible(prev => {
        // --- DEBUG LOG 2 ---
        console.log("App.js: Updating isTerminalVisible from", prev, "to", !prev);
        return !prev;
    });
  }, []);


  return (
    <>
      <ParticlesBackground settings={particleSettings} />

      <div className="relative min-h-screen bg-transparent text-text-primary">

        <ClientOnlyCursorFollower />
         <Navbar
            particleSettings={particleSettings}
            onSettingsChange={handleParticleSettingsChange}
            theme={theme}
            toggleTheme={toggleTheme}
          />

        <Suspense fallback={<LoadingFallback />}>
          <div className="relative">
            <Header />
            <main>
              {sections.map((section, index) => {
                const Component = section.component;
                const sectionBgColor = index % 2 === 0
                  ? `rgba(var(--color-section-bg-1-rgb), var(--opacity-section-bg-1))`
                  : `rgba(var(--color-section-bg-2-rgb), var(--opacity-section-bg-2))`;

                return (
                  <section
                    key={section.id}
                    id={section.id}
                    className={`py-24 md:py-32 overflow-hidden relative`}
                    style={{ backgroundColor: sectionBgColor }}
                  >
                    <Component />
                  </section>
                );
              })}
            </main>
            {/* Pass the toggle function to Footer */}
            <Footer onToggleTerminal={toggleTerminal} />
          </div>
          {/* --- DEBUG LOG 3 --- */}
          {console.log("App.js: Rendering check - isTerminalVisible:", isTerminalVisible)}
          {/* Render TinyTerminal conditionally */}
          <TinyTerminal isVisible={isTerminalVisible} onClose={toggleTerminal} />
        </Suspense>
      </div>
    </>
  );
}

export default App;