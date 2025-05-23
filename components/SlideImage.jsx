"use client";

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger);

const SlideImage = ({containerRef}) => {

    const sectionRef = useRef(null);
    const imageRef = useRef(null);

  useEffect(() => {
        
    if (!containerRef.current) return;
    
    const V = window.innerWidth;
    // Calculate the scroll position when pinning starts
    const pinStart = window.scrollY + containerRef.current.getBoundingClientRect().top;

    // Image trigger: Start when SecondSection is fully in view, adjusted by imageOffset
    const imageStartScroll = pinStart + 2 * V;
    const imageEndScroll = pinStart + 1.8 * V;

    const imageTl = gsap.timeline({
      scrollTrigger: {
        start: imageStartScroll,
        end: imageEndScroll,
        toggleActions: "play none none reverse",
      },
    });

    imageTl
      .fromTo(
        imageRef.current,
        { x: "-200%"},
        { x: 0, duration: 2, ease: "power2.out" }
      )

  }, [containerRef]);
    
  return (
    <section className='slide-image-wrapper' ref={sectionRef}>
      <div className='slide-image'>
      <img src='/image2.png' alt='image' ref={imageRef}/>
      </div>
    </section>
  )
}

export default SlideImage
