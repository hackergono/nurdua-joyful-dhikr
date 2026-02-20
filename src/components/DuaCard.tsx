import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Copy } from "lucide-react";
import type { Dua } from "@/data/duas";
import { toast } from "sonner";

interface DuaCardProps {
  dua: Dua;
  compact?: boolean;
}

const DuaCard = ({ dua, compact = false }: DuaCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [liked, setLiked] = useState(false);

  const copyDua = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${dua.arabic}\n\n${dua.english}\n\n- ${dua.reference}`);
    toast.success("Dua copied ✨");
  };

  const shareDua = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: "NurDua",
        text: `${dua.arabic}\n\n${dua.english}\n\n- ${dua.reference}`,
      });
    } else {
      copyDua(e);
    }
  };

  return (
    <motion.div
      className={`relative cursor-pointer ${compact ? "min-h-[160px]" : "min-h-[220px]"}`}
      style={{ perspective: 1000 }}
      onClick={() => setIsFlipped(!isFlipped)}
      whileTap={{ scale: 0.98 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isFlipped ? (
          <motion.div
            key="front"
            className="nur-card p-5 h-full flex flex-col justify-between nur-glow-effect"
            initial={{ rotateY: 180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -180, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                {dua.category}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
                  className="p-1.5 rounded-full hover:bg-muted transition-colors"
                >
                  <Heart size={14} className={liked ? "fill-accent text-accent" : "text-muted-foreground"} />
                </button>
              </div>
            </div>
            <p className="font-arabic text-xl leading-loose text-foreground text-right nur-text-glow" dir="rtl">
              {dua.arabic}
            </p>
            <p className="text-[10px] text-muted-foreground mt-2">
              Tap to read translation →
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            className="nur-card p-5 h-full flex flex-col justify-between bg-primary text-primary-foreground"
            initial={{ rotateY: -180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 180, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div>
              <p className="text-sm leading-relaxed font-medium">{dua.english}</p>
              <p className="text-xs mt-3 opacity-80 italic">{dua.transliteration}</p>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[10px] opacity-60">{dua.reference}</span>
              <div className="flex gap-1">
                <button onClick={copyDua} className="p-1.5 rounded-full hover:bg-primary-foreground/10 transition-colors">
                  <Copy size={14} />
                </button>
                <button onClick={shareDua} className="p-1.5 rounded-full hover:bg-primary-foreground/10 transition-colors">
                  <Share2 size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DuaCard;
