import { motion } from 'motion/react';
import { AudioVisualPortfolio } from '../components/AudioVisualPortfolio';
import { TechPortfolio } from '../components/TechPortfolio';
import { AdminProvider, useAdmin } from '../context/AdminContext';


export function Portfolio() {
  const { isAdmin } = useAdmin();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col"
    >
      <TechPortfolio />
      <div className="h-px w-full bg-white/5 my-10" />
      <AudioVisualPortfolio isAdmin={isAdmin} />    
      </motion.div>
  );
}