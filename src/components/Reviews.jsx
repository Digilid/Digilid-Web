import { useRef } from 'react'
import { gsap, Draggable, useGSAP } from '../gsap'
import { reviews, marquee } from '../content'
import { Arrow } from './icons'

const initials = (s) => s.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

function Quote({ r, big }) {
  return (
    <article
      className={`rev-card relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] border border-[var(--hair)] bg-[#161615] p-7 ${big ? 'w-[min(82vw,460px)]' : 'w-[min(78vw,360px)]'}`}
    >
      <span aria-hidden="true" className="pointer-events-none absolute -top-6 right-4 font-sora text-[9rem] font-medium leading-none text-signal/90">
        “
      </span>
      <blockquote className={`relative pr-10 font-light leading-snug tracking-[-0.01em] ${big ? 'text-[1.6rem]' : 'text-xl'}`}>
        {r.quote}
      </blockquote>
      <div className="mt-8">
        {big && (
          <div className="mb-6 flex items-end gap-3 border-t border-[var(--hair)] pt-5">
            <span className="text-5xl font-semibold tracking-[-0.03em]">{r.metric}</span>
            <span className="mb-1.5 max-w-[16ch] text-sm leading-tight text-canvas/55">{r.metricLabel}</span>
          </div>
        )}
        <footer className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-coucal font-sora text-sm text-canvas">{initials(r.name)}</span>
          <span>
            <span className="block font-semibold">{r.name}</span>
            <span className="block text-sm text-canvas/50">{r.role}</span>
          </span>
        </footer>
      </div>
    </article>
  )
}

function Metric({ r }) {
  return (
    <article className="rev-card flex h-full w-[min(78vw,360px)] flex-col justify-between rounded-[22px] bg-canvas p-7 text-ink">
      <span className="h-3 w-3 bg-signal" />
      <div>
        <p className="text-[4.5rem] font-semibold leading-none tracking-[-0.04em]">{r.metric}</p>
        <p className="mt-3 text-ink/65">
          {r.metricLabel}, {r.role.toLowerCase()}
        </p>
      </div>
    </article>
  )
}

export default function Reviews() {
  const root = useRef(null)
  const wrap = useRef(null)
  const track = useRef(null)
  const drag = useRef(null)

  useGSAP(
    () => {
      drag.current = Draggable.create(track.current, {
        type: 'x',
        bounds: wrap.current,
        inertia: true,
        edgeResistance: 0.85,
        cursor: 'grab',
        activeCursor: 'grabbing',
        allowContextMenu: true,
      })[0]

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.rev-card', {
          rotationX: -80,
          y: 60,
          opacity: 0,
          transformOrigin: '50% 0%',
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.09,
          scrollTrigger: { trigger: wrap.current, start: 'top 82%' },
        })
      })
      return () => drag.current?.kill()
    },
    { scope: root }
  )

  const nudge = (dir) => {
    const d = drag.current
    if (!d) return
    d.update()
    const step = Math.min(420, wrap.current.offsetWidth * 0.8)
    const x = gsap.utils.clamp(d.minX, d.maxX, d.x - dir * step)
    gsap.to(track.current, { x, duration: 0.8, ease: 'power3.out', onUpdate: () => d.update() })
  }

  // Bento columns: a tall quote, then a quote stacked over a metric.
  const cols = reviews.map((r, i) =>
    i % 2 === 0 ? (
      <div key={i} className="row-span-2">
        <Quote r={r} big />
      </div>
    ) : (
      [
        <div key={`${i}a`}>
          <Quote r={r} />
        </div>,
        <div key={`${i}b`}>
          <Metric r={r} />
        </div>,
      ]
    )
  )

  return (
    <section id="reviews" ref={root} className="relative overflow-hidden border-t border-[var(--hair)] py-28 lg:py-36" aria-labelledby="reviews-title">
      {/* Marquee */}
      <div className="relative overflow-hidden border-y border-[var(--hair)] py-6" aria-hidden="true">
        <div className="marquee-track flex w-max">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {marquee.map((m) => (
                <span key={m + k} className="flex items-center whitespace-nowrap text-[clamp(2.25rem,5vw,4.5rem)] font-light tracking-[-0.03em]">
                  <span className="px-8">{m}</span>
                  <span className="h-4 w-4 bg-signal" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 flex max-w-frame flex-wrap items-end justify-between gap-8 px-5 sm:px-8">
        <div>
          <p className="font-sora text-sm text-canvas/50">Client reviews</p>
          <h2 id="reviews-title" className="mt-5 max-w-[16ch] text-[clamp(2.5rem,4.6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.03em]">
            What it’s like to work with us<span className="text-signal">.</span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="mr-2 hidden text-sm text-canvas/45 sm:inline">Drag to explore</span>
          <button type="button" onClick={() => nudge(-1)} className="group grid h-12 w-12 place-items-center rounded-full border border-[var(--hair-strong)] transition-colors hover:border-canvas" aria-label="Previous reviews">
            <Arrow className="h-3 w-5 rotate-180" />
          </button>
          <button type="button" onClick={() => nudge(1)} className="group grid h-12 w-12 place-items-center rounded-full border border-[var(--hair-strong)] transition-colors hover:border-canvas" aria-label="Next reviews">
            <Arrow className="arrow-nudge h-3 w-5" />
          </button>
        </div>
      </div>

      <div ref={wrap} className="relative mx-auto mt-12 max-w-frame overflow-hidden [perspective:1400px]">
        <div ref={track} className="grid w-max auto-cols-max grid-flow-col grid-rows-[260px_260px] gap-4 px-5 sm:grid-rows-[280px_280px] sm:px-8">
          {cols}
        </div>
      </div>
    </section>
  )
}
