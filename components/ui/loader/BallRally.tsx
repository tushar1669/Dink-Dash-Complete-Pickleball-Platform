'use client';

import { motion } from 'framer-motion';
import { useA11y } from '@/lib/a11y';

export function BallRally() {
  const { reducedMotion } = useA11y();

  if (reducedMotion) {
    return (
      <div className="flex items-center justify-center space-x-1">
        <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
        <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
        <div className="w-2 h-2 bg-accent-300 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 bg-accent-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
}