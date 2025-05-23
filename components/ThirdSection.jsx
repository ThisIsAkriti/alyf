import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ThirdSection = ({ containerRef, horizontalTween }) => {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!containerRef?.current || !horizontalTween) return;

    const V = window.innerWidth;
    const pinStart = window.scrollY + containerRef.current.getBoundingClientRect().top;
    const content = imageRef.current?.parentElement?.parentElement; // .slide-content
    if (!content) {
      console.warn('Could not find parent content element.');
      return;
    }

    const scrollWidth = content.scrollWidth;

    // Zoom animation tied to horizontal scroll
    gsap.to(imageRef.current, {
      scale: 1.5,
      ease: 'none',
      scrollTrigger: {
        trigger: '.third-section-wrapper',
        containerAnimation: horizontalTween,
        start: 'left right', // Section starts entering from the right
        end: 'right left',   // Section fully in view and starts leaving
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    // Text slide animation 
    const textStartScroll = pinStart + 2.3 * V;
    const textEndScroll = pinStart + 2.2 * V;

    const textTl = gsap.timeline({
      scrollTrigger: {
        start: textStartScroll,
        end: textEndScroll,
        toggleActions: "play none none reverse",
      },
    });

    textTl.fromTo(
      textRef.current,
      { y: 220 },
      { y: 0, duration: 1.5, ease: "power2.out" }
    );

    // Image slide animation 
    const imageStartScroll = pinStart + 2.5 * V;
    const imageEndScroll = pinStart + 2.5 * V;

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
        { x: 0, duration: 2, ease: "power2.out" },
        0
      )
  }, [containerRef, horizontalTween]);

  return (
    <section className='third-section-wrapper'>
      <div className='text-section'>
        <div className='text-reveal-wrapper'>
          <h1 ref={textRef}>Park <br/> Hyatt <br/> St. Kitts</h1>
        </div>
        <p className='third-sec-p'>
          Perched at Christophe Harbour, the Park Hyatt offers high-end luxury with stunning water views, spa-inspired baths, and select rooms featuring private sundecks and rooftop infinity pools.
        </p>
      </div>
      <div className="third-section-image-wrapper">
        <div ref={imageRef} className="image-container" />
      </div>
    </section>
  );
};

export default ThirdSection;