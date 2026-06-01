/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Design tokens are defined as CSS variables in app/globals.css and
      // surfaced here so they're usable as Tailwind utilities (bg-bg, text-dim…).
      colors: {
        bg: 'var(--bg)',
        raised: 'var(--bg-raised)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        text: 'var(--text)',
        dim: 'var(--text-dim)',
        faint: 'var(--text-faint)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
