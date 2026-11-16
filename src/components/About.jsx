import { useRef } from 'react'
import { gsap, useGSAP } from '../gsap'
import { about } from '../content'
import Icon from './icons'

export default function About() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Scrubbed highlight across the philosophy statement.
        gsap.to('.fill-text', {
          backgroundPosition: '0% 0',
          ease: 'none',
          scrollTrigger: { trigger: '.philosophy', start: 'top 80%', end: 'bottom 35%', scrub: true },
        })
        gsap.utils.toArray('.mission-card').forEach((card) => {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          })
        })
        gsap.from('.value', {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.values', start: 'top 85%' },
        })
      })
    },
    { scope: root }
  )

  return (
    <section id="about" ref={root} className="relative border-t border-[var(--hair)]" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-frame grid-cols-1 gap-14 px-5 py-28 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:py-40">
        {/* Sticky story column */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="font-sora text-sm text-canvas/50">About Digilid</p>
            <h2 id="about-title" className="mt-6 text-[clamp(2.5rem,4.6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.03em]">
              {about.heading[0]}
              <br />
              <span className="text-signal">{about.heading[1]}</span>
            </h2>
            <p className="mt-8 max-w-[38ch] text-lg leading-relaxed text-canvas/65">{about.story}</p>
            <div className="mt-10 flex items-center gap-4 text-sm text-canvas/45">
              <span className="h-3 w-3 bg-signal" />
              <span>We observe. We think. We create. We move ideas that make an impact.</span>
            </div>
          </div>
        </div>

        {/* Scrolling column */}
        <div className="lg:col-span-7">
          <p className="philosophy text-[clamp(1.75rem,3.2vw,2.9rem)] font-light leading-[1.18] tracking-[-0.02em]">
            <span className="fill-text">{about.philosophy}</span>
          </p>

          <div className="mt-20 grid gap-4 sm:grid-cols-2">
            {about.cards.map((c, i) => (
              <article
                key={c.title}
                className={`mission-card group relative overflow-hidden rounded-[22px] border border-[var(--hair)] bg-[rgba(242,238,230,0.02)] p-7 transition-colors duration-500 hover:border-[var(--hair-strong)] ${i % 2 ? 'sm:translate-y-8' : ''}`}
              >
                <span className="absolute right-6 top-6 h-2.5 w-2.5 bg-signal transition-transform duration-500 group-hover:scale-150" />
                <h3 className="text-xl font-semibold">{c.title}</h3>
                <p className="mt-4 leading-relaxed text-canvas/60">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Core values strip */}
      <div className="values border-y border-[var(--hair)]">
        <ul className="mx-auto grid max-w-frame grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {about.values.map((v) => (
            <li
              key={v.key}
              className="value group border-[var(--hair)] px-6 py-10 text-center [&:not(:last-child)]:border-r max-lg:border-b"
            >
              <span className="icon-ring mx-auto grid h-16 w-16 place-items-center rounded-full text-canvas">
                <Icon name={v.key} className="h-8 w-8" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
              <p className="mx-auto mt-2 max-w-[22ch] text-sm text-canvas/50">{v.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
