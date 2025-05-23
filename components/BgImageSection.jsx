import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BgImageSection = ({ containerRef }) => {
  const imageRef = useRef(null);

  useEffect(() => {
  
    if (!containerRef?.current) {
      console.warn('containerRef.current is undefined. Ensure containerRef is passed correctly.');
      return;
    }

    // Get the parent content element to calculate scrollWidth
    const content = imageRef.current?.parentElement?.parentElement; // .slide-content
    if (!content) {
      console.warn('Could not find parent content element.');
      return;
    }

    const scrollWidth = content.scrollWidth;

    // Animate the scale of the image container
    gsap.to(imageRef.current, {
      scale: 1.8,
      ease: 'none',
      scrollTrigger: {
        trigger: imageRef.current, // Use the passed containerRef
        start: 'top top',
        end: () => `+=${scrollWidth - window.innerWidth}`,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  }, [containerRef]);

  return (
    <div className="bg-image-wrapper">
      <div ref={imageRef} className="image-container" />
    </div>
  );
};

export default BgImageSection;
