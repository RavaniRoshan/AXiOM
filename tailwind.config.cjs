module.exports = {
  content: [
    './index.html',
    './App.tsx',
    './index.tsx',
    './*.{ts,tsx,js,jsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--bg-primary)',
        surface: 'var(--bg-surface)',
        border: 'var(--border-primary)',
        text: 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'accent-main': 'var(--accent-primary)',
        'accent-highlight': 'var(--accent-secondary)'
      },
      fontFamily: {
        signature: ['Dancing Script', 'cursive']
      }
    }
  },
  plugins: []
};
