// Monoline icons drawn in the Digilid iconography style: one stroke weight,
// sharp joins and a single Signal-red accent (pixel or dot).
const R = '#ee2e2d'
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinejoin: 'miter',
  strokeLinecap: 'square',
}

const paths = {
  web: (
    <>
      <rect x="6" y="10" width="36" height="28" {...base} />
      <path d="M6 17h36" {...base} />
      <path d="M19 24l-4 4 4 4M29 24l4 4-4 4" {...base} />
      <rect x="9" y="12.5" width="3" height="2.5" fill={R} />
    </>
  ),
  personal: (
    <>
      <circle cx="24" cy="17" r="7" {...base} />
      <path d="M11 40c0-8 6-12 13-12s13 4 13 12" {...base} />
      <circle cx="35" cy="11" r="3" fill={R} />
    </>
  ),
  hosting: (
    <>
      <rect x="8" y="9" width="32" height="10" {...base} />
      <rect x="8" y="19" width="32" height="10" {...base} />
      <rect x="8" y="29" width="32" height="10" {...base} />
      <path d="M13 14h8M13 24h8M13 34h8" {...base} />
      <circle cx="34" cy="24" r="2.2" fill={R} />
    </>
  ),
  video: (
    <>
      <rect x="6" y="11" width="36" height="26" {...base} />
      <path d="M21 18v12l10-6z" {...base} />
      <rect x="37" y="7" width="5" height="5" fill={R} />
    </>
  ),
  ads: (
    <>
      <path d="M9 21v8l20 8V13z" {...base} />
      <path d="M14 31l3 8h5l-2-6" {...base} />
      <path d="M34 19l5-3M35 25h5M34 31l5 3" stroke={R} strokeWidth="1.8" strokeLinecap="square" />
    </>
  ),
  seo: (
    <>
      <circle cx="21" cy="21" r="12" {...base} />
      <path d="M30 30l10 10" {...base} />
      <circle cx="21" cy="21" r="4.5" fill={R} />
    </>
  ),
  social: (
    <>
      <path d="M6 8h24v16H17l-6 5v-5H6z" {...base} />
      <path d="M30 16h12v16h-5v5l-6-5H18v-8" {...base} />
      <rect x="22" y="22" width="10" height="5" fill={R} />
    </>
  ),
  design: (
    <>
      <path d="M10 38l2-8 20-20 6 6-20 20z" {...base} />
      <path d="M12 30l6 6M10 38l3-1" {...base} />
      <path d="M32 10l4-4 6 6-4 4z" fill={R} />
    </>
  ),
  curiosity: (
    <>
      <circle cx="21" cy="21" r="12" {...base} />
      <path d="M30 30l10 10" {...base} />
      <circle cx="21" cy="21" r="4.5" fill={R} />
    </>
  ),
  creativity: (
    <>
      <path d="M33 12H9v28h28V18" {...base} />
      <rect x="34" y="8" width="7" height="7" fill={R} />
    </>
  ),
  purpose: (
    <>
      <circle cx="22" cy="26" r="14" {...base} />
      <circle cx="22" cy="26" r="8" {...base} />
      <path d="M22 26L39 9M35 8l5-3-1 6" {...base} />
      <circle cx="22" cy="26" r="3.2" fill={R} />
    </>
  ),
  integrity: (
    <>
      <path d="M24 6l14 5v12c0 9-6 15-14 19-8-4-14-10-14-19V11z" {...base} />
      <circle cx="24" cy="22" r="4" fill={R} />
    </>
  ),
  collaboration: (
    <>
      <circle cx="13" cy="13" r="4" fill="currentColor" />
      <circle cx="35" cy="13" r="4" fill="currentColor" />
      <circle cx="24" cy="17" r="4" fill={R} />
      <path d="M6 38V27a7 7 0 0114 0v11M28 38V27a7 7 0 0114 0v11M17 40V31a7 7 0 0114 0v9" {...base} />
    </>
  ),
}

export default function Icon({ name, className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

export function Arrow({ className = 'h-4 w-6' }) {
  return (
    <svg viewBox="0 0 30 16" className={className} aria-hidden="true">
      <path d="M0 8h28M21 1l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}
