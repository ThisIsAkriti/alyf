"use client";

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import StartingAnimation from '../components/StartingAnimation';
import LoadingIndicator from '../components/LoadingIndicator';
import ImageWithTextOverlay from '../components/ImageWithTextOverlay';
import image from "../public/mainImage.png";
import HorizontalScrollAnimation from '../components/HorizontalScrollAnimation';
import StaticBg from '@/components/StaticBg';

export default function Home() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [hideLoadingIndicator, setHideLoadingIndicator] = useState(false);
  const rightTexts = ["dreamspace", "vacation home", "weekend getaway"];
  const loadingDuration = rightTexts.length * 1.5 - 0;

  const handleAnimationComplete = () => setShowAnimation(false);
  const handleLoadingComplete = () => setHideLoadingIndicator(true);

  return (
    <div>
      {showAnimation && !hideLoadingIndicator && (
        <LoadingIndicator totalDuration={loadingDuration} onComplete={handleLoadingComplete} />
      )}
      <AnimatePresence>
        {showAnimation && (
          <StartingAnimation rightTexts={rightTexts} onComplete={handleAnimationComplete} />
        )}
      </AnimatePresence>
  
      <StaticBg/>
      <main>
        <ImageWithTextOverlay src={image} alt="background image" />
        <HorizontalScrollAnimation />
        <div
        style={{
          height: "100vh",
          background: "transparent",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      </div>
      </main>
    </div>
  );
}
