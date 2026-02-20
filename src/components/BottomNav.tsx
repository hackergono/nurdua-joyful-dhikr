import { Home, Circle, BookOpen, BarChart3, Sparkles, GraduationCap } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/dhikr", icon: Circle, label: "Dhikr" },
  { path: "/names", icon: Sparkles, label: "Names" },
  { path: "/learn", icon: GraduationCap, label: "Learn" },
  { path: "/library", icon: BookOpen, label: "Duas" },
  { path: "/progress", icon: BarChart3, label: "Progress" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border/50 safe-bottom">
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-1">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center justify-center gap-0.5 py-1.5 px-2 min-w-0 flex-1 active:scale-95 transition-transform"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-px left-3 right-3 h-0.5 nur-gold-gradient rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                className={isActive ? "text-primary" : "text-muted-foreground"}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <span
                className={`text-[9px] font-medium leading-tight ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
