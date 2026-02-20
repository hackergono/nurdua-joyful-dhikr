import { motion } from "framer-motion";

interface GrowingTreeProps {
  level: number; // 0-10 based on daily count
}

const GrowingTree = ({ level }: GrowingTreeProps) => {
  const clampedLevel = Math.min(Math.max(level, 0), 10);
  const trunkHeight = 30 + clampedLevel * 8;
  const canopySize = 20 + clampedLevel * 12;
  const leafCount = Math.min(clampedLevel * 3, 25);

  return (
    <div className="relative flex flex-col items-center justify-end h-48 w-48">
      {/* Canopy */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: canopySize,
          height: canopySize,
          background: `radial-gradient(circle, hsl(var(--nur-sage)) 0%, hsl(var(--nur-sage-dark)) 100%)`,
          bottom: trunkHeight + 20,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      />

      {/* Extra canopy layers for higher levels */}
      {clampedLevel >= 3 && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: canopySize * 0.7,
            height: canopySize * 0.7,
            background: `radial-gradient(circle, hsl(var(--nur-sage)) 0%, hsl(var(--nur-sage-dark)) 100%)`,
            bottom: trunkHeight + 25 + canopySize * 0.3,
            left: `calc(50% - ${canopySize * 0.5}px)`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        />
      )}

      {clampedLevel >= 6 && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: canopySize * 0.6,
            height: canopySize * 0.6,
            background: `radial-gradient(circle, hsl(var(--nur-sage)) 0%, hsl(var(--nur-sage-dark)) 100%)`,
            bottom: trunkHeight + 25 + canopySize * 0.3,
            right: `calc(50% - ${canopySize * 0.5}px)`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        />
      )}

      {/* Golden fruits/lights for high levels */}
      {Array.from({ length: Math.min(clampedLevel, 5) }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full animate-pulse-glow"
          style={{
            width: 6,
            height: 6,
            background: `hsl(var(--nur-gold))`,
            bottom: trunkHeight + 25 + Math.random() * canopySize * 0.6,
            left: `calc(50% + ${(Math.random() - 0.5) * canopySize * 0.8}px)`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1 }}
        />
      ))}

      {/* Trunk */}
      <motion.div
        className="rounded-t-md"
        style={{
          width: 8 + clampedLevel * 0.5,
          height: trunkHeight,
          background: `linear-gradient(to top, hsl(25, 40%, 30%), hsl(25, 35%, 40%))`,
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Ground */}
      <div
        className="w-24 h-3 rounded-full"
        style={{
          background: `radial-gradient(ellipse, hsl(var(--nur-sage-dark) / 0.3) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};

export default GrowingTree;
