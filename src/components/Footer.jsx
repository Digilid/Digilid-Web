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
      <div className="relative mx-auto flex w-full max-w-frame flex-1 flex-col px-5 pt-24 sm:px-8">
        <div className="flex flex-1 flex-col justify-center">
          <p className="font-sora text-sm text-canvas/50">Have a brand worth building?</p>
          <h2 className="mt-5 text-[clamp(3.25rem,min(9.5vw,17svh),10rem)] font-light leading-[0.88] tracking-[-0.05em]">
            {footer.headline[0]} {footer.headline[1]}
            <br />
            that <span className="text-signal">lead.</span>
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Magnetic strength={0.4}>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group inline-flex items-center gap-4 rounded-full bg-signal px-9 py-5 text-lg font-semibold text-canvas transition-colors hover:bg-canvas hover:text-ink"
              >
                {footer.cta}
                <Arrow className="arrow-nudge h-4 w-6" />
              </a>
            </Magnetic>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg text-canvas/70 underline decoration-[var(--hair-strong)] underline-offset-8 transition-colors hover:text-canvas hover:decoration-signal">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-10 border-t border-[var(--hair)] py-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Wordmark tagline className="h-14 text-canvas" />
          </div>
          {footer.columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="font-sora text-sm text-canvas/45">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} onClick={(e) => go(e, href)} className="text-canvas/80 transition-colors hover:text-signal">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <p className="font-sora text-sm text-canvas/45">Follow</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {footer.socials.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="inline-block rounded-full border border-[var(--hair-strong)] px-4 py-2 text-sm text-canvas/80 transition-colors hover:border-signal hover:text-canvas">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-[var(--hair)]">
        <div className="mx-auto grid max-w-frame grid-cols-1 text-sm text-canvas/45 sm:grid-cols-3">
          <p className="px-5 py-5 sm:px-8">© {new Date().getFullYear()} Digilid. All rights reserved.</p>
          <p className="border-[var(--hair)] px-5 py-5 sm:border-x sm:px-8">Curious by nature. Creative by instinct.</p>
          <p className="px-5 py-5 sm:px-8 sm:text-right">
            <a href="#top" onClick={(e) => go(e, '#top')} className="transition-colors hover:text-canvas">
              Back to top
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
})

export default Footer
