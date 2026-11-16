import { useLayoutEffect, useRef, useState } from 'react'
import { Linkedin, Youtube } from 'lucide-react'
import { gsap, ScrollTrigger, useGSAP } from '../gsap'
import { services } from '../content'
import Icon from './icons'

// Two layouts share one structure: bulb in the centre, 4 services left, 4 right.
// Desktop uses a 1200x800 stage; phones use a 400x480 stage with a smaller bulb and type.
const G = { x: 600, y: 461 } // globe centre in bulb-art units
const LAYOUTS = {
  desktop: {
    W: 1200, H: 800, BC: { x: 600, y: 461 }, bulb: 1, rows: [250, 405, 560, 715],
    LX: 300, RX: 900, iconR: 34, k: 120,
  },
  compact: {
    W: 420, H: 480, BC: { x: 210, y: 285 }, bulb: 0.42, rows: [120, 220, 320, 420],
    LX: 116, RX: 304, iconR: 15, k: 34,
  },
}

function buildLayout(L) {
  const BR = 130 * L.bulb
  const nodes = [
    ...services.left.map((s, i) => ({ ...s, side: -1, x: L.LX, y: L.rows[i] })),
    ...services.right.map((s, i) => ({ ...s, side: 1, x: L.RX, y: L.rows[i] })),
  ]
  const ah = L.bulb < 1 ? 5 : 9 // arrowhead size
  const arrows = nodes.map((n) => {
    const a = Math.atan2(n.y - L.BC.y, n.x - L.BC.x)
    const gap = L.bulb < 1 ? 6 : 14
    const s = { x: L.BC.x + (BR + gap) * Math.cos(a), y: L.BC.y + (BR + gap) * Math.sin(a) }
    const e = { x: n.x - n.side * (L.iconR + (L.bulb < 1 ? 5 : 8)), y: n.y }
    const d = `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} C ${(s.x + n.side * L.k).toFixed(1)} ${s.y.toFixed(1)}, ${(e.x - n.side * L.k).toFixed(1)} ${e.y}, ${e.x} ${e.y}`
    const head = `M ${e.x - n.side * ah} ${e.y - ah * 0.78} L ${e.x} ${e.y} L ${e.x - n.side * ah} ${e.y + ah * 0.78}`
    return { d, head }
  })
  const bulbT = `translate(${L.BC.x} ${L.BC.y}) scale(${L.bulb}) translate(${-G.x} ${-G.y})`
  return { ...L, nodes, arrows, bulbT }
}
const BUILT = { desktop: buildLayout(LAYOUTS.desktop), compact: buildLayout(LAYOUTS.compact) }
const isCompact = () => typeof window !== 'undefined' && window.innerWidth < 640

// Hanging bulb silhouette: a classic bulb outline, flipped so the base hangs from the cord.
const BULB = 'M50,0 C22,0 0,22 0,50 C0,72 15,84 22,98 L22,112 L78,112 L78,98 C85,84 100,72 100,50 C100,22 78,0 50,0 Z'

function BulbArt() {
  // Drawn in desktop units (globe centre 600,461); the parent <g> scales it per layout.
  return (
    <g className="bulb-rig">
      {/* cord, long enough to stay attached while the bulb drops */}
      <line x1="600" y1="-500" x2="600" y2="236" stroke="rgba(242,238,230,0.55)" strokeWidth="2" />
      {/* screw cap */}
      <g>
        <rect x="574" y="232" width="52" height="16" rx="3" fill="#2a2826" stroke="rgba(242,238,230,0.25)" />
        <path d="M534 248 h132 v54 h-132 z" fill="url(#capGrad)" />
        {[260, 272, 284, 296].map((y) => (
          <line key={y} x1="534" x2="666" y1={y} y2={y} stroke="rgba(0,0,0,0.45)" strokeWidth="2" />
        ))}
      </g>

      {/* glass */}
      <g transform="translate(470 300) scale(2.6) translate(0 112) scale(1 -1)">
        <path className="glass-fill" d={BULB} fill="url(#glassGrad)" opacity="0.35" />
        <path d={BULB} fill="none" stroke="rgba(242,238,230,0.38)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      </g>
      {/* glass reflections */}
      <path d="M520 420 C 512 470, 530 520, 566 552" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="5" strokeLinecap="round" />
      <path d="M528 392 C 526 400, 524 408, 522 414" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="5" strokeLinecap="round" />

      {/* filament */}
      <g className="filament" fill="none" stroke="#6b5440" strokeWidth="2.4" strokeLinecap="round">
        <path d="M584 302 L586 440 M616 302 L614 440" strokeWidth="1.6" />
        <path d="M586 440 q 4 -16 7 0 q 3.5 16 7 0 q 3.5 -16 7 0 q 3.5 16 7 0" />
      </g>

      {/* creative specialist seated on the bulb with a laptop */}
      <g className="specialist" transform="translate(700 378) scale(1.3) translate(-700 -378)">
        <ellipse cx="724" cy="340" rx="16" ry="14" fill="rgba(242,238,230,0.35)" filter="url(#soft)" />
        {/* back leg */}
        <path d="M704 378 L742 372 L752 418" fill="none" stroke="#1e1c1b" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
        {/* torso */}
        <path d="M704 380 C 700 360, 696 340, 694 324" fill="none" stroke="#24211f" strokeWidth="22" strokeLinecap="round" />
        {/* front leg */}
        <path d="M706 374 L746 366 L748 412" fill="none" stroke="#2b2826" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M742 416 h16" stroke="#f2eee6" strokeWidth="6" strokeLinecap="round" />
        {/* head */}
        <circle cx="692" cy="300" r="12" fill="#2b2826" />
        <path d="M681 298 a12 12 0 0 1 22 -6 c-4 -2 -12 -3 -22 6z" fill="#141312" />
        {/* laptop */}
        <path d="M710 364 L744 359" stroke="#bdb6ac" strokeWidth="4" strokeLinecap="round" />
        <path d="M743 360 L736 330" stroke="#f2eee6" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M738.6 358 L732.6 333" stroke="rgba(242,238,230,0.55)" strokeWidth="2" strokeLinecap="round" />
        <rect x="737.5" y="342" width="3" height="3" fill="#ee2e2d" transform="rotate(-13 739 343)" />
        {/* arm */}
        <path d="M697 330 L716 350 L732 352" fill="none" stroke="#2f2c2a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        {/* rim light */}
        <path d="M684 296 a12 12 0 0 1 8 -8 M690 330 C 694 350, 698 366, 700 380" fill="none" stroke="rgba(255,207,143,0.55)" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </g>
  )
}

export default function Services() {
  const root = useRef(null)
  const frame = useRef(null)
  const [compact, setCompact] = useState(isCompact)
  const [fit, setFit] = useState({ s: 1, top: 0 })
  const L = compact ? BUILT.compact : BUILT.desktop

  // Fit the stage inside the frame, centred, at the largest scale that shows everything.
  useLayoutEffect(() => {
    const el = frame.current
    const measure = () => {
      const c = isCompact()
      const lay = c ? BUILT.compact : BUILT.desktop
      const r = el.getBoundingClientRect()
      const s = Math.min(r.width / lay.W, r.height / lay.H)
      setCompact(c)
      setFit({ s, top: Math.max(0, (r.height - lay.H * s) / 2) })
    }
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    measure()
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const draws = gsap.utils.toArray('.draw')
      draws.forEach((p) => {
        const len = p.getTotalLength()
        p.style.strokeDasharray = `${len}`
        p.dataset.len = len
      })
      const lift = compact ? 40 : 90

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const items = gsap.utils.toArray('.svc-node')
        gsap.set(items, {
          scale: 0,
          opacity: 0,
          x: (i) => L.BC.x - L.nodes[i].x,
          y: (i) => L.BC.y - L.nodes[i].y,
        })
        draws.forEach((p) => gsap.set(p, { strokeDashoffset: p.dataset.len }))
        gsap.set('.arrow-head', { opacity: 0 })
        gsap.set('.glow', { opacity: 0, scale: 0.35, svgOrigin: `${G.x} ${G.y}` })
        gsap.set('.ignite-ring', { attr: { r: 20 }, opacity: 0 })
        gsap.set('.bulb-rig', { y: -90 })
        gsap.set('.filament', { stroke: '#6b5440' })
        gsap.set('.glass-fill, .ambient', { opacity: (i, el) => (el.classList.contains('ambient') ? 0 : 0.35) })

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'center center',
            end: compact ? '+=140%' : '+=170%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Pinned sections must be measured top to bottom: this one before Selected work.
            refreshPriority: 2,
          },
        })

        // 1. Cord drop and ignition
        tl.to('.bulb-rig', { y: 0, duration: 1.2, ease: 'elastic.out(1, 0.45)' }, 0)
          .to('.filament', { stroke: '#ffd9a0', duration: 0.6 }, 0.8)
          .to('.glass-fill', { opacity: 1, duration: 0.8 }, 0.8)
          .to('.glow', { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }, 0.85)
          .to('.ignite-ring', { attr: { r: 640 }, opacity: 0.5, duration: 0.4, ease: 'power1.out' }, 0.9)
          .to('.ignite-ring', { opacity: 0, duration: 0.9, ease: 'power1.in' }, 1.3)
          .to('.ambient', { opacity: 1, duration: 1 }, 0.9)

        // 2-3. Services burst out of the bulb along curved paths
        items.forEach((el, i) => {
          const n = L.nodes[i]
          const dx = L.BC.x - n.x
          const dy = L.BC.y - n.y
          tl.to(
            el,
            {
              motionPath: { path: [{ x: dx * 0.55, y: dy * 0.55 - lift }, { x: 0, y: 0 }], curviness: 1.4 },
              scale: 1,
              opacity: 1,
              duration: 1.1,
              ease: 'back.out(1.6)',
            },
            1.8 + (i % 4) * 0.14 + (i >= 4 ? 0.07 : 0)
          )
        })

        // 4. Dotted arrows draw outward to each service as it lands
        draws.forEach((p, i) => {
          tl.to(p, { strokeDashoffset: 0, duration: 1, ease: 'power2.out' }, 1.95 + (i % 4) * 0.14 + (i >= 4 ? 0.07 : 0))
        })
        tl.to('.arrow-head', { opacity: 1, duration: 0.3, stagger: 0.05 }, 2.9).to({}, { duration: 0.6 })

        // Foreground social spheres drift with the scroll
        const drift = { trigger: root.current, start: 'top bottom', end: '+=260%', scrub: true }
        gsap.to('.sphere-l', { y: compact ? -40 : -110, rotation: -12, ease: 'none', scrollTrigger: drift })
        gsap.to('.sphere-r', { y: compact ? -28 : -70, rotation: 10, ease: 'none', scrollTrigger: { ...drift } })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.glow, .ambient, .glass-fill', { opacity: 1 })
        gsap.set('.filament', { stroke: '#ffd9a0' })
        draws.forEach((p) => gsap.set(p, { strokeDashoffset: 0 }))
      })

      // This timeline can be rebuilt after a resize. Re-sort and re-measure every
      // ScrollTrigger so Selected work starts only after this section's pin ends.
      const raf = requestAnimationFrame(() => {
        ScrollTrigger.sort()
        ScrollTrigger.refresh()
      })
      return () => cancelAnimationFrame(raf)
    },
    { scope: root, dependencies: [compact], revertOnUpdate: true }
  )

  // Hover or tap: brighten the bulb and run ants along that service's arrow.
  const onEnter = (i) => {
    gsap.to('.glow-boost', { opacity: 1, scale: 1.08, duration: 0.5, ease: 'power2.out', svgOrigin: `${G.x} ${G.y}` })
    root.current.querySelectorAll('.dots')[i]?.classList.add('marching')
  }
  const onLeave = (i) => {
    gsap.to('.glow-boost', { opacity: 0, scale: 1, duration: 0.6, ease: 'power2.out', svgOrigin: `${G.x} ${G.y}` })
    root.current.querySelectorAll('.dots')[i]?.classList.remove('marching')
  }

  const nodeBtn = compact
    ? { gap: 'gap-[6px]', ring: 'h-[30px] w-[30px]', icon: 'h-4 w-4', text: 'w-[86px]', label: 'text-[9.5px] tracking-[0.02em] leading-[1.15]', desc: 'mt-1 text-[8px] leading-[1.3]', shift: 15 }
    : { gap: 'gap-5', ring: 'h-[68px] w-[68px]', icon: 'h-8 w-8', text: 'w-[210px]', label: 'text-[17px] tracking-[0.04em] leading-tight', desc: 'mt-1.5 text-[13px] leading-snug', shift: 34 }

  return (
    <section
      id="services"
      ref={root}
      className="relative h-[100svh] min-h-[620px] overflow-hidden border-t border-[var(--hair)] bg-ink min-[900px]:min-h-[680px]"
      aria-labelledby="services-title"
    >
      {/* warm ambient light that blooms when the bulb ignites */}
      <div
        className="ambient pointer-events-none absolute inset-0 opacity-0"
        style={{ background: 'radial-gradient(ellipse 55% 60% at 50% 58%, rgba(255,190,120,0.16), rgba(238,46,45,0.05) 45%, transparent 75%)' }}
      />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />

      {/* Header blocks: title left, tagline + AGENCY right, on every screen size */}
      <div className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-frame items-start justify-between gap-4 px-4 pt-20 sm:px-8 sm:pt-24">
        <div>
          <p className="font-sora text-[11px] text-canvas/50 sm:text-sm">What we do</p>
          <h2 id="services-title" className="mt-2 max-w-[14ch] text-lg font-medium leading-tight tracking-[-0.02em] sm:mt-3 sm:text-3xl min-[900px]:text-4xl">
            Eight services, one bright idea<span className="text-signal">.</span>
          </h2>
        </div>
        <div className="max-w-[150px] text-right sm:max-w-[260px]">
          <span className="ml-auto block h-[2px] w-8 bg-signal sm:w-12" />
          <p className="mt-2 text-[9.5px] leading-snug text-canvas/70 sm:mt-4 sm:text-sm">{services.tagline}</p>
          <p className="mt-1 text-xl font-extrabold tracking-[0.02em] sm:mt-2 sm:text-4xl">{services.word}</p>
        </div>
      </div>

      {/* Stage */}
      <div ref={frame} className="absolute inset-x-0 bottom-16 top-[150px] mx-auto max-w-frame px-1 sm:top-[190px] min-[900px]:bottom-4 min-[900px]:top-28">
        <div
          className="absolute left-1/2"
          style={{ top: fit.top, width: L.W, height: L.H, transform: `translateX(-50%) scale(${fit.s})`, transformOrigin: 'top center' }}
        >
          <svg viewBox={`0 0 ${L.W} ${L.H}`} width={L.W} height={L.H} className="absolute inset-0 overflow-visible" aria-hidden="true">
            <defs>
              <radialGradient id="glowGrad" cx={G.x} cy={G.y} r="420" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#fff3dc" stopOpacity="0.95" />
                <stop offset="0.18" stopColor="#ffcf8f" stopOpacity="0.55" />
                <stop offset="0.45" stopColor="#ee6a3d" stopOpacity="0.14" />
                <stop offset="1" stopColor="#111111" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="glassGrad" cx="0.5" cy="0.55" r="0.6">
                <stop offset="0" stopColor="#fff6e6" stopOpacity="0.9" />
                <stop offset="0.55" stopColor="#ffd6a0" stopOpacity="0.35" />
                <stop offset="1" stopColor="#f2eee6" stopOpacity="0.06" />
              </radialGradient>
              <linearGradient id="capGrad" x1="0" x2="1">
                <stop offset="0" stopColor="#6d6862" />
                <stop offset="0.45" stopColor="#d8d2c8" />
                <stop offset="1" stopColor="#57524c" />
              </linearGradient>
              <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
              {L.arrows.map((a, i) => (
                <mask key={i} id={`svc-mask-${i}`} maskUnits="userSpaceOnUse" x="-50" y="-50" width={L.W + 100} height={L.H + 100}>
                  <path className="draw" d={a.d} fill="none" stroke="#fff" strokeWidth={compact ? 6 : 10} />
                </mask>
              ))}
            </defs>

            {/* Bulb, glow and ignition ring, scaled as one unit */}
            <g transform={L.bulbT}>
              <g className="glow">
                <circle cx={G.x} cy={G.y} r="420" fill="url(#glowGrad)" />
              </g>
              <g className="glow-boost" opacity="0">
                <circle cx={G.x} cy={G.y} r="300" fill="url(#glowGrad)" />
              </g>
              <circle className="ignite-ring" cx={G.x} cy={G.y} r="20" fill="none" stroke="#ffcf8f" strokeWidth="2" opacity="0" />
              <BulbArt />
            </g>

            {L.arrows.map((a, i) => (
              <g key={i} mask={`url(#svc-mask-${i})`}>
                <path
                  className="dots"
                  d={a.d}
                  fill="none"
                  stroke="rgba(242,238,230,0.75)"
                  strokeWidth={compact ? 1.4 : 2.4}
                  strokeDasharray={compact ? '0.1 5' : '0.1 9'}
                  strokeLinecap="round"
                />
              </g>
            ))}
            {L.arrows.map((a, i) => (
              <path key={i} className="arrow-head" d={a.head} fill="none" stroke="#f2eee6" strokeWidth={compact ? 1.3 : 2} strokeLinecap="round" strokeLinejoin="round" />
            ))}
          </svg>

          {/* Service nodes */}
          <ul>
            {L.nodes.map((n, i) => (
              <li key={n.key} className="svc-node absolute h-0 w-0" style={{ left: n.x, top: n.y }}>
                <button
                  type="button"
                  onMouseEnter={() => onEnter(i)}
                  onMouseLeave={() => onLeave(i)}
                  onFocus={() => onEnter(i)}
                  onBlur={() => onLeave(i)}
                  className={`group absolute top-0 flex -translate-y-1/2 items-center text-left ${nodeBtn.gap} ${n.side < 0 ? 'right-0 flex-row-reverse text-right' : 'left-0'}`}
                  style={{ transform: `translate(${n.side < 0 ? nodeBtn.shift : -nodeBtn.shift}px, -50%)` }}
                >
                  <span className={`icon-ring grid shrink-0 place-items-center rounded-full bg-ink/80 text-canvas ${nodeBtn.ring}`}>
                    <Icon name={n.key} className={nodeBtn.icon} />
                  </span>
                  <span className={`block ${nodeBtn.text}`}>
                    <span className={`block font-extrabold uppercase transition-colors group-hover:text-signal ${nodeBtn.label}`}>{n.title}</span>
                    <span className={`block text-canvas/50 ${nodeBtn.desc}`}>{n.text}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Blurred foreground social spheres */}
      <a
        href="#"
        aria-label="Digilid on LinkedIn"
        className="sphere-l absolute bottom-3 left-3 z-30 grid h-11 w-11 place-items-center rounded-full text-canvas/90 blur-[1px] transition-[filter] duration-500 hover:blur-0 sm:h-20 sm:w-20 min-[900px]:bottom-10 min-[900px]:left-6 min-[900px]:h-28 min-[900px]:w-28 min-[900px]:blur-[1.5px] xl:left-16"
        style={{ background: 'radial-gradient(circle at 32% 28%, #4a4744, #1a1918 62%, #0b0b0b)', boxShadow: '0 30px 60px -10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.12)' }}
      >
        <Linkedin className="h-5 w-5 sm:h-7 sm:w-7 min-[900px]:h-9 min-[900px]:w-9" strokeWidth={1.6} />
      </a>
      <a
        href="#"
        aria-label="Digilid on YouTube"
        className="sphere-r absolute bottom-4 right-3 z-30 grid h-10 w-10 place-items-center rounded-full text-canvas blur-[1px] transition-[filter] duration-500 hover:blur-0 sm:h-[72px] sm:w-[72px] min-[900px]:bottom-16 min-[900px]:right-6 min-[900px]:h-24 min-[900px]:w-24 min-[900px]:blur-[2px] xl:right-16"
        style={{ background: 'radial-gradient(circle at 32% 28%, #ff6b6a, #ee2e2d 45%, #8a1110)', boxShadow: '0 30px 60px -10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.25)' }}
      >
        <Youtube className="h-[18px] w-[18px] sm:h-6 sm:w-6 min-[900px]:h-8 min-[900px]:w-8" strokeWidth={1.6} />
      </a>
    </section>
  )
}
