"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SecondSection from "./SecondSection"; // Adjust the import path as needed
import FirstSection from "./FirstSection";
import BgImageSection from "./BgImageSection";
import SlideImage from "./SlideImage";
import FixedImage from "./FixedImage";
import ThirdSection from "./ThirdSection";
import FourthSection from "./FourthSection";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollAnimation = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [horizontalTween, setHorizontalTween] = useState(null);
  
 useEffect(() => {
    const content = contentRef.current;
    const container = containerRef.current;

    const tween = gsap.to(content, {
      x: () => -(content.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => "+=" + (content.scrollWidth - window.innerWidth),
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    setHorizontalTween(tween);
  }, []);

  return (
    <section ref={containerRef} className="horizontal-slide-wrapper">
      <div className="slide-container">
        <div ref={contentRef} className="slide-content">
          <FirstSection containerRef={containerRef} />
          <BgImageSection containerRef={containerRef}/>
          <SecondSection containerRef={containerRef} /> 
          <SlideImage containerRef={containerRef} />
          <FixedImage/>
          <ThirdSection containerRef={containerRef}  horizontalTween={horizontalTween}  />
          <FourthSection containerRef={containerRef} horizontalTween={horizontalTween} />
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollAnimation;