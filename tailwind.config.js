/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Bento / Dark Elegance Palette
        background: "#0A0A0A",
        surface: {
          DEFAULT: "#121212",
          highlight: "#1E1E1E",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(255, 255, 255, 0.20)",
        },
        primary: {
          text: "#E1E1E1",
          muted: "#A1A1A1",
        },
        // Pastels for accents/charts (Bento style)
        accent: {
          indigo: "#818cf8",
          purple: "#c084fc",
          rose: "#fb7185",
          emerald: "#34d399",
        },

        // Retaining some semantic mappings for compatibility if needed, but pointing to new system
        "md-primary-dark": "#E1E1E1", // Map to primary text
        "md-background-dark": "#0A0A0A", // Map to background
        "md-surface-dark": "#121212", // Map to surface
        "md-surface-2": "#1E1E1E", // Secondary surface
        "md-on-surface-dark": "#E1E1E1",
        "md-on-surface-variant-dark": "#A1A1A1",
        "md-outline-dark": "rgba(255, 255, 255, 0.08)",
        "md-error": "#f87171", // Error color for dark theme,

        // Category Mappings (Pastel/Muted)
        "category-work": "#818cf8", // Indigo 400
        "category-study": "#c084fc", // Purple 400
        "category-sport": "#34d399", // Emerald 400
        "category-personal": "#fb7185", // Rose 400
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"], // Prefer Inter if available
      },
      letterSpacing: {
        tight: "-0.02em",
      },
      borderRadius: {
        "3xl": "1.5rem", // For Bento cards
      },
      boxShadow: {
        bento:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "glow-subtle": "0 0 20px rgba(255, 255, 255, 0.03)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
