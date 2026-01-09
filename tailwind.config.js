/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Material Design 3 Colors - Light
        'md-primary': 'var(--md-sys-color-primary)',
        'md-on-primary': 'var(--md-sys-color-on-primary)',
        'md-primary-container': 'var(--md-sys-color-primary-container)',
        'md-on-primary-container': 'var(--md-sys-color-on-primary-container)',
        
        'md-secondary': 'var(--md-sys-color-secondary)',
        'md-on-secondary': 'var(--md-sys-color-on-secondary)',
        'md-secondary-container': 'var(--md-sys-color-secondary-container)',
        'md-on-secondary-container': 'var(--md-sys-color-on-secondary-container)',
        
        'md-tertiary': 'var(--md-sys-color-tertiary)',
        'md-on-tertiary': 'var(--md-sys-color-on-tertiary)',
        'md-tertiary-container': 'var(--md-sys-color-tertiary-container)',
        'md-on-tertiary-container': 'var(--md-sys-color-on-tertiary-container)',
        
        'md-error': 'var(--md-sys-color-error)',
        'md-on-error': 'var(--md-sys-color-on-error)',
        'md-error-container': 'var(--md-sys-color-error-container)',
        'md-on-error-container': 'var(--md-sys-color-on-error-container)',
        
        'md-background': 'var(--md-sys-color-background)',
        'md-on-background': 'var(--md-sys-color-on-background)',
        'md-surface': 'var(--md-sys-color-surface)',
        'md-on-surface': 'var(--md-sys-color-on-surface)',
        'md-surface-variant': 'var(--md-sys-color-surface-variant)',
        'md-on-surface-variant': 'var(--md-sys-color-on-surface-variant)',
        'md-outline': 'var(--md-sys-color-outline)',
        'md-outline-variant': 'var(--md-sys-color-outline-variant)',
        
        // Dark Theme
        'md-primary-dark': 'var(--md-sys-color-primary-dark)',
        'md-on-primary-dark': 'var(--md-sys-color-on-primary-dark)',
        'md-primary-container-dark': 'var(--md-sys-color-primary-container-dark)',
        'md-on-primary-container-dark': 'var(--md-sys-color-on-primary-container-dark)',
        
        'md-secondary-dark': 'var(--md-sys-color-secondary-dark)',
        'md-on-secondary-dark': 'var(--md-sys-color-on-secondary-dark)',
        'md-secondary-container-dark': 'var(--md-sys-color-secondary-container-dark)',
        'md-on-secondary-container-dark': 'var(--md-sys-color-on-secondary-container-dark)',
        
        'md-background-dark': 'var(--md-sys-color-background-dark)',
        'md-surface-dark': 'var(--md-sys-color-surface-dark)',
        'md-surface-variant-dark': 'var(--md-sys-color-surface-variant-dark)',
        'md-on-surface-dark': 'var(--md-sys-color-on-surface-dark)',
        'md-on-surface-variant-dark': 'var(--md-sys-color-on-surface-variant-dark)',
        'md-outline-dark': 'var(--md-sys-color-outline-dark)',
        
        // Category Colors
        'category-work': 'var(--category-work)',
        'category-study': 'var(--category-study)',
        'category-sport': 'var(--category-sport)',
        'category-personal': 'var(--category-personal)',
        
        // Semantic Colors
        'surface-1': 'var(--md-sys-color-surface-dark)',
        'surface-2': '#1E1E1E',
        'surface-3': '#232323',
        'surface-4': '#272727',
        'surface-5': '#2C2C2C',
      },
      fontFamily: {
        'google': ['Google Sans', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'roboto': ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        'md-sm': 'var(--md-shape-corner-small)',
        'md': 'var(--md-shape-corner-medium)',
        'md-lg': 'var(--md-shape-corner-large)',
        'md-xl': 'var(--md-shape-corner-extra-large)',
        'md-full': 'var(--md-shape-corner-full)',
      },
      boxShadow: {
        'md-1': 'var(--md-elevation-1)',
        'md-2': 'var(--md-elevation-2)',
        'md-3': 'var(--md-elevation-3)',
        'md-4': 'var(--md-elevation-4)',
        'md-5': 'var(--md-elevation-5)',
        'md-fab': '0 6px 10px 4px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.3)',
      },
      transitionTimingFunction: {
        'md-standard': 'cubic-bezier(0.2, 0.0, 0, 1.0)',
        'md-decelerate': 'cubic-bezier(0.0, 0.0, 0.2, 1.0)',
        'md-accelerate': 'cubic-bezier(0.4, 0.0, 1, 1.0)',
      },
      transitionDuration: {
        'md-short': '200ms',
        'md-medium': '400ms',
        'md-long': '500ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      letterSpacing: {
        'md-label': '0.5px',
      },
    },
  },
  plugins: [],
}
