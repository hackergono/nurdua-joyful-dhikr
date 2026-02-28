import { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Moon, Sun, Star } from "lucide-react";
import DuaCard from "@/components/DuaCard";
import GrowingTree from "@/components/GrowingTree";
import { duas } from "@/data/duas";
import { morningAzkar, eveningAzkar } from "@/data/azkar";
import { useLocalStorage } from "@/hooks/use-local-storage";
import heroPattern from "@/assets/hero-pattern.jpg";

const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
};

const Home = () => {
  const [totalCount] = useLocalStorage("nur-total-count", 0);
  const [streak] = useLocalStorage("nur-streak", 0);

  const hour = new Date().getHours();
  const isEvening = hour >= 17 || hour < 5;
  const greeting = "السلام عليكم ✨";

  const dayIndex = getDayOfYear();

  // Daily rotating duas - pick 3 based on day of year
  const dailyDuas = useMemo(() => {
    const offset = (dayIndex * 3) % duas.length;
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(duas[(offset + i) % duas.length]);
    }
    return result;
  }, [dayIndex]);

  // Daily rotating azkar - pick 2 based on time + day
  const dailyAzkar = useMemo(() => {
    const list = isEvening ? eveningAzkar : morningAzkar;
    const offset = (dayIndex * 2) % list.length;
    return [list[offset % list.length], list[(offset + 1) % list.length]];
  }, [dayIndex, isEvening]);

  const treeLevel = Math.min(Math.floor(totalCount / 33), 10);

  return (
    <div className="min-h-[100dvh] pb-20">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url(${heroPattern})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative px-6 pt-14 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={18} className="text-accent" />
              <span className="text-sm text-muted-foreground font-medium">{greeting}</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">NurDua</h1>
            <p className="text-muted-foreground text-sm mt-1">Your daily companion for duas & dhikr</p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex gap-3 mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="nur-card flex-1 p-3 text-center">
              <p className="text-2xl font-bold text-primary">{totalCount.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Dhikr</p>
            </div>
            <div className="nur-card flex-1 p-3 text-center">
              <div className="flex items-center justify-center gap-1">
                <Sparkles size={14} className="text-accent" />
                <p className="text-2xl font-bold text-primary">{streak}</p>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Day Streak</p>
            </div>
            <div className="nur-card flex-1 p-3 flex items-center justify-center">
              <GrowingTree level={treeLevel} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Daily Azkar */}
      <div className="px-6 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-1.5">
            {isEvening ? <Moon size={16} className="text-accent" /> : <Sun size={16} className="text-accent" />}
            {isEvening ? "Evening Azkar" : "Morning Azkar"}
          </h2>
          <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            <Star size={8} className="inline mr-0.5" /> Daily
          </span>
        </div>
        <div className="space-y-3">
          {dailyAzkar.map((item, i) => (
            <motion.div
              key={item.id}
              className="nur-card p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <p className="font-arabic text-base leading-loose text-foreground text-right nur-text-glow mb-2" dir="rtl">
                {item.arabic}
              </p>
              <p className="text-[11px] text-accent italic leading-relaxed mb-1">
                {item.transliteration}
              </p>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">
                {item.english}
              </p>
              <span className="text-[9px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                Repeat: {item.repeat}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Today's Duas */}
      <div className="px-6 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Today's Duas</h2>
          <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            Changes daily
          </span>
        </div>
        <div className="space-y-3">
          {dailyDuas.map((dua, i) => (
            <motion.div
              key={dua.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <DuaCard dua={dua} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Dhikr Reminder */}
      <motion.div
        className="mx-6 mt-6 mb-2 nur-card p-4 nur-gradient text-primary-foreground"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="font-arabic text-xl text-center mb-1 nur-text-glow" dir="rtl">
          سُبْحَانَ اللَّهِ وَبِحَمْدِهِ
        </p>
        <p className="text-xs text-center opacity-90 italic mb-1">SubhanAllahi wa bihamdihi</p>
        <p className="text-xs text-center opacity-80">
          "Whoever says this 100 times, all sins are forgiven." — Bukhari
        </p>
      </motion.div>
    </div>
  );
};

export default Home;
