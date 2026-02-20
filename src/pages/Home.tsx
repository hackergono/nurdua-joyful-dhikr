import { motion } from "framer-motion";
import { Sparkles, Moon, Sun } from "lucide-react";
import DuaCard from "@/components/DuaCard";
import GrowingTree from "@/components/GrowingTree";
import { duas } from "@/data/duas";
import { useLocalStorage } from "@/hooks/use-local-storage";
import heroPattern from "@/assets/hero-pattern.jpg";

const Home = () => {
  const [totalCount] = useLocalStorage("nur-total-count", 0);
  const [streak] = useLocalStorage("nur-streak", 0);

  const hour = new Date().getHours();
  const isEvening = hour >= 17 || hour < 5;
  const greeting = isEvening ? "Good Evening" : hour < 12 ? "Good Morning" : "Good Afternoon";
  const greetingIcon = isEvening ? <Moon size={18} className="text-accent" /> : <Sun size={18} className="text-accent" />;

  const featuredDuas = duas.slice(0, 3);
  const treeLevel = Math.min(Math.floor(totalCount / 33), 10);

  return (
    <div className="min-h-screen pb-24">
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
              {greetingIcon}
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

      {/* Featured Duas */}
      <div className="px-6 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Today's Duas</h2>
          <span className="text-xs text-accent font-medium">
            {isEvening ? "Evening Adhkar" : "Morning Adhkar"}
          </span>
        </div>
        <div className="space-y-3">
          {featuredDuas.map((dua, i) => (
            <motion.div
              key={dua.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <DuaCard dua={dua} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Dhikr Reminder */}
      <motion.div
        className="mx-6 mt-6 nur-card p-4 nur-gradient text-primary-foreground"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
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
