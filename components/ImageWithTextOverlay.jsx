"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import heading from "../public/g10.svg";
import { useEffect, useState } from "react";
import menu from "../public/menu.svg";

const ImageWithTextOverlay = ({src, alt}) => {

      const [showText, setShowText] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true);
        }, 200);

        return () => clearTimeout(timer);
    }, []);
    
    const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };
    
  return (
    <div className="hero-section-wrapper">
          <Image
            fill
            alt={alt}
            src={src}
            quality={100}
            placeholder="blur"
            style={{ objectFit: "cover", objectPosition: " top right" }}   
          />

            {showText && ( 
            <motion.div
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="hero-text-overlay"
            >
                <div className="heading-text-img"> 
                    <Image 
                            width={124}
                            height={24}
                            alt="heading"
                            src={heading}
                            quality={100}
                              style={{ objectFit: "cover", textAlign: "center" }} 
                      />
                      
                      <div className="touch-text">GET IN TOUCH</div>

                    <div className="menu-container">
                      <Image
                          width={32}
                          height={32}
                          alt="hamburger menu"
                          src={menu}
                          quality={100}
                          style={{ objectFit: "cover" }}
                         className="menu" 
                      />
                      </div>
                </div>
                <div className="text-wrapper">
                    
                    <div className="center-text">
                    YOUR KEY TO <br/>
                    ALYF OF LUXURY
                    </div>
                    
                    <div className="explore-text">
                   EXPLORE PROPERTIES
                    </div>
                    
                </div>
                   
            </motion.div>
            )}
    </div>
  )
}

export default ImageWithTextOverlay
