import { useRef } from 'react'
import { gsap, useGSAP } from '../gsap'
import { work } from '../content'
import card from '../assets/work-card.jpg'
import billboard from '../assets/work-billboard.jpg'
import tote from '../assets/work-tote.jpg'
import bottle from '../assets/work-bottle.jpg'
import grid from '../assets/work-grid.jpg'
import { Arrow } from './icons'

const images = { card, billboard, tote, bottle, grid }

export default function Portfolio() {
  const root = useRef(null)
  const track = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Desktop: pinned horizontal showcase.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const el = track.current
        const dist = () => el.scrollWidth - window.innerWidth
        const scroller = gsap.to(el, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => '+=' + dist(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1, // measured after the Services pin above it
          },
        })
        gsap.utils.toArray('.work-frame').forEach((f) => {
          gsap.fromTo(
            f.querySelector('img'),
            { scale: 1.35 },
            { scale: 1, ease: 'none', scrollTrigger: { trigger: f, containerAnimation: scroller, start: 'left right', end: 'center center', scrub: true } }
          )
          gsap.fromTo(
            f.querySelector('.work-tag'),
            { y: 40 },
            { y: -30, ease: 'none', scrollTrigger: { trigger: f, containerAnimation: scroller, start: 'left right', end: 'right left', scrub: true } }
          )
        })
        gsap.to('.work-progress', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: () => '+=' + dist(), scrub: true, refreshPriority: 1 },
        })
      })

    },
    { scope: root }
  )

  return (
    <section id="work" ref={root} className="relative overflow-hidden border-t border-[var(--hair)] motion-safe:h-[100svh]" aria-labelledby="work-title">
      <div className="absolute inset-x-0 bottom-0 hidden h-px bg-[var(--hair)] motion-safe:block">
        <div className="work-progress h-full origin-left scale-x-0 bg-signal" />
      </div>

      <div
        ref={track}
        className="flex flex-col gap-16 px-5 py-28 sm:px-8 motion-safe:h-full motion-safe:w-max motion-safe:flex-row motion-safe:items-center motion-safe:gap-[7vw] motion-safe:px-[7vw] motion-safe:py-0 lg:motion-safe:gap-[4vw] lg:motion-safe:px-[6vw]"
      >
        <div className="shrink-0 motion-safe:w-[78vw] sm:motion-safe:w-[50vw] lg:motion-safe:w-[30vw]">
          <p className="font-sora text-sm text-canvas/50">Selected work</p>
          <h2 id="work-title" className="mt-5 text-[clamp(2.75rem,5vw,5rem)] font-medium leading-[0.98] tracking-[-0.035em]">
            Ideas, made visible<span className="text-signal">.</span>
          </h2>
          <p className="mt-6 max-w-[34ch] leading-relaxed text-canvas/60">
            Identity, campaigns, content and the systems that hold them together.
          </p>
        </div>

        {work.map((w, i) => (
          <article
            key={w.title}
            data-case-cursor
            className={`work-frame group relative shrink-0 cursor-none motion-safe:w-[74vw] sm:motion-safe:w-[64vw] lg:motion-safe:w-[52vw] ${i % 2 ? 'motion-safe:mt-12 lg:motion-safe:mt-24' : 'motion-safe:-mt-8 lg:motion-safe:-mt-16'}`}
          >
            <a href="#contact" className="block focus-visible:outline-offset-8" aria-label={`View case: ${w.title}`}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] sm:aspect-[16/10] bg-[#1a1918] motion-safe:max-h-[52svh] lg:motion-safe:max-h-[62svh]">
                <img
                  src={images[w.img]}
                  alt={`${w.title}, ${w.tag.toLowerCase()} for Digilid`}
                  className="h-full w-full object-cover will-change-transform"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              </div>
              <span className="work-tag glass absolute -top-4 right-6 rounded-full px-4 py-2 text-sm text-canvas">{w.tag}</span>
              <div className="mt-5 flex items-baseline justify-between gap-6">
                <h3 className="text-xl font-semibold sm:text-2xl tracking-[-0.01em] transition-colors group-hover:text-signal">{w.title}</h3>
                <span className="flex items-center gap-3 font-sora text-sm text-canvas/50">
                  {w.year}
                  <Arrow className="arrow-nudge h-3 w-5 text-canvas" />
                </span>
              </div>
            </a>
          </article>
        ))}
        <div className="hidden w-[1px] shrink-0 motion-safe:block" aria-hidden="true" />
      </div>
    </section>
  )
}
