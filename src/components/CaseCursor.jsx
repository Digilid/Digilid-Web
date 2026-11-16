import { useRef } from 'react'
import { gsap, useGSAP, reducedMotion } from '../gsap'

// Magnetic “View case” follower shown over portfolio frames (pointer devices only).
export default function CaseCursor() {
  const ref = useRef(null)
  useGSAP(() => {
    if (matchMedia('(hover: none)').matches) return
    const el = ref.current
    const slow = reducedMotion() ? 0 : 0.55
    const xTo = gsap.quickTo(el, 'x', { duration: slow, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: slow, ease: 'power3.out' })
    let on = false
    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      const hit = e.target.closest?.('[data-case-cursor]')
      if (!!hit !== on) {
        on = !!hit
        gsap.to(el, { scale: on ? 1 : 0, opacity: on ? 1 : 0, duration: 0.45, ease: on ? 'back.out(2)' : 'power2.out' })
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  })
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] -ml-[52px] -mt-[52px] grid h-[104px] w-[104px] scale-0 place-items-center rounded-full bg-signal text-sm font-semibold text-canvas opacity-0"
    >
      View case
    </div>
  )
}
