/** Digilid brand tokens — Brand Guidelines v1.0 (July 2026) */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        coucal: '#8d5b3d',
        signal: '#ee2e2d',
        canvas: '#f2eee6',
        cloud: '#bdb6ac',
        slate: '#7a746c',
        parchment: '#ddd5cb',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        sora: ['Sora', 'Manrope', 'system-ui', 'sans-serif'],
      },
      maxWidth: { frame: '1440px' },
    },
  },
  plugins: [],
}
