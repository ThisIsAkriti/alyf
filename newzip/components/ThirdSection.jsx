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
    
        {/** Zoom animation */}
        
        gsap.to(imageRef.current, {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: imageRef.current, 
            start: 'top top',
            end: () =>`+=${scrollWidth - window.innerWidth}`,
            scrub: true,
            invalidateOnRefresh: true,
        },
        });



        {/** slide animation */}
        const textStartScroll = pinStart + 2.5 * V;
        const textEndScroll = pinStart + 1.5 * V;
        
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
   

         // Image trigger: Start when Section is fully in view, adjusted by imageOffset
        const imageStartScroll = pinStart + 3 * V;
        const imageEndScroll = pinStart + 3 * V;

        
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
                { x: "-200%", scale: 1.1 },
                { x: 0, duration: 2, ease: "power2.out" },
                0
            )
            .fromTo(
                imageRef.current,
                { scale: 1.1 },
                { scale: 1.2, duration: 0.5, ease: "power2.out" },
                1.5 // Delay of 1.5s
            );
        
    }, [containerRef]);

    
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
    )
}

export default ThirdSection
