import React, { useRef } from 'react'
import { performanceImages, performanceImgPositions } from '../constants/index.js'
import { useMediaQuery } from 'react-responsive';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Performance = () => {  // Fixed typo: Perfomance → Performance
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const sectionRef = useRef(null);

    useGSAP(() => {
        // Kill any existing ScrollTriggers to prevent conflicts
        ScrollTrigger.getAll().forEach(st => st.kill());

        // Text animation: fade in and move up as it enters view
        gsap.fromTo(
            ".content p",
            { opacity: 0, y: 30 },  // Increased y for smoother animation
            {
                opacity: 1,
                y: 0,
                duration: 1,  // Slightly longer duration
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.content',
                    start: "top bottom-=100",
                    end: "bottom center",
                    scrub: false,  // Changed to false for a one-time animation
                    toggleActions: "play reverse play reverse", // Better control
                    invalidateOnRefresh: true,
                },
            }
        );

        // Desktop only image timeline with a single scrubbed scroll trigger
        if (isMobile) {
            // On mobile, ensure images are visible without animations
            gsap.set('.wrapper img', {
                opacity: 1,
                clearProps: 'all'  // Remove any GSAP transforms
            });
            return;
        }

        // Create timeline with scrubbed scroll trigger
        const tl = gsap.timeline({
            defaults: {
                ease: "power1.inOut",
                duration: 2,
                overwrite: 'auto'
            },
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,  // Slightly more responsive scrubbing
                invalidateOnRefresh: true,
                refreshPriority: 1,  // Higher priority for this ScrollTrigger
            },
        });

        // Set initial positions for images (off-screen)
        performanceImages.forEach(img => {
            if(img.id === 'p5') return;
            gsap.set(`.${img.id}`, {
                opacity: 0,
                scale: 0.8
            });
        });

        // Animate images to their final positions from constants at time 0
        performanceImgPositions.forEach((pos) => {
            if(pos.id === 'p5') return;

            const toVars = {
                opacity: 1,
                scale: 1
            };

            if(pos.left !== undefined) toVars.left = `${pos.left}%`;
            if(pos.right !== undefined) toVars.right = `${pos.right}%`;
            if(pos.bottom !== undefined) toVars.bottom = `${pos.bottom}%`;
            if(pos.transform !== undefined) toVars.transform = pos.transform;  // Fixed: removed % for transform

            // Add animation at time 0
            tl.to(`.${pos.id}`, toVars, 0);
        });

        // Optional: Add a subtle parallax effect to the whole section
        tl.fromTo(sectionRef.current,
            { y: 30 },
            { y: -30, duration: 2 },
            0
        );

        // Refresh ScrollTrigger on window resize
        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.getAll().forEach(st => st.kill());
        };

    }, { scope: sectionRef, dependencies: [isMobile] });  // Added dependencies array

    return (
        <section id="performance" ref={sectionRef}>  {/* Fixed id typo */}
            <h2>Next-level graphics performance. Game on.</h2>  {/* Fixed typo */}

            <div className='wrapper'>
                {performanceImages.map(({ id, src }) => (
                    <img
                        key={id}
                        src={src}
                        alt={id}
                        className={id}  // Added className for targeting
                    />
                ))}
            </div>

            <div className='content'>
                <p>
                    Run graphics-intensive workflows with a responsiveness that keeps up with your imagination.
                    The M4 family of chips delivers up to 3.5x faster graphics performance than the M3, so you can
                    edit complex timelines in Final Cut Pro, render 3D models in Cinema 4D, and play the latest games with
                    ease. With the M4 Pro and M4 Max,
                    <span className='text-white'> gaming feels more immersive and realistic than ever.</span>
                    And dynamic Caching optimizes fast on-chip memory to dramatically increase average GPU utilization—drivers
                </p>
            </div>
        </section>
    )
}

export default Performance;  // Fixed export name
