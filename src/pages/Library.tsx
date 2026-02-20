import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import DuaCard from "@/components/DuaCard";
import { duas, categories } from "@/data/duas";

const Library = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    return duas.filter((dua) => {
      const matchesSearch =
        !search ||
        dua.english.toLowerCase().includes(search.toLowerCase()) ||
        dua.transliteration.toLowerCase().includes(search.toLowerCase()) ||
        dua.arabic.includes(search) ||
        dua.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || dua.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-[100dvh] pb-20 pt-12 px-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground mb-1">Dua Library</h1>
        <p className="text-sm text-muted-foreground mb-4">{duas.length} authentic duas</p>
      </motion.div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search duas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
        />
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-like grid */}
      <div className="columns-1 sm:columns-2 gap-3 space-y-3">
        {filtered.map((dua, i) => (
          <motion.div
            key={dua.id}
            className="break-inside-avoid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.05, 0.5) }}
          >
            <DuaCard dua={dua} compact />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No duas found</p>
          <p className="text-xs text-muted-foreground mt-1">Try a different search term</p>
        </div>
      )}
    </div>
  );
};

export default Library;
