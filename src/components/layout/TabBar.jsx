import { Calendar, BarChart2 } from 'lucide-react';

export default function TabBar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'today', label: 'Hoy', icon: Calendar },
    { id: 'stats', label: 'Estadísticas', icon: BarChart2 },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface-1/95 backdrop-blur-lg border-t border-md-outline-dark/10 pb-safe pt-2 px-4 z-40">
      <div className="flex justify-around items-center max-w-md mx-auto h-14">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex flex-col items-center justify-center flex-1 h-full
                transition-colors duration-md-short
                ${isActive ? 'text-md-primary-dark' : 'text-md-on-surface-variant-dark'}
              `}
            >
              <Icon
                size={24}
                strokeWidth={isActive ? 2.5 : 2}
                className="transition-transform duration-md-short"
              />
              <span className={`
                text-[11px] font-medium mt-0.5 transition-all duration-md-short
                ${isActive ? 'opacity-100' : 'opacity-70'}
              `}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-5 h-1 rounded-full bg-md-primary-dark" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
