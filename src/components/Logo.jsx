import wordmark from '../assets/wordmark.svg?raw'
import lockup from '../assets/lockup.svg?raw'

// Vector artwork extracted from the Digilid brand guide. Ink parts use currentColor,
// so the mark reads in Canvas on dark backgrounds, as on the guide’s cover.
export function Wordmark({ className = '', tagline = false, label = 'Digilid' }) {
  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-block [&>svg]:block [&>svg]:h-full [&>svg]:w-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: tagline ? lockup : wordmark }}
    />
  )
}
