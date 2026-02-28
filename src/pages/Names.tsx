import { useState, useMemo, memo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sparkles } from "lucide-react";
import { allahNames } from "@/data/allah-names";

const Names = () => {
  const [search, setSearch] = useState("");
  const [selectedName, setSelectedName] = useState<typeof allahNames[0] | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "orbit">("grid");

  const filtered = useMemo(() => {
    if (!search) return allahNames;
    const q = search.toLowerCase();
    return allahNames.filter(
      (n) =>
        n.english.toLowerCase().includes(q) ||
        n.transliteration.toLowerCase().includes(q) ||
        n.arabic.includes(search)
    );
  }, [search]);

  return (
    <div className="min-h-[100dvh] pb-20 pt-12 px-4">
      {/* Header */}
      <motion.div
        className="text-center mb-4 px-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground">99 Names of Allah</h1>
        <p className="text-sm text-muted-foreground mt-1">أسماء الله الحسنى</p>
      </motion.div>

      {/* View Toggle + Search */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search names..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-2 rounded-xl bg-card border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
          />
        </div>
        <button
          onClick={() => setViewMode(viewMode === "grid" ? "orbit" : "grid")}
          className="px-3 py-2 rounded-xl bg-card border border-border/50 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {viewMode === "grid" ? "✦ Galaxy" : "▦ Grid"}
        </button>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-3 gap-2">
          {filtered.map((name, i) => (
            <motion.button
              key={name.id}
              className="nur-card p-3 flex flex-col items-center text-center hover:nur-glow-effect transition-shadow"
              onClick={() => setSelectedName(name)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(i * 0.015, 0.6) }}
              whileTap={{ scale: 0.93 }}
            >
              <span className="font-arabic text-lg text-foreground nur-text-glow leading-tight">
                {name.arabic}
              </span>
              <span className="text-[9px] text-accent font-semibold mt-1.5 leading-tight">
                {name.transliteration}
              </span>
              <span className="text-[8px] text-muted-foreground mt-0.5 leading-tight">
                {name.english}
              </span>
            </motion.button>
          ))}
        </div>
      )}

      {/* Galaxy View */}
      {viewMode === "orbit" && (
        <div className="relative flex items-center justify-center rounded-2xl" style={{ height: "75vh", width: "100%", overflow: "hidden", background: "radial-gradient(ellipse at center, hsl(var(--nur-teal) / 0.08) 0%, transparent 70%)" }}>
          {/* Stars background */}
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full bg-accent/40"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `pulse-glow ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
                opacity: 0.3 + Math.random() * 0.5,
              }}
            />
          ))}
          {/* Center "Allah" */}
          <div className="absolute z-10 w-24 h-24 rounded-full flex items-center justify-center nur-gradient shadow-2xl animate-pulse-glow">
            <span className="font-arabic text-3xl text-primary-foreground">ٱللَّٰهُ</span>
          </div>

          {/* Golden angle spiral layout */}
          {filtered.slice(0, 99).map((name, idx) => {
            const goldenAngle = 137.508;
            const angle = idx * goldenAngle;
            const rad = (angle * Math.PI) / 180;
            const maxRadius = Math.min(window.innerWidth * 0.33, 135);
            const radius = 28 + Math.sqrt(idx / 99) * maxRadius;
            const cx = Math.cos(rad) * radius;
            const cy = Math.sin(rad) * radius;

            const dotSize = idx < 12 ? 42 : idx < 33 ? 34 : 26;
            const fontSize = idx < 12 ? 8 : idx < 33 ? 6.5 : 5.5;

            const floatDelay = (idx % 7) * 0.4;

            return (
              <button
                key={name.id}
                className="absolute rounded-full bg-card border border-border/50 flex items-center justify-center shadow-md cursor-pointer z-20 transition-transform active:scale-125"
                style={{
                  width: dotSize,
                  height: dotSize,
                  left: `calc(50% + ${cx}px - ${dotSize / 2}px)`,
                  top: `calc(50% + ${cy}px - ${dotSize / 2}px)`,
                  animation: `float 3s ease-in-out ${floatDelay}s infinite`,
                  willChange: "transform",
                }}
                onClick={() => setSelectedName(name)}
              >
                <span className="text-foreground font-bold leading-none text-center" style={{ fontSize }}>
                  {name.transliteration.replace(/^(Al-|Ar-|As-|Ash-|Adh-|Ad-|At-)/, "")}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No names found</p>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedName && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setSelectedName(null)} />
            <motion.div
              className="relative nur-card p-6 w-full max-w-sm nur-glow-effect"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                onClick={() => setSelectedName(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                <X size={14} className="text-muted-foreground" />
              </button>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full nur-gold-gradient mb-3">
                  <span className="text-sm font-bold text-foreground">{selectedName.id}</span>
                </div>
                <p className="font-arabic text-4xl text-foreground nur-text-glow mb-3" dir="rtl">
                  {selectedName.arabic}
                </p>
                <p className="text-base font-semibold text-primary">{selectedName.transliteration}</p>
                <p className="text-sm text-muted-foreground mt-1">{selectedName.english}</p>

                <div className="mt-5 flex items-center justify-center gap-1 text-xs text-accent">
                  <Sparkles size={12} />
                  <span>Tap card to close</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Names;
