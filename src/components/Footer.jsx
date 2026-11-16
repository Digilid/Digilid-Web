import { forwardRef } from 'react'
import { footer, CONTACT_EMAIL } from '../content'
import { Wordmark } from './Logo'
import Magnetic from './Magnetic'
import { Arrow } from './icons'
import { scrollToId } from '../gsap'

const Footer = forwardRef(function Footer({ reveal }, ref) {
  const go = (e, href) => {
    if (!href.startsWith('#') || href === '#') return
    e.preventDefault()
    scrollToId(href.slice(1))
  }
  return (
    <footer
      id="contact"
      ref={ref}
      className={`${reveal ? 'fixed inset-x-0 bottom-0 z-0' : 'relative z-10'} flex min-h-[100svh] flex-col bg-ink`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto flex w-full max-w-frame flex-1 flex-col px-5 pt-16 sm:pt-24 sm:px-8">
        <div className="flex flex-1 flex-col justify-center py-6 sm:py-0">
          <p className="font-sora text-xs sm:text-sm text-canvas/50">Have a brand worth building?</p>
          <h2 className="mt-4 text-[clamp(2.5rem,8vw,9rem)] font-light leading-[0.92] tracking-[-0.04em] sm:mt-5 sm:leading-[0.88] sm:tracking-[-0.05em] break-words">
            {footer.headline[0]} {footer.headline[1]}
            <br />
            that <span className="text-signal">lead.</span>
          </h2>
          <div className="mt-8 sm:mt-10">
            <Magnetic strength={0.4} className="w-full sm:w-auto">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 sm:gap-4 rounded-full bg-signal px-7 sm:px-9 py-4 sm:py-5 text-base sm:text-lg font-semibold text-canvas transition-colors hover:bg-canvas hover:text-ink"
              >
                {footer.cta}
                <Arrow className="arrow-nudge h-4 w-6" />
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-[var(--hair)] py-8 sm:gap-10 sm:py-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Wordmark tagline className="h-12 sm:h-14 text-canvas" />
          </div>
          {footer.columns.map((c) => (
            <nav key={c.title} aria-label={c.title} className="col-span-1">
              <p className="font-sora text-xs sm:text-sm font-medium uppercase tracking-wider text-canvas/45">{c.title}</p>
              <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-2.5">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} onClick={(e) => go(e, href)} className="text-sm sm:text-base text-canvas/80 transition-colors hover:text-signal">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="col-span-2 md:col-span-1">
            <p className="font-sora text-xs sm:text-sm font-medium uppercase tracking-wider text-canvas/45">Follow</p>
            <ul className="mt-3 sm:mt-4 flex flex-wrap gap-2">
              {footer.socials.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-block rounded-full border border-[var(--hair-strong)] px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-canvas/80 transition-colors hover:border-signal hover:text-canvas"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-[var(--hair)]">
        <div className="mx-auto max-w-frame px-5 py-5 text-xs sm:text-sm text-canvas/45 sm:px-8">
          <p>© {new Date().getFullYear()} Digilid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
})

export default Footer
