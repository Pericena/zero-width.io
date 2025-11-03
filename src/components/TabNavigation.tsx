// src/components/TabNavigation.tsx
import React from 'react';
import type { TabType } from '../types/index'; // <-- Importar desde types

interface Tab {
  id: TabType;
  label: string;
  icon: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <nav className="flex flex-wrap justify-center gap-3 p-3 md:p-4 bg-black/90 border border-green-500/20 rounded-2xl shadow-[0_0_15px_rgba(0,255,0,0.3)]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm md:text-base transition-all duration-200
              border border-green-500/0
              ${isActive 
                ? 'bg-green-500 text-black shadow-[0_0_10px_rgba(0,255,0,0.5)] scale-105' 
                : 'text-green-300 hover:bg-green-900/30 hover:text-green-100 hover:scale-105'
              }`}
          >
            <i className={`bx bx-${tab.icon} text-lg md:text-xl ${isActive ? 'text-black' : 'text-green-300'}`} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );

};