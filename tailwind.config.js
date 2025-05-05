/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // darkMode: 'class', // Enable this if you want to use dark: prefixes manually alongside variables (optional)
  theme: {
    extend: {
      colors: {
        // Use rgb vars for backgrounds/borders where alpha might be needed
        // Tailwind automatically handles the alpha modifier (e.g. /80) with rgb() vars
        'bg-main': 'rgb(var(--color-bg-main-rgb))',
        'card-bg': 'rgb(var(--color-card-bg-rgb))',
        'nav-bg': 'rgb(var(--color-nav-bg-rgb))',
        'border-color': 'rgb(var(--color-border-rgb))', // For border utility, e.g., border-border-color
        'section-bg-1': 'rgb(var(--color-section-bg-1-rgb))',
        'section-bg-2': 'rgb(var(--color-section-bg-2-rgb))',
        

        // Use hsl vars for text/interactive elements for easier definition
        'text-primary': 'hsl(var(--color-text-primary-hsl))',
        'text-secondary': 'hsl(var(--color-text-secondary-hsl))',
        'text-muted': 'hsl(var(--color-text-muted-hsl))',
        'interactive': 'hsl(var(--color-interactive-hsl))',
        'interactive-accent': 'hsl(var(--color-interactive-accent-hsl))',
      },
      fontFamily: { // Keep existing fonts
        'display': ['Cal Sans', 'sans-serif'],
        'heading': ['Fraunces', 'sans-serif'],
        'body': ['Poppins', 'sans-serif'],
        'mono': ['Courier New', 'monospace'],
      },
      animation: { // Keep existing animations
        'blink-caret': 'blink-caret .75s step-end infinite',
        'float-up': 'float-up 20s linear infinite',
        'rainbow-border': 'rainbow-bg-position 3s linear infinite',
      },
      keyframes: { // Keep existing keyframes
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
           // Use CSS var for caret color consistency
          '50%': { borderColor: 'hsl(var(--color-interactive-hsl))' },
        },
        'float-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' }
        },
        'rainbow-bg-position': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      backgroundSize: { // Keep existing backgroundSize
        '400%': '400% 400%',
      }
    },
  },
  plugins: [
      // require('@tailwindcss/forms'), // Uncomment if you need form styling resets
  ],
}