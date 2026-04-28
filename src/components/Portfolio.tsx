import { motion } from 'motion/react';
import { AudioVisualPortfolio } from '../components/AudioVisualPortfolio';
import { TechPortfolio } from '../components/TechPortfolio';


export function Portfolio() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col"
    >
      <TechPortfolio />
      <div className="h-px w-full bg-white/5 my-10" />
      <AudioVisualPortfolio />
    </motion.div>
  );
}