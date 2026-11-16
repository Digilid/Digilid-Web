import { useRef } from 'react'
import { gsap, useGSAP, reducedMotion } from '../gsap'

// Wrap any interactive element to give it a magnetic pull toward the cursor.
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el || reducedMotion() || matchMedia('(hover: none)').matches) return
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
      const move = (e) => {
        const r = el.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * strength)
        yTo((e.clientY - (r.top + r.height / 2)) * strength)
      }
      const leave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' })
      }
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', leave)
      return () => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', leave)
      }
    },
    { scope: ref }
  )
  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  )
}
