import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { dhikrList } from "@/data/duas";
import { useLocalStorage } from "@/hooks/use-local-storage";
import ParticleBurst from "@/components/ParticleBurst";
import { toast } from "sonner";

const Dhikr = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useLocalStorage("nur-total-count", 0);
  const [particleTrigger, setParticleTrigger] = useState(0);
  const [completed, setCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = dhikrList[currentIndex];
  const progress = Math.min((count / current.target) * 100, 100);

  const handleTap = useCallback(() => {
    if (completed) return;

    const newCount = count + 1;
    setCount(newCount);
    setTotalCount((prev: number) => prev + 1);
    setParticleTrigger((p) => p + 1);

    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate(15);

    if (newCount >= current.target) {
      setCompleted(true);
      toast.success(`Completed ${current.transliteration}! ✨`, {
        description: "MashaAllah, keep going!",
      });
    }
  }, [count, current.target, current.transliteration, completed, setTotalCount]);

  const reset = () => {
    setCount(0);
    setCompleted(false);
  };

  const nextDhikr = () => {
    setCurrentIndex((i) => (i + 1) % dhikrList.length);
    reset();
  };

  const prevDhikr = () => {
    setCurrentIndex((i) => (i - 1 + dhikrList.length) % dhikrList.length);
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col items-center pb-24 pt-14 px-6">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground">Dhikr Counter</h1>
        <p className="text-sm text-muted-foreground mt-1">Tap the circle to count</p>
      </motion.div>

      {/* Dhikr Selector */}
      <div className="flex items-center gap-4 mb-8 w-full max-w-sm">
        <button onClick={prevDhikr} className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
          <ChevronLeft size={18} className="text-muted-foreground" />
        </button>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="flex-1 text-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <p className="font-arabic text-2xl text-foreground nur-text-glow" dir="rtl">
              {current.arabic}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{current.english}</p>
          </motion.div>
        </AnimatePresence>
        <button onClick={nextDhikr} className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
      </div>

      {/* Counter Circle */}
      <div className="relative" ref={containerRef}>
        <motion.button
          className="relative w-52 h-52 rounded-full flex items-center justify-center cursor-pointer select-none"
          style={{
            background: `conic-gradient(hsl(var(--nur-teal)) ${progress}%, hsl(var(--border)) ${progress}%)`,
          }}
          onClick={handleTap}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          <div className="w-44 h-44 rounded-full bg-card flex flex-col items-center justify-center shadow-inner">
            {completed ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Check size={40} className="text-primary" />
              </motion.div>
            ) : (
              <>
                <motion.span
                  key={count}
                  className="text-5xl font-bold text-primary"
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {count}
                </motion.span>
                <span className="text-xs text-muted-foreground mt-1">/ {current.target}</span>
              </>
            )}
          </div>

          {/* Particle burst */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <ParticleBurst trigger={particleTrigger} x={0} y={0} />
          </div>
        </motion.button>
      </div>

      {/* Reset button */}
      <motion.button
        className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors text-sm"
        onClick={reset}
        whileTap={{ scale: 0.95 }}
      >
        <RotateCcw size={14} />
        Reset
      </motion.button>

      {/* Session total */}
      <p className="mt-4 text-xs text-muted-foreground">
        Lifetime total: <span className="font-semibold text-primary">{totalCount.toLocaleString()}</span>
      </p>

      {/* Bead strip */}
      <div className="flex gap-1.5 mt-6 flex-wrap justify-center max-w-xs">
        {Array.from({ length: current.target }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full transition-colors"
            style={{
              background: i < count
                ? `hsl(var(--nur-teal))`
                : `hsl(var(--border))`,
            }}
            animate={i === count - 1 ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Dhikr;
