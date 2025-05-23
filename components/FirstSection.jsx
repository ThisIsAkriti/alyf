import Image from 'next/image'
import React, { useRef, useEffect } from 'react';
import image from '../public/firstSectionImg.svg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 

const FirstSection = ({ containerRef}) => {
  const textRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;

    const V = window.innerWidth;
    // Calculate the scroll position when pinning starts
    const pinStart = window.scrollY + containerRef.current.getBoundingClientRect().top;

    const textStartScroll = pinStart + 0 * V;
    const textEndScroll = pinStart + 0 * V;

    const textTl = gsap.timeline({
      scrollTrigger: {
        start: textStartScroll,
        end: textEndScroll,
        toggleActions: "play none none reverse",
      },
    });

    // Text animation
    textTl.fromTo(
      textRef.current,
      { y: 200 },
      { y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [containerRef]);
  return (
    <section className='main-section-wrapper'>
        <div className='inner-container'>
            <div className='heading'>Range <br/> Developments</div>
            <div className='para-container'>
            <div ref={textRef} className='para'>Experience unparalleled luxury with Range Developments, a leader in Caribbean opulence. Revel in the acclaimed Park Hyatt St. Kitts and InterContinental Dominica, where world-class amenities meet breathtaking natural beauty. Discover a sanctuary of tranquility and indulgence, where every detail is crafted to perfection.</div>
            </div>
            <div className='end-text'>Award-winning luxury developer</div>
        </div>

        <div className='image-container'>
            <Image
                  alt='img'
                  width={500}
                  height={800}
                src={image}
                quality={100}
                style={{
                    position:"absolute",
                    top: "120px",
                    right: "50px",
                    transform: 'scale(1.2)',

                }}
              />
        </div>
    </section>
  )
}

export default FirstSection