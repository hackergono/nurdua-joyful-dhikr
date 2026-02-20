import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown, ChevronUp, Star } from "lucide-react";
import { islamBasics } from "@/data/islam-basics";
import wuduStepsImg from "@/assets/wudu-steps.png";

const Learn = () => {
  const [expandedId, setExpandedId] = useState<string | null>("shahada");

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-[100dvh] pb-20 pt-12 px-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={20} className="text-accent" />
          <h1 className="text-2xl font-bold text-foreground">Learn Islam</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Foundations of faith — simple & beautiful
        </p>
      </motion.div>

      <div className="space-y-3">
        {islamBasics.map((topic, i) => {
          const isOpen = expandedId === topic.id;
          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.4) }}
            >
              <div className="nur-card overflow-hidden">
                <button
                  onClick={() => toggle(topic.id)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-lg nur-gradient flex items-center justify-center shrink-0">
                      <Star size={14} className="text-primary-foreground" />
                    </div>
                    <span className="font-semibold text-sm text-foreground truncate">
                      {topic.title}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-muted-foreground shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3">
                        {topic.arabic && (
                          <div className="bg-muted/50 rounded-xl p-3 text-center space-y-1">
                            <p className="font-arabic text-lg text-foreground nur-text-glow" dir="rtl">
                              {topic.arabic}
                            </p>
                            <p className="text-xs text-accent italic">{topic.transliteration}</p>
                          </div>
                        )}

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {topic.description}
                        </p>

                        {topic.image === "wudu-steps" && (
                          <img
                            src={wuduStepsImg}
                            alt="Steps of Wudu - Ablution"
                            className="w-full rounded-xl border border-border/50"
                            loading="lazy"
                          />
                        )}

                        {topic.items && (
                          <div className="space-y-2">
                            {topic.items.map((item, j) => (
                              <motion.div
                                key={j}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.05 }}
                                className="bg-muted/30 rounded-lg p-3"
                              >
                                <div className="flex items-start gap-2">
                                  <span className="text-[10px] font-bold text-accent bg-accent/10 w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                    {j + 1}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="font-arabic text-sm text-foreground" dir="rtl">
                                        {item.arabic}
                                      </span>
                                      <span className="text-xs text-accent italic">
                                        {item.transliteration}
                                      </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                      {item.english}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Learn;
