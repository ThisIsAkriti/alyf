import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 

gsap.registerPlugin(ScrollTrigger);
const ThirdSection = ({ containerRef }) => {

    const imageRef = useRef(null);
    const textRef = useRef(null);
    
    useEffect(() => {
        // Ensure containerRef.current exists
        if (!containerRef?.current) {
        console.warn('containerRef.current is undefined. Ensure containerRef is passed correctly.');
        return;
        }

        const V = window.innerWidth;
        // Calculate the scroll position when pinning starts
        const pinStart = window.scrollY + containerRef.current.getBoundingClientRect().top;

        // Get the parent content element to calculate scrollWidth
        const content = imageRef.current?.parentElement?.parentElement; // .slide-content
        if (!content) {
        console.warn('Could not find parent content element.');
        return;
        }

        const scrollWidth = content.scrollWidth;

        // Animate the scale of the image container
        gsap.to(imageRef.current, {
        scale: 1.3,
        ease: 'none',
        scrollTrigger: {
            trigger: imageRef.current, // Use the passed containerRef
            start: 'top top',
            end: () => `+=${scrollWidth - window.innerWidth}`,
            scrub: true,
            invalidateOnRefresh: true,
        },
        });

        const textStartScroll = pinStart + 3.5 * V;
        const textEndScroll = pinStart + 2 * V;
        
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
            { y: 0, duration: 1, ease: "power2.out" },
            0.5 // Delay of 0.5s
        );
    }, [containerRef]);

    
    return (
        <section className='third-section-wrapper'>
            <div className='text-section'>
                <div className='text-reveal-wrapper'>
                    <h1 ref={textRef}>Inter <br/> Continental <br/>Dominica</h1>
                </div> 
                
                <p>
                    Nestled by Douglas Bay and Cabrits National Park, InterContinental Dominica blends modern luxury with nature, offering guests a unique, unforgettable escape.
                </p>
            </div>
            <div className="third-section-image-wrapper">
                <div ref={imageRef} className="image-container" />
            </div>
        </section>
    )
}

export default ThirdSection
