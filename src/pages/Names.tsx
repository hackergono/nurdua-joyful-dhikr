import { useState, useMemo } from "react";
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
          {viewMode === "grid" ? "✦ Orbit" : "▦ Grid"}
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

      {/* Orbit View */}
      {viewMode === "orbit" && (
        <div className="relative flex items-center justify-center" style={{ height: "75vh", width: "100%", overflow: "hidden" }}>
          {/* Center "Allah" */}
          <motion.div
            className="absolute z-10 w-24 h-24 rounded-full flex items-center justify-center nur-gradient shadow-2xl"
            animate={{ boxShadow: [
              "0 0 20px hsl(var(--nur-gold) / 0.3)",
              "0 0 50px hsl(var(--nur-gold) / 0.6)",
              "0 0 20px hsl(var(--nur-gold) / 0.3)",
            ]}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="font-arabic text-3xl text-primary-foreground">ٱللَّٰهُ</span>
          </motion.div>

          {/* Orbital rings */}
          {[1, 2, 3].map((ring) => {
            const r = ring * 90 + 40;
            return (
              <div
                key={ring}
                className="absolute rounded-full border border-border/30"
                style={{ width: r * 2, height: r * 2 }}
              />
            );
          })}

          {/* Orbiting names */}
          {[1, 2, 3].map((ring) => {
            const ringRadius = ring * 90 + 40;
            const ringSize = ringRadius * 2 + 60;
            const speed = 60 + ring * 30;
            const namesPerRing = ring === 1 ? 10 : ring === 2 ? 20 : 33;
            const startIdx = ring === 1 ? 0 : ring === 2 ? 10 : 30;
            const ringNames = filtered.slice(startIdx, startIdx + namesPerRing);
            const dotSize = ring === 1 ? 44 : ring === 2 ? 36 : 30;
            const fontSize = ring === 1 ? 14 : ring === 2 ? 11 : 9;

            return (
              <motion.div
                key={ring}
                className="absolute z-20"
                style={{ width: ringSize, height: ringSize }}
                animate={{ rotate: [0, ring % 2 === 0 ? -360 : 360] }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
              >
                {ringNames.map((name, idx) => {
                  const angle = (idx / ringNames.length) * 360;
                  const rad = (angle * Math.PI) / 180;
                  const cx = ringSize / 2;
                  const cy = ringSize / 2;
                  const x = Math.cos(rad) * ringRadius + cx - dotSize / 2;
                  const y = Math.sin(rad) * ringRadius + cy - dotSize / 2;

                  return (
                    <motion.button
                      key={name.id}
                      className="absolute rounded-full bg-card border border-border/50 flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg hover:border-primary/40 transition-shadow"
                      style={{
                        width: dotSize,
                        height: dotSize,
                        left: x,
                        top: y,
                      }}
                      animate={{ rotate: ring % 2 === 0 ? [0, 360] : [0, -360] }}
                      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                      onClick={() => setSelectedName(name)}
                      whileTap={{ scale: 1.4 }}
                    >
                      <span className="font-arabic text-foreground font-bold" style={{ fontSize }}>
                        {name.arabic.split(" ")[0]}
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>
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
