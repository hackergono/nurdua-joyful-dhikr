import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
}

interface ParticleBurstProps {
  trigger: number;
  x?: number;
  y?: number;
}

const ParticleBurst = ({ trigger, x = 0, y = 0 }: ParticleBurstProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const newParticles: Particle[] = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (i / 8) * 360,
      distance: 30 + Math.random() * 40,
      size: 3 + Math.random() * 5,
    }));
    setParticles(newParticles);
    const timer = setTimeout(() => setParticles([]), 700);
    return () => clearTimeout(timer);
  }, [trigger, x, y]);

  return (
    <AnimatePresence>
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.distance;
        const ty = Math.sin(rad) * p.distance;
        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              background: `hsl(var(--nur-gold))`,
            }}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: 0, x: tx, y: ty, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        );
      })}
    </AnimatePresence>
  );
};

export default ParticleBurst;
