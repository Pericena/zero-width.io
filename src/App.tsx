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

{/* FOOTER estilo terminal hacker */}
<footer className="w-full mt-auto border-t border-green-500/20 bg-black/80 text-green-400 font-mono text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 py-3 px-4">
  
  {/* Izquierda - Autor */}
  <div className="flex items-center gap-2 text-green-300/80">
    <i className="bx bx-terminal text-lg animate-pulse text-green-400"></i>
    <span>
      Dev por{" "}
      <strong className="text-green-400 hover:text-green-300 transition-colors">
        Luishiño Pericena
      </strong>
    </span>
  </div>

  {/* Centro - Año y nombre */}
  <div className="text-green-400/70 tracking-wide">
    © {new Date().getFullYear()} FicctHack Tools — Esteganografía Zero-Width
  </div>

  {/* Derecha - Redes */}
  <div className="flex items-center gap-3">
    <a
      href="https://github.com/Pericena"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-green-300 transition-colors"
      title="GitHub"
    >
      <i className="bx bxl-github text-lg"></i>
    </a>
    <a
      href="https://www.linkedin.com/in/lpericena"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-green-300 transition-colors"
      title="LinkedIn"
    >
      <i className="bx bxl-linkedin-square text-lg"></i>
    </a>
    <a
      href="https://lpericena.blogspot.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-green-300 transition-colors"
      title="Blog personal"
    >
      <i className="bx bxl-blogger text-lg"></i>
    </a>
    <span className="ml-2 text-green-400 animate-pulse">
      root@ficcthack:~$
    </span>
  </div>
</footer>

    </div>
  );
}
