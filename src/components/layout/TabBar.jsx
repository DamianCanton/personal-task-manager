import { Calendar, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

export default function TabBar({ activeTab, onTabChange }) {
  const tabs = [
    { id: "today", label: "Hoy", icon: Calendar },
    { id: "stats", label: "Estadísticas", icon: BarChart2 },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-1 bg-surface/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl p-1.5 px-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-full
                transition-all duration-300
                ${
                  isActive
                    ? "text-black font-semibold"
                    : "text-primary-muted hover:text-primary-text hover:bg-white/5"
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary-text rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && <span className="text-sm">{tab.label}</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
