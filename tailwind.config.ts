import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'tapps-black': '#070709',
        'tapps-light-black': '#131315',
        'tapps-lighter-black': '#232627',
        'tapps-white': '#FBF7F7',
        'tapps-purple': '#CAC6EC',
        'tapps-hard-purple': '#5B31FE',
        'tapps-blue': '#1C77FF',
        'tapps-gray': '#848486',
      },
      backgroundImage: {
        'frame-1': "url('/frames/frame-1.png')",
        'gradient-custom': 'linear-gradient(to bottom right, #FD6202, #00E8DC)',
        'firefly-radial':
          'radial-gradient(circle, rgba(91, 49, 254, 0.4) 20%, rgba(91, 49, 254, 0) 52%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
