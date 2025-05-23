import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/_scss/pages/_startingAnimation.module.scss';

const welcomeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } }
};

const textVariants = {
  initial: (index) => ({
    opacity: 0,
    y: index === 0 ? 0 : 50
  }),
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease:"easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease:"easeIn" }}
};

const halfVariants = {
  texts: { x: 0 },
  split: (isLeft) => ({
    x: isLeft ? '-100%' : '100%',
    transition: { duration: 1.5 }
  })
};

const lineVariants = {
  initial: { height: 0, opacity: 0.3, width: '1px' },
  animate: { height: '50vh', opacity: 0.3, width: '1px', transition: { height: { duration: 0.5 } } },
  split: { width: '100%', height: '50vh', opacity: 0, transition: { width: { duration: 1 }, opacity: { duration: 0.3 } } }
};

const keyImageVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
};

const StartingAnimation = ({ rightTexts, onComplete }) => {
  const [rightTextIndex, setRightTextIndex] = useState(0);
  const [phase, setPhase] = useState('cycling');

  useEffect(() => {
    if (phase === 'cycling') {
      const timer = setTimeout(() => {
        if (rightTextIndex < rightTexts.length - 1) {
          setRightTextIndex(rightTextIndex + 1);
        } else {
          setPhase('keyopen');
        }
     }, 1500);
     return () => clearTimeout(timer);
    } else if (phase === 'keyopen') {
     const timer = setTimeout(() => {
       setPhase('line');
     }, 500);
      return () => clearTimeout(timer);
    } else if (phase === 'line') {
      const timer = setTimeout(() => {
       setPhase('split');
     }, 500);
      return () => clearTimeout(timer);
    }
  }, [rightTextIndex, phase, rightTexts]);

  return (
    <div className={styles.overlay}>
      <motion.div
        className={styles.leftHalf}
        variants={halfVariants}
        animate={phase === 'split' ? 'split' : 'texts'}
        custom={true}
      >
        <motion.div
          className={styles.leftText}
          variants={welcomeVariants}
          initial="initial"
          animate="animate"
        >
          Unlock your
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.rightHalf}
        variants={halfVariants}
        animate={phase === 'split' ? 'split' : 'texts'}
        custom={false}
        onAnimationComplete={() => {
          if (phase === 'split') {
            onComplete();
          }
        }}
      >
        <div className={styles.rightWrapper}>
          <AnimatePresence mode='wait'>
            <motion.div
              key={rightTextIndex}
              className={styles.rightText}
              custom={rightTextIndex}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {rightTexts[rightTextIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div className={styles.keyholeContainer}>
        <motion.img
          src="/loading/keyopen.svg"
          alt="Key Opened"
          className={styles.keyopenImage}
          variants={keyImageVariants}
          initial="hidden"
          animate={phase === 'cycling' || phase === 'split' ? 'hidden' : 'visible'}
          transition={{ duration: 0.3 }}
        />
        <motion.img
          src="/loading/keyhole.svg"
          alt="Keyhole"
          className={styles.keyholeImage}
          variants={keyImageVariants}
          initial="visible"
          animate={phase === 'split' ? 'hidden' : 'visible'}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      <AnimatePresence>
        {(phase === 'line' || phase === 'split') && (
          <>
            <motion.div
              key="lineTop"
              className={styles.lineTop}
              variants={lineVariants}
              initial="initial"
              animate={phase === 'line' ? 'animate' : 'split'}
            />
            <motion.div
              key="lineBottom"
              className={styles.lineBottom}
              variants={lineVariants}
              initial="initial"
              animate={phase === 'line' ? 'animate' : 'split'}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StartingAnimation;