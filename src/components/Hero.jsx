import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, reducedMotion, scrollToId } from '../gsap'
import { hero, process } from '../content'
import Magnetic from './Magnetic'
import { Arrow } from './icons'

// A sparse field of cubes with one Signal-red cube, after the Mission & Vision artwork.
const S = 58
const field = [
  [0, 1], [0, 3], [1, 0], [1, 2], [1, 4], [2, 1], [2, 3], [3, 0], [3, 2], [3, 4], [4, 1], [4, 3],
]
const RED = [2, 2]

function Cube({ x, y, red }) {
  const face = 'absolute inset-0 [backface-visibility:hidden]'
  const edge = red ? 'rgba(255,255,255,0.18)' : 'rgba(242,238,230,0.14)'
  const col = red
    ? { top: '#f04a49', a: '#c61f1e', b: '#a51817' }
    : { top: '#1d1c1b', a: '#151514', b: '#0d0d0d' }
  return (
    <div
      className={`absolute [transform-style:preserve-3d] ${red ? 'hero-red' : 'hero-cube'}`}
      style={{ width: S, height: S, left: x * S * 1.55, top: y * S * 1.55 }}
    >
      <div className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform: `translateZ(${S / 2}px)` }}>
        <div className={face} style={{ background: col.top, transform: `translateZ(${S / 2}px)`, boxShadow: `inset 0 0 0 1px ${edge}` }} />
        <div className={face} style={{ background: col.a, transform: `rotateX(-90deg) translateZ(${S / 2}px)`, boxShadow: `inset 0 0 0 1px ${edge}` }} />
        <div className={face} style={{ background: col.b, transform: `rotateX(90deg) translateZ(${S / 2}px)`, boxShadow: `inset 0 0 0 1px ${edge}` }} />
        <div className={face} style={{ background: col.b, transform: `rotateY(90deg) translateZ(${S / 2}px)`, boxShadow: `inset 0 0 0 1px ${edge}` }} />
        <div className={face} style={{ background: col.a, transform: `rotateY(-90deg) translateZ(${S / 2}px)`, boxShadow: `inset 0 0 0 1px ${edge}` }} />
      </div>
    </div>
  )
}

export default function Hero() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const steps = gsap.utils.toArray('.step')
      const setStep = (i) =>
        steps.forEach((s, k) => s.classList.toggle('is-active', k === i))
      setStep(0)

      // Process bar: highlight each step in turn as the hero scrolls away.
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom 25%',
        onUpdate: (self) => {
          setStep(Math.min(3, Math.floor(self.progress * 4)))
          gsap.set('.step-progress', { scaleX: self.progress })
        },
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        tl.from('.hero-line', { yPercent: 115, duration: 1.3, stagger: 0.12 }, 0.15)
          .from('.hero-pixel', { scale: 0, duration: 0.8, ease: 'back.out(2.2)' }, 0.75)
          .from('.hero-fade', { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.6)
          .from('.hero-cube', { z: -220, opacity: 0, duration: 1.4, stagger: { each: 0.04, from: 'center' } }, 0.2)
          .from('.hero-red', { z: 400, duration: 1.6, ease: 'expo.out' }, 0.5)
          .from('.hero-depth', { opacity: 0, y: 30, duration: 1.2, stagger: 0.1 }, 0.9)
          .from('.step', { opacity: 0, y: 16, duration: 0.8, stagger: 0.08 }, 0.9)

        gsap.to('.hero-red', { z: 34, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.1 })
        gsap.to('.float-a', { y: -14, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
        gsap.to('.float-b', { y: 12, duration: 3.8, ease: 'sine.inOut', yoyo: true, repeat: -1 })

        // Cursor tilt on the centrepiece; foreground layers travel further for depth.
        const tiltX = gsap.quickTo('.hero-tilt', 'rotationX', { duration: 0.9, ease: 'power3.out' })
        const tiltY = gsap.quickTo('.hero-tilt', 'rotationY', { duration: 0.9, ease: 'power3.out' })
        const layers = gsap.utils.toArray('[data-depth]').map((el) => ({
          d: parseFloat(el.dataset.depth),
          x: gsap.quickTo(el, 'x', { duration: 1, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: 1, ease: 'power3.out' }),
        }))
        const move = (e) => {
          const nx = e.clientX / innerWidth - 0.5
          const ny = e.clientY / innerHeight - 0.5
          tiltX(-ny * 14)
          tiltY(nx * 18)
          layers.forEach((l) => {
            l.x(nx * l.d)
            l.y(ny * l.d)
          })
        }
        window.addEventListener('mousemove', move)

        // Light parallax out of the hero.
        gsap.to('.hero-copy', {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        return () => window.removeEventListener('mousemove', move)
      })
    },
    { scope: root }
  )

  const go = (e, id) => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="spotlight pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-frame flex-1 grid-cols-1 items-center gap-10 px-5 pb-10 pt-28 sm:px-8 lg:grid-cols-12 lg:pt-24">
        {/* Copy */}
        <div className="hero-copy relative z-10 lg:col-span-6">
          <h1
            id="hero-title"
            aria-label="Create beyond ordinary."
            className="text-[clamp(4rem,10.5vw,10.5rem)] font-light leading-[0.88] tracking-[-0.045em]"
          >
            <span aria-hidden="true">
              <span className="block overflow-hidden pb-[0.06em]">
                <span className="hero-line block">Create</span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span className="hero-line block">
                  Bey
                  <span className="hero-pixel relative mx-[0.02em] inline-block h-[0.52em] w-[0.52em] translate-y-[-0.02em] bg-signal align-baseline" />
                  nd
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line block">
                  Ordinary<span className="text-signal">.</span>
                </span>
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-8 max-w-md text-lg leading-relaxed text-canvas/70">{hero.intro}</p>

          <div className="hero-fade mt-9 flex flex-nowrap items-center gap-2 sm:gap-3">
            <Magnetic className="min-w-0 flex-1 sm:flex-none">
              <a
                href="#contact"
                onClick={(e) => go(e, 'contact')}
                className="group flex w-full items-center justify-center gap-1.5 whitespace-nowrap sm:inline-flex sm:w-auto rounded-full bg-signal px-3 py-3.5 text-[14px] min-[380px]:px-4 min-[380px]:text-[15px] font-semibold sm:gap-3 sm:px-7 sm:py-4 sm:text-base text-canvas transition-colors hover:bg-canvas hover:text-ink"
              >
                {hero.primary}
                <Arrow className="arrow-nudge hidden h-3 w-4 min-[360px]:block sm:h-3.5 sm:w-5" />
              </a>
            </Magnetic>
            <Magnetic className="min-w-0 flex-1 sm:flex-none">
              <a
                href="#work"
                onClick={(e) => go(e, 'work')}
                className="group flex w-full items-center justify-center gap-1.5 whitespace-nowrap sm:inline-flex sm:w-auto rounded-full border border-[var(--hair-strong)] px-3 py-3.5 text-[14px] min-[380px]:px-4 min-[380px]:text-[15px] font-medium sm:gap-3 sm:px-7 sm:py-4 sm:text-base text-canvas transition-colors hover:border-canvas"
              >
                {hero.secondary}
                <Arrow className="arrow-nudge hidden h-3 w-4 min-[360px]:block sm:h-3.5 sm:w-5" />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* 3D centrepiece */}
        <div className="relative h-[360px] sm:h-[460px] lg:col-span-6 lg:h-[620px]" aria-hidden="true">
          <div className="absolute inset-0 flex items-center justify-center [perspective:1600px]">
            <div className="hero-tilt [transform-style:preserve-3d]">
              <div
                className="relative scale-[0.48] [transform-style:preserve-3d] sm:scale-75 lg:scale-100"
                style={{ width: S * 1.55 * 4 + S, height: S * 1.55 * 4 + S, transform: 'rotateX(58deg) rotateZ(-42deg)' }}
              >
                <div
                  className="absolute -inset-24"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(242,238,230,.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,238,230,.07) 1px, transparent 1px)',
                    backgroundSize: `${S * 1.55}px ${S * 1.55}px`,
                    backgroundPosition: `${S * 0.775 - 24}px ${S * 0.775 - 24}px`,
                    WebkitMaskImage: 'radial-gradient(circle, #000 30%, transparent 70%)',
                    maskImage: 'radial-gradient(circle, #000 30%, transparent 70%)',
                  }}
                />
                {field.map(([x, y]) => (
                  <Cube key={`${x}-${y}`} x={x} y={y} />
                ))}
                <Cube x={RED[0]} y={RED[1]} red />
              </div>
            </div>
          </div>

          {/* Red light pooled under the focal cube */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/3 rounded-full bg-signal/20 blur-3xl" />

          {/* Blurred glass badges in the corners (out of focus) */}
          <div data-depth="46" className="hero-depth absolute right-2 top-4 sm:right-6">
            <div className="float-a glass rounded-2xl px-5 py-3 text-sm text-canvas/80 blur-[1.5px]">Strategy first</div>
          </div>
          <div data-depth="60" className="hero-depth absolute bottom-6 right-0 sm:right-10">
            <div className="float-b glass flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-canvas/80 blur-[2px]">
              <span className="h-2 w-2 bg-signal" /> Motion
            </div>
          </div>

          {/* Sharp foreground UI card */}
          <div data-depth="28" className="hero-depth absolute bottom-10 left-0 sm:left-4">
            <div className="glass w-56 rounded-2xl p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
              <p className="font-sora text-xs text-canvas/50">What we make</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {['Strategy', 'Design', 'Motion', 'Content'].map((t) => (
                  <span key={t} className="rounded-full border border-[var(--hair-strong)] px-2.5 py-1 text-xs text-canvas/85">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4-step process bar */}
      <div className="relative z-10 border-t border-[var(--hair)]">
        <div className="step-progress absolute left-0 top-[-1px] h-px w-full origin-left scale-x-0 bg-signal" />
        <ol className="mx-auto grid max-w-frame grid-cols-2 md:grid-cols-4">
          {process.map((p, i) => (
            <li
              key={p.title}
              className="step group/step relative border-[var(--hair)] px-5 py-5 transition-colors duration-500 sm:px-8 md:py-6 [&:not(:last-child)]:border-r [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0 [&.is-active]:bg-[rgba(242,238,230,0.03)]"
            >
              <span className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-signal transition-transform duration-500 [.is-active>&]:scale-y-100" />
              <div className="flex items-baseline gap-3">
                <span className="font-sora text-xs text-canvas/40 transition-colors [.is-active_&]:text-signal">0{i + 1}</span>
                <span className="text-base font-semibold text-canvas/50 transition-colors duration-500 [.is-active_&]:text-canvas md:text-lg">
                  {p.title}
                </span>
              </div>
              <p className="mt-2 hidden max-w-[30ch] text-sm leading-relaxed text-canvas/40 transition-colors duration-500 sm:block [.is-active_&]:text-canvas/70">
                {p.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
