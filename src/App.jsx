import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, reducedMotion, scrollToId } from './gsap'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Reviews from './components/Reviews'
import Footer from './components/Footer'
import CaseCursor from './components/CaseCursor'

export default function App() {
  const footerRef = useRef(null)
  const [footerH, setFooterH] = useState(0)
  const [reveal, setReveal] = useState(false)

  // Lenis inertial scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
  useEffect(() => {
    if (reducedMotion()) return
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  // Reserve space so the fixed footer is revealed from under the page.
  useLayoutEffect(() => {
    const el = footerRef.current
    if (!el) return
    const measure = () => {
      // Curtain reveal only where the whole footer fits on screen.
      const fits = window.innerWidth >= 768 && el.offsetHeight <= window.innerHeight
      setReveal(fits)
      setFooterH(fits ? el.offsetHeight : 0)
      ScrollTrigger.refresh()
    }
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  // Honour a #section in the link on load.
  useEffect(() => {
    const id = location.hash.replace('#', '')
    if (id) setTimeout(() => scrollToId(id), 600)
  }, [])

  return (
    <>
      <Navbar />
      <main className="relative z-10 bg-ink">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Reviews />
      </main>
      <div aria-hidden="true" style={{ height: footerH }} />
      <Footer ref={footerRef} reveal={reveal} />
      <CaseCursor />
    </>
  )
}
