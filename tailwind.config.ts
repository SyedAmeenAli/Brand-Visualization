import type { Config } from 'tailwindcss';

// Colours resolve to CSS variables defined in src/styles/tokens.css (values extracted from the Figma Brand Foundation).
const v = (n: string) => `rgb(var(--${n}) / <alpha-value>)`;

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: v('bg'), 'bg-2': v('bg-2'), surface: v('surface'), elevated: v('elevated'),
        ink: v('text'), 'ink-2': v('text-2'), 'ink-3': v('text-3'),
        line: v('border'), 'line-soft': v('border-soft'),
        brand: v('brand'), 'brand-deep': v('brand-deep'), accent: v('accent'), ivory: v('ivory'),
        success: v('success'), warning: v('warning'), error: v('error'), info: v('info'), disabled: v('disabled'),
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
      },
      borderRadius: { none: '0', sm: '4px', md: '8px', lg: '12px', xl: '16px', '2xl': '20px', hero: '24px' },
      transitionTimingFunction: { aq: 'cubic-bezier(0.2, 0, 0, 1)' },
    },
  },
  plugins: [],
};
export default config;
