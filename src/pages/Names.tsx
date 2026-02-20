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
    <div className="min-h-screen pb-24 pt-14 px-4">
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
        <div className="relative flex items-center justify-center" style={{ height: "65vh" }}>
          {/* Center "Allah" */}
          <motion.div
            className="absolute z-10 w-20 h-20 rounded-full flex items-center justify-center nur-gradient shadow-2xl"
            animate={{ boxShadow: [
              "0 0 20px hsl(var(--nur-gold) / 0.3)",
              "0 0 40px hsl(var(--nur-gold) / 0.6)",
              "0 0 20px hsl(var(--nur-gold) / 0.3)",
            ]}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="font-arabic text-2xl text-primary-foreground">ٱللَّٰهُ</span>
          </motion.div>

          {/* Orbital rings */}
          {[1, 2, 3].map((ring) => (
            <div
              key={ring}
              className="absolute rounded-full border border-border/30"
              style={{
                width: ring * 150 + 60,
                height: ring * 150 + 60,
              }}
            />
          ))}

          {/* Orbiting names */}
          {filtered.slice(0, 99).map((name, i) => {
            const ring = i < 12 ? 1 : i < 36 ? 2 : 3;
            const ringCount = ring === 1 ? 12 : ring === 2 ? 24 : 63;
            const ringStart = ring === 1 ? 0 : ring === 2 ? 12 : 36;
            const indexInRing = i - ringStart;
            const angle = (indexInRing / ringCount) * 360;
            const radius = ring * 75 + 30;
            const speed = 60 + ring * 30;

            return (
              <motion.button
                key={name.id}
                className="absolute z-20"
                style={{
                  width: ring === 1 ? 40 : ring === 2 ? 32 : 26,
                  height: ring === 1 ? 40 : ring === 2 ? 32 : 26,
                }}
                animate={{
                  rotate: [angle, angle + 360],
                }}
                transition={{
                  duration: speed,
                  repeat: Infinity,
                  ease: "linear",
                }}
                onClick={() => setSelectedName(name)}
              >
                <motion.div
                  className="w-full h-full rounded-full bg-card border border-border/50 flex items-center justify-center shadow-md hover:nur-glow-effect cursor-pointer"
                  style={{
                    transform: `translateX(${radius}px)`,
                  }}
                  animate={{ rotate: [-(angle), -(angle + 360)] }}
                  transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                  whileHover={{ scale: 1.4 }}
                >
                  <span className="font-arabic text-foreground" style={{ fontSize: ring === 1 ? 11 : ring === 2 ? 9 : 7 }}>
                    {name.arabic.split(" ")[0]}
                  </span>
                </motion.div>
              </motion.button>
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
