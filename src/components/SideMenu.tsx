import { Sparkles, BookOpen, BarChart3, X, Moon, Sun } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const menuItems = [
  { path: "/names", icon: Sparkles, label: "99 Names of Allah" },
  { path: "/library", icon: BookOpen, label: "Duas & Supplications" },
  { path: "/progress", icon: BarChart3, label: "My Progress" },
];

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("nur-theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("nur-theme");
    if (saved === "dark") {
      setIsDark(true);
    } else if (saved === "light") {
      setIsDark(false);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
    }
  }, []);

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className="fixed left-0 top-0 bottom-0 z-[70] w-72 bg-card border-r border-border/50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border/50">
              <div>
                <h2 className="text-lg font-bold text-foreground font-arabic">نور الدعاء</h2>
                <p className="text-xs text-muted-foreground">NurDua</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-muted/50 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all active:scale-[0.98] ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                    <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dark mode toggle */}
            <div className="px-4 pb-3">
              <button
                onClick={() => setIsDark(!isDark)}
                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-foreground hover:bg-muted/50 transition-all active:scale-[0.98]"
              >
                {isDark ? <Sun size={22} strokeWidth={1.5} /> : <Moon size={22} strokeWidth={1.5} />}
                <span className="text-sm font-medium">
                  {isDark ? "Light Mode" : "Dark Mode"}
                </span>
              </button>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-border/50">
              <p className="text-[10px] text-muted-foreground text-center">
                بسم الله الرحمن الرحيم
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideMenu;
