import { motion } from "framer-motion";
import { Award, Flame, Star, Target, TrendingUp } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import GrowingTree from "@/components/GrowingTree";

const badges = [
  { id: 1, name: "First Dhikr", icon: Star, requirement: 1, description: "Complete your first dhikr" },
  { id: 2, name: "Century", icon: Target, requirement: 100, description: "Reach 100 total dhikr" },
  { id: 3, name: "Devoted", icon: Flame, requirement: 500, description: "Reach 500 total dhikr" },
  { id: 4, name: "Steadfast", icon: TrendingUp, requirement: 1000, description: "Reach 1,000 total dhikr" },
  { id: 5, name: "Radiant", icon: Award, requirement: 5000, description: "Reach 5,000 total dhikr" },
];

const Progress = () => {
  const [totalCount] = useLocalStorage("nur-total-count", 0);
  const [streak] = useLocalStorage("nur-streak", 0);
  const treeLevel = Math.min(Math.floor(totalCount / 33), 10);

  return (
    <div className="min-h-screen pb-24 pt-14 px-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground mb-1">Your Garden</h1>
        <p className="text-sm text-muted-foreground">Watch your devotion grow</p>
      </motion.div>

      {/* Tree visualization */}
      <motion.div
        className="flex justify-center my-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <GrowingTree level={treeLevel} />
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <motion.div
          className="nur-card p-4 text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-3xl font-bold text-primary">{totalCount.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">Total Dhikr</p>
        </motion.div>
        <motion.div
          className="nur-card p-4 text-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-1">
            <Flame size={18} className="text-accent" />
            <p className="text-3xl font-bold text-primary">{streak}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Day Streak</p>
        </motion.div>
      </div>

      {/* Badges */}
      <h2 className="text-lg font-semibold text-foreground mb-3">Badges</h2>
      <div className="space-y-3">
        {badges.map((badge, i) => {
          const unlocked = totalCount >= badge.requirement;
          const Icon = badge.icon;
          const progress = Math.min((totalCount / badge.requirement) * 100, 100);

          return (
            <motion.div
              key={badge.id}
              className={`nur-card p-4 flex items-center gap-4 ${
                unlocked ? "nur-glow-effect" : "opacity-60"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  unlocked ? "nur-gold-gradient" : "bg-muted"
                }`}
              >
                <Icon size={18} className={unlocked ? "text-foreground" : "text-muted-foreground"} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                  {badge.name}
                </p>
                <p className="text-[10px] text-muted-foreground">{badge.description}</p>
                <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full nur-gradient"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  />
                </div>
              </div>
              {unlocked && <span className="text-accent text-lg">✨</span>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Progress;
