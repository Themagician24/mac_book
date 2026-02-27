import React, { useRef } from 'react'
import { performanceImages, performanceImgPositions } from '../constants'
import { useMediaQuery } from 'react-responsive'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Performance = () => {
  const sectionRef = useRef(null)
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  useGSAP(() => {
    const ctx = gsap.context(() => {

      // TEXT ANIMATION
      gsap.fromTo(
        '.content p',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      if (isMobile) {
        gsap.set('.wrapper img', { opacity: 1, scale: 1 })
        return
      }

      // IMAGE TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })

      performanceImages.forEach(img => {
        if (img.id === 'p5') return

        tl.fromTo(
          `.${img.id}`,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1 },
          0
        )
      })

      performanceImgPositions.forEach(pos => {
        if (pos.id === 'p5') return

        const vars = {}

        if (pos.left !== undefined) vars.left = `${pos.left}%`
        if (pos.right !== undefined) vars.right = `${pos.right}%`
        if (pos.bottom !== undefined) vars.bottom = `${pos.bottom}%`
        if (pos.transform !== undefined) vars.transform = pos.transform

        tl.to(`.${pos.id}`, vars, 0)
      })

    }, sectionRef)

    return () => ctx.revert()

  }, [isMobile])

  return (
    <section id="performance" ref={sectionRef}>
      <h2>Next level graphics performance. Game on.</h2>

      <div className="wrapper">
        {performanceImages.map((item, index) => (
          <img
            key={index}
            src={item.src}
            alt={item.alt || `Performance ${index + 1}`}
            className={item.id}
          />
        ))}
      </div>

      <div className="content">
        <p>
          Run graphics intensive workflows with extreme responsiveness.
          <span className="text-white">
            Gaming feels more immersive than ever.
          </span>
        </p>
      </div>
    </section>
  )
}

export default Performance
