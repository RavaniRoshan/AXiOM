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
        // AXIOM-ONE paper theme (design lock)
        paper: '#F9F8F4',
        ink: '#111111',
        surface: '#FFFFFF',
        'teal-success': '#0F766E',
        'error-red': '#B91C1C',
        'trace-blue': '#4F46E5',
        'border-std': '#E5E5E5',
        muted: '#888888',
        // Legacy Variables (Keep for archived pages)
        'bg-surface': 'var(--bg-surface)',
        'border-primary': 'var(--border-primary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'accent-primary': 'var(--accent-primary)',
        'accent-secondary': 'var(--accent-secondary)',
        primary: "#3B82F6",
        accent: "#60A5FA",
        dark: {
            DEFAULT: "#0A0A0B",
            card: "#121214",
            border: "#1F2023",
            muted: "#262626"
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ["Inter", "sans-serif"],
        signature: ['Dancing Script', 'cursive']
      },
      boxShadow: {
        hard: '4px 4px 0px rgba(0,0,0,0.1)',
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
