/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      colors: { // Add your custom color palette here
        primary: '#6366f1',       // A nice primary purple/indigo
        secondary: '#a8b0cf',     // A softer secondary color
        accent: '#f472b6',        // Pink accent for highlights
        background: '#f0f2f5',   // Light background for overall feel
        textPrimary: '#334155',    // Darker text for readability
        textSecondary: '#64748b',  // Lighter text for less important info
      },
    },
  },
  plugins: [],
};