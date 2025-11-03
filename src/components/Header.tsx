import { useState } from 'react';

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full font-mono text-green-300 select-none">
      {/* Top bar tipo terminal */}
      <div className="bg-[#0b0f10] border-b border-green-700/20 shadow-[0_8px_30px_rgba(0,255,0,0.05)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">

          {/* Logo + nombre */}
          <div className="flex items-center gap-3">
            <i className="bx bx-message-alt-lock text-3xl md:text-4xl text-green-400 animate-pulse shadow-[0_0_10px_rgba(0,255,0,0.4)]"></i>
            <div className="flex flex-col leading-none">
              <h1 className="text-xs md:text-sm font-bold text-green-400 tracking-wider drop-shadow-[0_0_5px_rgba(0,255,0,0.5)]">
                FicctHack Tools
              </h1>
              <p className="text-[0.6rem] md:text-xs text-green-300/70 font-mono">
                Esteganografía Zero-Width
              </p>
            </div>
          </div>

          {/* Badge de seguridad tipo terminal */}
          <div className="hidden md:flex items-center gap-2">
            <i className="bx bx-shield text-green-400 text-lg md:text-2xl animate-pulse shadow-[0_0_8px_rgba(0,255,0,0.4)]"></i>
            <span className="bg-green-600 text-black px-2 py-1 rounded-full text-[0.6rem] md:text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(0,255,0,0.4)] hover:bg-green-500 transition-all">
              Secure
            </span>
          </div>

          {/* Hamburger mobile */}
          <button
            className="md:hidden p-2 rounded-md bg-black/60 border border-green-700/30 hover:bg-green-900/20 transition-colors"
            aria-label="Abrir menú"
            onClick={() => setOpen(!open)}
          >
            <i className={`bx ${open ? 'bx-x' : 'bx-menu'} text-2xl text-green-300`} />
          </button>
        </div>
      </div>

      {/* Neon underline animada estilo hacker */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse shadow-[0_0_10px_rgba(0,255,0,0.6)]" />
    </header>
  );
}

export default Header;
