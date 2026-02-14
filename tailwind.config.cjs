module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
    './*.{ts,tsx,js,jsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Legacy Variables (Keep for Waitlist/WIP pages)
        surface: 'var(--bg-surface)',
        border: 'var(--border-primary)',
        text: 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'accent-main': 'var(--accent-primary)',
        'accent-highlight': 'var(--accent-secondary)',

        // New Design System
        primary: "#3B82F6", // Electric Blue (Overwrites legacy primary if name conflicts, but legacy was var(--bg-primary))
        accent: "#60A5FA",
        dark: {
            DEFAULT: "#0A0A0B",
            card: "#121214",
            border: "#1F2023",
            muted: "#262626"
        }
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        sans: ["IBM Plex Sans", "sans-serif"], // Overrides default sans
        mono: ["IBM Plex Mono", "monospace"], // Overrides default mono
        signature: ['Dancing Script', 'cursive']
      },
      borderRadius: {
        'xs': '0.125rem',
        'sm': '0.25rem',
        DEFAULT: '0.375rem',
      },
    }
  },
  plugins: []
};
