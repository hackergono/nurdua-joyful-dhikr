import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ChevronLeft, ChevronRight, Check, Sun, Moon, Star } from "lucide-react";
import { dhikrList } from "@/data/duas";
import { morningAzkar, eveningAzkar, nightAzkar } from "@/data/azkar";
import { useLocalStorage } from "@/hooks/use-local-storage";
import ParticleBurst from "@/components/ParticleBurst";
import { toast } from "sonner";

type TabMode = "counter" | "morning" | "evening" | "night";

const Dhikr = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useLocalStorage("nur-total-count", 0);
  const [particleTrigger, setParticleTrigger] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabMode>("counter");
  const containerRef = useRef<HTMLDivElement>(null);

  const current = dhikrList[currentIndex];
  const progress = Math.min((count / current.target) * 100, 100);

  const handleTap = useCallback(() => {
    if (completed) return;
    const newCount = count + 1;
    setCount(newCount);
    setTotalCount((prev: number) => prev + 1);
    setParticleTrigger((p) => p + 1);
    if (navigator.vibrate) navigator.vibrate(15);
    if (newCount >= current.target) {
      setCompleted(true);
      toast.success(`Completed ${current.transliteration}! ✨`, {
        description: "MashaAllah, keep going!",
      });
    }
  }, [count, current.target, current.transliteration, completed, setTotalCount]);

  const reset = () => { setCount(0); setCompleted(false); };
  const nextDhikr = () => { setCurrentIndex((i) => (i + 1) % dhikrList.length); reset(); };
  const prevDhikr = () => { setCurrentIndex((i) => (i - 1 + dhikrList.length) % dhikrList.length); reset(); };

  const getAzkarList = () => {
    if (activeTab === "morning") return morningAzkar;
    if (activeTab === "evening") return eveningAzkar;
    if (activeTab === "night") return nightAzkar;
    return [];
  };
  const azkarList = getAzkarList();

  const getTitle = () => {
    if (activeTab === "morning") return "Morning Azkar";
    if (activeTab === "evening") return "Evening Azkar";
    return "Night Azkar";
  };

  const getSubtitle = () => {
    if (activeTab === "morning") return "أذكار الصباح";
    if (activeTab === "evening") return "أذكار المساء";
    return "أذكار النوم";
  };

  return (
    <div className="min-h-[100dvh] flex flex-col pb-20 pt-12 px-4">
      {/* Tab Switcher */}
      <div className="flex gap-1 mb-4 bg-muted rounded-xl p-1">
        <button
          onClick={() => setActiveTab("counter")}
          className={`flex-1 py-2 rounded-lg text-[10px] font-semibold transition-all ${
            activeTab === "counter"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          Counter
        </button>
        <button
          onClick={() => setActiveTab("morning")}
          className={`flex-1 flex items-center justify-center gap-0.5 py-2 rounded-lg text-[10px] font-semibold transition-all ${
            activeTab === "morning"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          <Sun size={10} /> Morning
        </button>
        <button
          onClick={() => setActiveTab("evening")}
          className={`flex-1 flex items-center justify-center gap-0.5 py-2 rounded-lg text-[10px] font-semibold transition-all ${
            activeTab === "evening"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          <Moon size={10} /> Evening
        </button>
        <button
          onClick={() => setActiveTab("night")}
          className={`flex-1 flex items-center justify-center gap-0.5 py-2 rounded-lg text-[10px] font-semibold transition-all ${
            activeTab === "night"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          <Star size={10} /> Night
        </button>
      </div>

      {activeTab === "counter" && (
        <div className="flex flex-col items-center flex-1">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold text-foreground">Dhikr Counter</h1>
            <p className="text-sm text-muted-foreground mt-1">Tap the circle to count</p>
          </motion.div>

          <div className="flex items-center gap-4 mb-6 w-full max-w-sm">
            <button onClick={prevDhikr} className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors active:scale-95">
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
                <p className="text-xs text-accent mt-1 italic">{current.transliteration}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{current.english}</p>
              </motion.div>
            </AnimatePresence>
            <button onClick={nextDhikr} className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors active:scale-95">
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>
          </div>

          <div className="relative" ref={containerRef}>
            <motion.button
              className="relative w-48 h-48 rounded-full flex items-center justify-center cursor-pointer select-none"
              style={{
                background: `conic-gradient(hsl(var(--nur-teal)) ${progress}%, hsl(var(--border)) ${progress}%)`,
              }}
              onClick={handleTap}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <div className="w-40 h-40 rounded-full bg-card flex flex-col items-center justify-center shadow-inner">
                {completed ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Check size={40} className="text-primary" />
                  </motion.div>
                ) : (
                  <>
                    <motion.span key={count} className="text-5xl font-bold text-primary" initial={{ scale: 1.3 }} animate={{ scale: 1 }} transition={{ duration: 0.15 }}>
                      {count}
                    </motion.span>
                    <span className="text-xs text-muted-foreground mt-1">/ {current.target}</span>
                  </>
                )}
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <ParticleBurst trigger={particleTrigger} x={0} y={0} />
              </div>
            </motion.button>
          </div>

          <motion.button
            className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors text-sm active:scale-95"
            onClick={reset}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={14} />
            Reset
          </motion.button>

          <p className="mt-3 text-xs text-muted-foreground">
            Lifetime total: <span className="font-semibold text-primary">{totalCount.toLocaleString()}</span>
          </p>

          <div className="flex gap-1.5 mt-4 flex-wrap justify-center max-w-xs">
            {Array.from({ length: current.target }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full transition-colors"
                style={{
                  background: i < count ? `hsl(var(--nur-teal))` : `hsl(var(--border))`,
                }}
                animate={i === count - 1 ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Morning / Evening / Night Azkar */}
      {(activeTab === "morning" || activeTab === "evening" || activeTab === "night") && (
        <div className="flex-1">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              {activeTab === "morning" ? <Sun size={18} className="text-accent" /> : activeTab === "evening" ? <Moon size={18} className="text-accent" /> : <Star size={18} className="text-accent" />}
              {getTitle()}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {azkarList.length} duas · {getSubtitle()}
            </p>
          </motion.div>

          <div className="space-y-3">
            {azkarList.map((item, i) => (
              <motion.div
                key={item.id}
                className="nur-card p-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.5) }}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[10px] font-bold text-accent bg-accent/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {item.repeat}
                  </span>
                </div>
                <p className="font-arabic text-lg leading-loose text-foreground text-right nur-text-glow mb-2" dir="rtl">
                  {item.arabic}
                </p>
                <p className="text-xs text-accent italic leading-relaxed mb-2">
                  {item.transliteration}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.english}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dhikr;
