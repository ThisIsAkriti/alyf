"use client"
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SecondSection({ containerRef}) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const V = window.innerWidth;
    // Calculate the scroll position when pinning starts
    const pinStart = window.scrollY + containerRef.current.getBoundingClientRect().top;

    // Image trigger
    const imageStartScroll = pinStart + 1.2 * V;
    const imageEndScroll = pinStart + 1.8 * V;

    const imageTl = gsap.timeline({
      scrollTrigger: {
        start: imageStartScroll,
        end: imageEndScroll,
        toggleActions: "play none none reverse",
      },
    });

    // Image animations
    imageTl
      .fromTo(
        imageRef.current,
        { x: "-200%", scale: 1.1 },
        { x: 0, duration: 1.5, ease: "power2.out" },
        0
      )
      .fromTo(
        imageRef.current,
        { scale: 1.1 },
        { scale: 1.2, duration: 0.5, ease: "power2.out" },
        1.5 // Delay of 1.5s
      );

    // Text trigger: Start when SecondSection is fully in view, adjusted by textOffset
    const textStartScroll = pinStart + 1.65 * V;
    const textEndScroll = pinStart + 2 * V;

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
      { y: 130 },
      { y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [containerRef]);

  return (
    <section ref={sectionRef} className="section2Wrapper">
      <div className="imageContainer">
        <img
          ref={imageRef}
          src="../imageSecton3.jpg"
          alt="image-slide"
          height={300}
          width={300}
        />
      </div>
      <div className="textContainer">
        <p className="subheading">Range Developments</p>
        <h2 className="heading">A NEW STANDARD OF EXCELLENCE</h2>
        <p ref={textRef} className="description">
          Each resort is a sanctuary of elegance, where meticulous attention to
          detail and bespoke services converge to create an unparalleled
          retreat. From stunning vistas to exquisite interiors, these high-end
          destinations redefine opulence, offering guests an immersive journey
          into the art of fine living.
        </p>
      </div>
    </section>
  );
}