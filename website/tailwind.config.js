/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'var(--color-bg-primary)',
          bgSec: 'var(--color-bg-secondary)',
          bgTert: 'var(--color-bg-tertiary)',
          footer: 'var(--color-bg-footer)',
          surface: 'var(--color-surface)',
          surfaceHover: 'var(--color-surface-hover)',
          text: 'var(--color-text-primary)',
          textSec: 'var(--color-text-secondary)',
          textMuted: 'var(--color-text-muted)',
          brand: 'var(--color-brand)',
          brandHover: 'var(--color-brand-hover)',
          brandLight: 'var(--color-brand-light)',
          lime: 'var(--color-accent-lime)',
          limeHover: 'var(--color-accent-lime-hover)',
          mint: 'var(--color-accent-mint)',
          accentSoft: 'var(--color-accent-soft)',
          border: 'var(--color-border)',
          borderSubtle: 'var(--color-border-subtle)',
          borderHover: 'var(--color-border-hover)',
        },
        servon: {
          bg: "#0B0F19",
          card: "#111827",
          cardHover: "#1F2937",
          border: "rgba(255, 255, 255, 0.08)",
          cyan: "#0EA5E9",
          cyanHover: "#0284C7",
          emerald: "#10B981",
          text: "#F9FAFB",
          muted: "#9CA3AF"
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
