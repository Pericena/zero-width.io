import { useState } from 'react';
import Header from './components/Header';
import DecryptTab from './components/DecryptTab';
import EncryptTab from './components/EncryptTab';
import { TabNavigation } from './components/TabNavigation';
import { TabType } from './types/index';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('encrypt');

  const tabs = [
    { id: 'encrypt' as TabType, label: 'Cifrar', icon: 'lock' },
    { id: 'decrypt' as TabType, label: 'Descifrar', icon: 'lock-open' }
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col text-sm sm:text-base">
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="">
        
        {/* TAB NAVIGATION */}
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* TAB CONTENT */}
        <div className="w-full bg-black/90 border border-green-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-[0_0_15px_rgba(0,255,0,0.25)] transition-all duration-300 flex flex-col gap-4 sm:gap-6">
          {activeTab === 'encrypt' && <EncryptTab />}
          {activeTab === 'decrypt' && <DecryptTab />}
        </div>
      </main>

      {/* FOOTER estilo terminal */}
      <footer className="w-full mt-auto border-t border-green-500/20 py-2 px-4 text-green-400 text-xs sm:text-sm flex justify-between items-center">
        <span>FicctHack Tools © 2025</span>
        <span className="animate-pulse">root@ficcttools:~$</span>
      </footer>
    </div>
  );
}
