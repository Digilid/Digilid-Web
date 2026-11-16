import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP, scrollToId } from '../gsap'
import { nav } from '../content'
import { Wordmark } from './Logo'
import Magnetic from './Magnetic'

export default function Navbar() {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)

  useGSAP(() => {
    const el = ref.current
    const show = gsap.quickTo(el, 'yPercent', { duration: 0.5, ease: 'power3.out' })
    let solid = false
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll()
        if (y > 140 && self.direction === 1) show(-140)
        else show(0)
        const s = y > 40
        if (s !== solid) {
          solid = s
          el.dataset.solid = s ? 'true' : 'false'
        }
      },
    })
    gsap.from(el, { yPercent: -140, duration: 1, ease: 'power3.out', delay: 0.2 })
  })

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header
      ref={ref}
      data-solid="false"
      className="group/nav fixed inset-x-0 z-50 px-4 pt-3 sm:px-6"
      style={{ top: 'env(safe-area-inset-top, 0px)' }}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-frame items-center justify-between rounded-full border border-transparent px-4 py-2.5 transition-[background-color,border-color,backdrop-filter] duration-500 group-data-[solid=true]/nav:border-[var(--hair-strong)] group-data-[solid=true]/nav:bg-ink/60 group-data-[solid=true]/nav:backdrop-blur-xl sm:px-5"
      >
        <a href="#top" onClick={(e) => go(e, 'top')} className="h-7 text-canvas" aria-label="Digilid home">
          <Wordmark className="h-7" />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={(e) => go(e, n.id)}
                className="rounded-full px-4 py-2 text-sm text-canvas/70 transition-colors hover:text-canvas"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Magnetic>
            <a
              href="#contact"
              onClick={(e) => go(e, 'contact')}
              className="hidden rounded-full bg-canvas px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-signal hover:text-canvas sm:inline-block"
            >
              Start a project
            </a>
          </Magnetic>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--hair-strong)] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 top-0 h-px w-4 bg-canvas transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
              <span className={`absolute bottom-0 left-0 h-px w-4 bg-canvas transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`glass mx-auto mt-2 max-w-frame overflow-hidden rounded-3xl transition-all duration-500 md:hidden ${open ? 'max-h-96 opacity-100' : 'pointer-events-none max-h-0 opacity-0'}`}
      >
        <ul className="p-3">
          {[...nav, { id: 'contact', label: 'Start a project' }].map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} onClick={(e) => go(e, n.id)} className="block rounded-2xl px-4 py-3 text-lg">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
