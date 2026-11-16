import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, Draggable, InertiaPlugin, useGSAP)

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Smooth-scroll to a section id through Lenis when it is running.
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: 0, duration: 1.4 })
  else el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' })
  try { history.replaceState(null, '', '#' + id) } catch (e) {}
}

export { gsap, ScrollTrigger, Draggable, useGSAP }
